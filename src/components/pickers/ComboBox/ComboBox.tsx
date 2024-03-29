import { Check, CircleNotch, Warning, CaretDownFill } from '@jengaicons/react';
import {
  cloneElement,
  ForwardedRef,
  forwardRef,
  ReactElement,
  RefObject,
  useMemo,
} from 'react';
import { FilterFn, useComboBoxState } from '@react-stately/combobox';
import { useComboBox } from '@react-aria/combobox';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useFilter } from '@react-aria/i18n';
import { Item } from '@react-stately/collections';
import { useOverlayPosition } from '@react-aria/overlays';

import { useFieldProps, useFormProps } from '../../forms';
import { useProviderProps } from '../../../provider';
import {
  BLOCK_STYLES,
  extractStyles,
  OUTER_STYLES,
  tasty,
} from '../../../tasty';
import { useFocus } from '../../../utils/react/interactions';
import {
  mergeProps,
  modAttrs,
  useCombinedRefs,
  useLayoutEffect,
} from '../../../utils/react';
import { FieldWrapper } from '../../forms/FieldWrapper';
import { JengaSelectBaseProps, ListBoxPopup } from '../Select/Select';
import {
  DEFAULT_INPUT_STYLES,
  INPUT_WRAPPER_STYLES,
} from '../../forms/TextInput/TextInputBase';
import { OverlayWrapper } from '../../overlays/OverlayWrapper';

import type {
  CollectionBase,
  KeyboardDelegate,
  LoadingState,
} from '@react-types/shared';
import type { ComboBoxProps } from '@react-types/combobox';

const ComboBoxWrapperElement = tasty({
  styles: INPUT_WRAPPER_STYLES,
});

const InputElement = tasty({
  as: 'input',
  styles: { ...DEFAULT_INPUT_STYLES, width: ['60%', '70%', '100%'] },
});

const TriggerElement = tasty({
  as: 'button',
  styles: {
    display: 'grid',
    placeItems: 'center',
    placeContent: 'center',
    placeSelf: 'stretch',
    radius: 'right',
    width: '4x',
    color: {
      '': '#dark.75',
      hovered: '#dark.75',
      pressed: '#purple',
      '[disabled]': '#dark.30',
    },
    border: 0,
    reset: 'button',
    margin: 0,
    fill: {
      '': '#dark.0',
      hovered: '#dark.04',
      pressed: '#purple.10',
      disabled: '#clear',
    },
    cursor: 'pointer',
  },
});

export interface JengaComboBoxProps<T>
  extends Omit<JengaSelectBaseProps<T>, 'onOpenChange'>,
    ComboBoxProps<T>,
    CollectionBase<T> {
  icon?: ReactElement;
  multiLine?: boolean;
  autoComplete?: string;
  wrapperRef?: RefObject<HTMLDivElement>;
  inputRef?: RefObject<HTMLInputElement>;
  /** The ref for the list box popover. */
  popoverRef?: RefObject<HTMLDivElement>;
  /** The ref for the list box. */
  listBoxRef?: RefObject<HTMLElement>;
  /** An optional keyboard delegate implementation, to override the default. */
  keyboardDelegate?: KeyboardDelegate;
  loadingState?: LoadingState;
  /**
   * The filter function used to determine if a option should be included in the combo box list.
   * Has no effect when `items` is provided.
   */
  filter?: FilterFn;
  size?: 'small' | 'default' | 'large' | string;
  suffixPosition?: 'before' | 'after';
}

