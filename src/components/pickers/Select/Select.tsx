import { CaretDownFill, Check, CircleNotch, Warning } from '@jengaicons/react';
import {
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelectState } from '@react-stately/select';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useListBox, useOption } from '@react-aria/listbox';
import { useButton } from '@react-aria/button';
import { FocusScope } from '@react-aria/focus';
import {
  DismissButton,
  useOverlay,
  useOverlayPosition,
} from '@react-aria/overlays';
import { useFocus as useAriaFocus, useHover } from '@react-aria/interactions';
import { Item } from '@react-stately/collections';
import { DOMRef } from '@react-types/shared';
import styled from 'styled-components';

import { useFieldProps, useFormProps } from '../../forms';
import { useProviderProps } from '../../../provider';
import {
  BasePropsWithoutChildren,
  BLOCK_STYLES,
  BlockStyleProps,
  extractStyles,
  OUTER_STYLES,
  OuterStyleProps,
  Props,
  Styles,
  tasty,
} from '../../../tasty';
import { useFocus } from '../../../utils/react/interactions';
import { FieldWrapper } from '../../forms/FieldWrapper';
import { OverlayWrapper } from '../../overlays/OverlayWrapper';
import { FormFieldProps } from '../../../shared';
import { getOverlayTransitionCSS } from '../../../utils/transitions';
import { mergeProps, useCombinedRefs } from '../../../utils/react';
import {
  DEFAULT_INPUT_STYLES,
  INPUT_WRAPPER_STYLES,
} from '../../forms/TextInput/TextInputBase';
import { DEFAULT_BUTTON_STYLES } from '../../actions';

import type { AriaSelectProps } from '@react-types/select';

const SelectWrapperElement = tasty({
  styles: {
    display: 'grid',
    position: 'relative',
    radius: '2r',
    fill: {
      '': '#op-surface',
    },
    cursor: { '': 'pointer', disabled: 'not-allowed' },
    color: {
      '': '#op-text',
      invalid: '#op-text-critical',
    },
    Value: {
      ...DEFAULT_INPUT_STYLES,
      fontSize: '14px',
      color: { '': 'inherit', placeholder: '#op-text-placeholder' },
      textAlign: 'left',
      fill: '#clear',
      textOverflow: 'ellipsis',
      overflow: {
        '': 'initial',
        ellipsis: 'hidden',
      },
    },

    CaretIcon: {
      display: 'grid',
      placeItems: 'center',
      width: 'min 4x',
      cursor: 'pointer',
      fontSize: 'inherit',
    },

    ButtonIcon: {
      display: 'grid',
      placeItems: 'center',
      width: 'min 4x',
      color: 'inherit',
      fontSize: '@icon-size',
    },
    width: ['60%', '70%', '100%'],
  },
});

const SelectElement = tasty({
  as: 'button',
  qa: 'Button',

  styles: {
    ...INPUT_WRAPPER_STYLES,
    ...DEFAULT_BUTTON_STYLES,
    cursor: 'pointer',
    padding: '0',
    gap: '0',
    minWidth: '100%',
    width: '100%',
    border: {
      '': '#op-border',
      valid: '#op-border-success',
      invalid: '#op-border-critical',
    },
    fill: {
      '': '#clear',
      '[data-type="primary"]': '#clear',

      '[data-type="secondary"]': '#clear',
      '[data-type="secondary"] & hovered': '#dark.04',
      '[data-type="secondary"] & pressed': '#dark.05',

      '([data-type="clear"] | [data-type="outline"])': '#purple.0',
      '([data-type="clear"] | [data-type="outline"]) & hovered': '#purple.16',
      '([data-type="clear"] | [data-type="outline"]) & pressed': '#purple.10',
      '([data-type="clear"] | [data-type="outline"]) & [disabled]': '#purple.0',

      // special
      '[data-theme="special"] & [data-type="secondary"]': '#white.12',

      '[data-theme="special"] & [data-type="clear"]': '#white',
      '[data-theme="special"] & [data-type="clear"] & hovered': '#white.94',
      '[data-theme="special"] & [data-type="clear"] & pressed': '#white',

      '[data-theme="special"] & [disabled]': '#white.12',

      '[data-theme="special"] & [data-type="clear"] & [disabled]': '#white.0',
    },
    color: {
      '': '#op-text',

      '[data-type="secondary"]': '#dark.75',
      '[data-type="secondary"] & hovered': '#dark.75',
      '[data-type="clear"]': '#purple-text',
      '[data-type="secondary"] & pressed': '#purple',

      // special
      '[data-theme="special"]': '#white',
      '[data-theme="special"] & [data-type="clear"]': '#purple',

      // other
      '[data-theme="special"] & [disabled]': '#white.30',
    },
  },
});