export const ComboBox = forwardRef(function ComboBox<T extends object>(
  props: JengaComboBoxProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, {
    valuePropsMapper: ({ value, onChange }) => ({
      inputValue: value != null ? value : '',
      onInputChange: (val) => onChange(val, !props.allowsCustomValue),
      onSelectionChange: onChange,
    }),
  });

  let {
    qa,
    label,
    extra,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    validationState,
    icon,
    prefix,
    isDisabled,
    multiLine,
    autoFocus,
    wrapperRef,
    inputRef,
    triggerRef,
    popoverRef,
    listBoxRef,
    isLoading,
    loadingIndicator,
    overlayOffset = 8,
    inputStyles,
    optionStyles,
    triggerStyles,
    suffix,
    listBoxStyles,
    overlayStyles,
    hideTrigger,
    message,
    description,
    size,
    autoComplete = 'off',
    direction = 'bottom',
    shouldFlip = true,
    requiredMark = true,
    menuTrigger = 'input',
    suffixPosition = 'before',
    loadingState,
    filter,
    styles,
    labelSuffix,
    ...otherProps
  } = props;

  let isAsync = loadingState != null;
  let { contains } = useFilter({ sensitivity: 'base' });

  const comboboxProps = {
    ...otherProps,
    inputValue: props.inputValue,
    defaultInputValue: props.defaultInputValue,
    defaultItems: props.defaultItems,
    defaultSelectedKey: props.defaultSelectedKey,
    children: props.children,
    items: props.items,
    selectedKey: props.selectedKey,
    label: props.label,
    isDisabled: props.isDisabled,
    validationState: props.validationState,
    placeholder: props.placeholder,
    description: props.description,
    autoFocus: props.autoFocus,
    isRequired: props.isRequired,
    allowsCustomValue: props.allowsCustomValue,
    menuTrigger,
    disabledKeys: props.disabledKeys,
    name: props.name,
    onInputChange: props.onInputChange,
    errorMessage: props.errorMessage,
    isReadOnly: props.isReadOnly,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onSelectionChange: props.onSelectionChange,
    onFocusChange: props.onFocusChange,
    onKeyDown: props.onKeyDown,
    onKeyUp: props.onKeyUp,
    onOpenChange: props.onOpenChange,
    defaultFilter: filter || contains,
    allowsEmptyCollection: isAsync,
  } as const;

  let state = useComboBoxState({
    ...comboboxProps,
    defaultFilter: filter || contains,
    allowsEmptyCollection: isAsync,
  });

  const outerStyles = extractStyles(otherProps, OUTER_STYLES, styles);

  inputStyles = extractStyles(otherProps, BLOCK_STYLES, inputStyles);

  ref = useCombinedRefs(ref);
  wrapperRef = useCombinedRefs(wrapperRef);
  inputRef = useCombinedRefs(inputRef);
  triggerRef = useCombinedRefs(triggerRef);
  popoverRef = useCombinedRefs(popoverRef);
  listBoxRef = useCombinedRefs(listBoxRef);

  let { overlayProps, placement, updatePosition } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: shouldFlip,
    isOpen: state.isOpen,
    onClose: state.close,
    offset: overlayOffset,
  });

  let {
    labelProps,
    inputProps,
    listBoxProps,
    buttonProps: triggerProps,
  } = useComboBox(
    {
      ...comboboxProps,
      inputRef,
      buttonRef: triggerRef,
      listBoxRef,
      popoverRef,
      menuTrigger,
    },
    state,
  );

  let { isFocused, focusProps } = useFocus({ isDisabled });
  let { hoverProps, isHovered } = useHover({ isDisabled });

  // Get props for the button based on the trigger props from useComboBox
  let { buttonProps, isPressed: isTriggerPressed } = useButton(
    triggerProps,
    triggerRef,
  );
  let { hoverProps: triggerHoverProps, isHovered: isTriggerHovered } = useHover(
    { isDisabled },
  );
  let { focusProps: triggerFocusProps, isFocused: isTriggerFocused } = useFocus(
    { isDisabled },
    true,
  );

  useLayoutEffect(() => {
    if (state.isOpen) {
      updatePosition();
    }
  }, [updatePosition, state.isOpen, state.collection.size]);

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

  let comboBoxWidth = wrapperRef?.current?.offsetWidth;

  if (icon) {
    icon = <div data-element="InputIcon">{icon}</div>;

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

  let mods = useMemo(
    () => ({
      invalid: isInvalid,
      valid: validationState === 'valid',
      disabled: isDisabled,
      hovered: isHovered,
      focused: isFocused,
      loading: isLoading,
      prefix: !!prefix,
      suffix: true,
    }),
    [
      isInvalid,
      validationState,
      isDisabled,
      isHovered,
      isFocused,
      isLoading,
      prefix,
    ],
  );

  let comboBoxField = (
    <ComboBoxWrapperElement
      ref={wrapperRef}
      qa={qa || 'ComboBox'}
      {...modAttrs(mods)}
      styles={outerStyles}
      style={{
        zIndex: isFocused ? 1 : 'initial',
      }}
      data-size={size}
    >
      <InputElement
        qa="Input"
        {...mergeProps(inputProps, hoverProps, focusProps)}
        ref={inputRef}
        autoComplete={autoComplete}
        styles={inputStyles}
        {...modAttrs(mods)}
        data-size={size}
      />
      {prefix ? <div data-element="Prefix">{prefix}</div> : null}
      <div data-element="Suffix">
        {suffixPosition === 'before' ? suffix : null}
        {validationState || isLoading ? (
          <>
            {validationState && !isLoading ? validation : null}
            {isLoading ? <CircleNotch /> : null}
          </>
        ) : null}
        {suffixPosition === 'after' ? suffix : null}
        {!hideTrigger ? (
          <TriggerElement
            qa="ComboBoxTrigger"
            {...mergeProps(buttonProps, triggerFocusProps, triggerHoverProps)}
            {...modAttrs({
              pressed: isTriggerPressed,
              focused: isTriggerFocused,
              hovered: isTriggerHovered,
              disabled: isDisabled,
              loading: isLoading,
            })}
            ref={triggerRef}
            data-size={size}
            isDisabled={isDisabled}
            styles={triggerStyles}
          >
            <CaretDownFill />
          </TriggerElement>
        ) : null}
      </div>
      <OverlayWrapper isOpen={state.isOpen && !isDisabled}>
        <ListBoxPopup
          {...listBoxProps}
          shouldUseVirtualFocus
          listBoxRef={listBoxRef}
          popoverRef={popoverRef}
          overlayProps={overlayProps}
          placement={placement}
          state={state}
          listBoxStyles={listBoxStyles}
          overlayStyles={overlayStyles}
          optionStyles={optionStyles}
          minWidth={comboBoxWidth}
        />
      </OverlayWrapper>
    </ComboBoxWrapperElement>
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
        labelSuffix,
        Component: comboBoxField,
        ref: ref,
      }}
    />
  );
}) as unknown as (<T>(
  props: JengaComboBoxProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => JSX.Element) & { Item: typeof Item };

ComboBox.Item = Item;
Object.defineProperty(ComboBox, 'jengaInputType', {
  value: 'ComboBox',
  enumerable: false,
  configurable: false,
});