const ListBoxElement = tasty({
  as: 'ul',
  styles: {
    display: 'flex',
    gap: '.5x',
    flow: 'column',
    margin: '0',
    padding: '.5x',
    listStyle: 'none',
    radius: true,
    fill: '#white',
    shadow: '0px 4px 16px #shadow',
    height: 'initial 30x',
    overflow: 'hidden auto',
    styledScrollbar: true,
  },
});

const OptionElement = tasty({
  as: 'li',
  styles: {
    display: 'block',
    padding: '(1x - 1px) (1.5x - 1px)',
    cursor: 'pointer',
    radius: true,
    fill: {
      '': '#op-surface',
      'hovered | focused': '#op-surface-hovered',
      'pressed | selected': '#op-surface-active',
      disabled: '#dark.0',
    },
    color: {
      '': '#op-text',
      // 'hovered | focused': '#dark.75',
      // 'pressed | selected': '#purple',
      disabled: '#dark.3',
    },
    transition: 'theme',
    fontSize: '14px',
  },
});

const OverlayElement = tasty({
  styles: {
    position: 'absolute',
    width: 'min @overlay-min-width',
  },
});
const StyledOverlayElement = styled(OverlayElement)`
  ${(props) => {
    return getOverlayTransitionCSS({ placement: props?.['data-position'] });
  }}
`;

export interface JengaSelectBaseProps<T>
  extends BasePropsWithoutChildren,
    OuterStyleProps,
    FormFieldProps,
    BlockStyleProps,
    AriaSelectProps<T> {
  icon?: ReactElement;
  prefix?: ReactNode;
  suffix?: ReactNode;
  triggerRef?: RefObject<HTMLButtonElement>;
  isLoading?: boolean;
  loadingIndicator?: ReactNode;
  overlayOffset?: number;
  hideTrigger?: boolean;
  inputStyles?: Styles;
  optionStyles?: Styles;
  triggerStyles?: Styles;
  listBoxStyles?: Styles;
  overlayStyles?: Styles;
  direction?: 'top' | 'bottom';
  shouldFlip?: boolean;
  inputProps?: Props;
  type?: 'secondary' | 'clear' | 'primary' | (string & {});
  suffixPosition?: 'before' | 'after';
}

export interface JengaSelectProps<T> extends JengaSelectBaseProps<T> {
  popoverRef?: RefObject<HTMLInputElement>;
  /** The ref for the list box. */
  listBoxRef?: RefObject<HTMLElement>;
  size?: 'small' | 'default' | 'large' | string;
  ellipsis?: boolean;
}

function Select<T extends object>(
  props: JengaSelectProps<T>,
  ref: DOMRef<HTMLDivElement>,
) {
  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, {
    defaultValidationTrigger: 'onChange',
    valuePropsMapper: ({ value, onChange }) => ({
      selectedKey: value ?? null,
      onSelectionChange: onChange,
    }),
  });

  let {
    qa,
    label,
    extra,
    icon,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    validationState,
    prefix,
    isDisabled,
    autoFocus,
    inputProps,
    triggerRef,
    popoverRef,
    listBoxRef,
    isLoading,
    loadingIndicator,
    overlayOffset = 8,
    inputStyles,
    optionStyles,
    suffix,
    listBoxStyles,
    overlayStyles,
    message,
    description,
    direction = 'bottom',
    shouldFlip = true,
    requiredMark = true,
    placeholder,
    tooltip,
    size,
    styles,
    theme = 'default',
    labelSuffix,
    ellipsis,
    suffixPosition = 'before',
    ...otherProps
  } = props;
  let state = useSelectState(props);
  const outerStyles = extractStyles(otherProps, OUTER_STYLES, styles);

  inputStyles = extractStyles(otherProps, BLOCK_STYLES, inputStyles);

  ref = useCombinedRefs(ref);
  triggerRef = useCombinedRefs(triggerRef);
  popoverRef = useCombinedRefs(popoverRef);
  listBoxRef = useCombinedRefs(listBoxRef);

  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    triggerRef,
  );

  let { overlayProps, placement } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: shouldFlip,
    isOpen: state.isOpen,
    onClose: state.close,
    offset: overlayOffset,
  });

  let { isFocused, focusProps } = useFocus({ isDisabled }, true);
  let { hoverProps, isHovered } = useHover({ isDisabled });

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, triggerRef);

  let isInvalid = validationState === 'invalid';

  let validationIcon = isInvalid ? (
    <Warning
      data-element="ValidationIcon"
      style={{ color: 'var(--danger-color)' }}
    />
  ) : (
    <Check
      data-element="ValidationIcon"
      style={{ color: 'var(--success-color)' }}
    />
  );
  let validation = cloneElement(validationIcon);

  let triggerWidth = triggerRef?.current?.offsetWidth;

  if (icon) {
    icon = <div data-element="ButtonIcon">{icon}</div>;

    if (prefix) {
      prefix = (
        <>
          {icon}
          {prefix}
        </>
      );
    } else {
      prefix = icon;
    }
  }

  const showPlaceholder = !!placeholder?.trim() && !state.selectedItem;

  const modifiers = useMemo(
    () => ({
      ellipsis,
      invalid: isInvalid,
      valid: validationState === 'valid',
      disabled: isDisabled,
      loading: isLoading,
      hovered: isHovered,
      focused: isFocused,
      placeholder: showPlaceholder,
      prefix: !!prefix,
      suffix: true,
    }),
    [
      ellipsis,
      validationState,
      isDisabled,
      isLoading,
      isHovered,
      isFocused,
      showPlaceholder,
      prefix,
    ],
  );

  let selectField = (
    <SelectWrapperElement
      qa={qa || 'Select'}
      mods={modifiers}
      styles={outerStyles}
      data-type={'primary'}
      data-theme={theme}
    >
      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={props.label}
        name={props.name}
      />
      <SelectElement
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={triggerRef}
        styles={inputStyles}
        data-theme={theme}
        data-size={size}
        data-type={'primary'}
        mods={modifiers}
      >
        {prefix ? <div data-element="Prefix">{prefix}</div> : null}
        <span data-element="Value" {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : placeholder || <>&nbsp;</>}
        </span>
        <div data-element="Suffix">
          {suffixPosition === 'before' ? suffix : null}
          {validationState && !isLoading ? validation : null}
          {isLoading && <CircleNotch />}
          {suffixPosition === 'after' ? suffix : null}
          <div data-element="CaretIcon">
            <CaretDownFill />
          </div>
        </div>
      </SelectElement>
      <OverlayWrapper isOpen={state.isOpen && !isDisabled}>
        <ListBoxPopup
          {...menuProps}
          popoverRef={popoverRef}
          listBoxRef={listBoxRef}
          overlayProps={overlayProps}
          placement={placement}
          state={state}
          listBoxStyles={listBoxStyles}
          overlayStyles={overlayStyles}
          optionStyles={optionStyles}
          minWidth={triggerWidth}
        />
      </OverlayWrapper>
    </SelectWrapperElement>
  );

  return (
    <FieldWrapper
      {...{
        labelPosition,
        label,
        extra,
        styles,
        isRequired,
        labelStyles,
        necessityIndicator,
        labelProps,
        isDisabled,
        validationState,
        message,
        description,
        requiredMark,
        tooltip,
        labelSuffix,
        Component: selectField,
        ref: ref,
      }}
    />
  );
}

export function ListBoxPopup({
  state,
  popoverRef,
  listBoxRef,
  listBoxStyles,
  overlayStyles,
  optionStyles,
  overlayProps: parentOverlayProps,
  shouldUseVirtualFocus = false,
  placement,
  minWidth,
  ...otherProps
}) {
  // Get props for the listbox
  let { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy || true,
      shouldUseVirtualFocus,
      ...otherProps,
    },
    state,
    listBoxRef,
  );

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    popoverRef,
  );

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <StyledOverlayElement
      {...overlayProps}
      {...parentOverlayProps}
      ref={popoverRef}
      styles={overlayStyles}
      style={{
        '--overlay-min-width': minWidth ? `${minWidth}px` : 'initial',
        ...parentOverlayProps?.style,
      }}
      data-position={placement}
    >
      <FocusScope restoreFocus>
        <DismissButton onDismiss={() => state.close()} />
        <ListBoxElement
          styles={listBoxStyles}
          {...mergeProps(listBoxProps, otherProps)}
          ref={listBoxRef}
        >
          {Array.from(state.collection).map((item: any) => (
            <Option
              key={item.key}
              item={item}
              state={state}
              styles={optionStyles}
              shouldUseVirtualFocus={shouldUseVirtualFocus}
            />
          ))}
        </ListBoxElement>
        <DismissButton onDismiss={() => state.close()} />
      </FocusScope>
    </StyledOverlayElement>
  );
}

function Option({ item, state, styles, shouldUseVirtualFocus }) {
  let ref = useRef<HTMLDivElement>(null);
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let isVirtualFocused = state.selectionManager.focusedKey === item.key;

  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus,
    },
    state,
    ref,
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  let [isFocused, setFocused] = useState(false);
  let { focusProps } = useAriaFocus({ onFocusChange: setFocused });

  return (
    <OptionElement
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      key={item.key}
      mods={{
        selected: isSelected,
        focused: shouldUseVirtualFocus ? isVirtualFocused : isFocused,
        disabled: isDisabled,
      }}
      data-theme={isSelected ? 'special' : undefined}
      styles={styles}
    >
      {item.rendered}
    </OptionElement>
  );
}

const _Select = forwardRef(Select);

(_Select as any).jengaInputType = 'Select';

const __Select = Object.assign(
  _Select as typeof _Select & {
    Item: typeof Item;
  },
  { Item },
);

export { __Select as Select };
