import { Check, CircleNotch, Warning } from '@jengaicons/react';
import { createFocusableRef } from '@react-spectrum/utils';
import {
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useHover } from '@react-aria/interactions';

import { useFieldProps, useFormProps } from '../Form';
import { useProviderProps } from '../../../provider';
import {
  BaseProps,
  BLOCK_STYLES,
  BlockStyleProps,
  DIMENSION_STYLES,
  DimensionStyleProps,
  extractStyles,
  POSITION_STYLES,
  PositionStyleProps,
  Props,
  Styles,
  tasty,
} from '../../../tasty';
import { useFocus } from '../../../utils/react/interactions';
import { FieldWrapper } from '../FieldWrapper';
import { FormFieldProps } from '../../../shared';
import { mergeProps } from '../../../utils/react';

import type { AriaTextFieldProps } from '@react-types/textfield';

const ADD_STYLES = {
  display: 'grid',
  placeContent: 'stretch',
  placeItems: 'center',
  flow: 'column',
  gap: 0,
  cursor: 'inherit',
  opacity: {
    '': 1,
    disabled: '@disabled-opacity',
  },
};

export const INPUT_WRAPPER_STYLES: Styles = {
  display: 'grid',
  position: 'relative',
  gridAreas: '"prefix input suffix"',
  gridColumns: 'auto 1fr auto',
  placeItems: 'stretch',
  fill: {
    '': '#op-surface',
  },
  border: {
    '': '#op-border',
    focused: true,
    valid: '#op-border-success',
    invalid: '#op-border-critical',
  },
  outline: {
    '': '#clear',
    focused: '#op-border-focus',
    'invalid & focused': '#op-border-critical',
    'valid & focused': '#op-border-success',
  },
  radius: '1x',
  cursor: { '': 'text', disabled: 'not-allowed' },
  color: {
    '': '#op-text',
    focused: '#op-text',
    invalid: '#op-text-critical',
  },
  zIndex: {
    '': 'initial',
    focused: 1,
  },
  boxSizing: 'border-box',
  transition: 'theme',
  opacity: {
    '': 1,
    disabled: 0.5,
  },
  Prefix: {
    ...ADD_STYLES,
    gridArea: 'prefix',
  },

  Suffix: {
    ...ADD_STYLES,
    gridArea: 'suffix',
  },

  State: {
    display: 'flex',
  },

  InputIcon: {
    display: 'grid',
    placeItems: 'center',
    width: 'min 4x',
    color: 'inherit',
    fontSize: '@icon-size',
  },

  ValidationIcon: {
    display: 'grid',
    placeItems: 'center',
    padding: '1x',
    width: {
      '': 'min 4x',
      suffix: 'min 3x',
    },
    fontSize: '@icon-size',
  },
};

const InputWrapperElement = tasty({
  styles: INPUT_WRAPPER_STYLES,
});

const STYLE_LIST = [...POSITION_STYLES, ...DIMENSION_STYLES];

const INPUT_STYLE_PROPS_LIST = [...BLOCK_STYLES, 'resize'];

export const DEFAULT_INPUT_STYLES: Styles = {
  display: 'block',
  gridArea: 'input',
  height: 'initial initial initial',
  color: 'inherit',
  fill: '#clear',
  border: 0,
  transition: 'theme',
  radius: true,
  padding: '@vertical-padding @right-padding @vertical-padding @left-padding',
  textAlign: 'left',
  reset: 'input',
  preset: 't3',
  flexGrow: 1,
  margin: 0,
  resize: 'none',
  boxSizing: 'border-box',
  userSelect: 'auto',

  '@vertical-padding': {
    '': '(1.25x - 1bw)',
    '[data-size="small"]': '(.75x - 1bw)',
  },
  '@left-padding': {
    '': '(1.5x - 1bw)',
    prefix: '0',
  },
  '@right-padding': {
    '': '(1.5x - 1bw)',
    suffix: '0',
  },
};

const InputElement = tasty({ qa: 'Input', styles: DEFAULT_INPUT_STYLES });

export interface JengaTextInputBaseProps
  extends BaseProps,
    PositionStyleProps,
    DimensionStyleProps,
    BlockStyleProps,
    AriaTextFieldProps,
    FormFieldProps {
  /** Left input icon */
  icon?: ReactElement;
  /** Input decoration before the main input */
  prefix?: ReactNode;
  /** Input decoration after the main input */
  suffix?: ReactNode;
  /** Suffix position goes before or after the validation and loading statuses */
  suffixPosition?: 'before' | 'after';
  /** Whether the input is multiline */
  multiLine?: boolean;
  /** Whether the input should have auto focus */
  autoFocus?: boolean;
  /** Direct input props */
  inputProps?: Props;
  /** Direct input wrapper props */
  wrapperProps?: Props;
  /** The input ref */
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  /** The wrapper ref */
  wrapperRef?: RefObject<HTMLDivElement>;
  /** Whether the input has the loading status */
  isLoading?: boolean;
  /** The loading status indicator */
  loadingIndicator?: ReactNode;
  /** Style map for the input */
  inputStyles?: Styles;
  /** Style map for the input wrapper */
  wrapperStylesProp?: Styles;
  /** The number of rows for the input. Only applies to textarea. */
  rows?: number;
  /** The resize CSS property sets whether an element is resizable, and if so, in which directions. */
  resize?: Styles['resize'];
  /** The size of the input */
  size?: 'small' | 'default' | 'large' | string;

  /** if fullWidth === false ? width = [60%, 70%, 100%] : 100% to comply with the design system*/
  fullWidth?: boolean;
}

function TextInputBase(props: JengaTextInputBaseProps, ref) {
  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, {
    defaultValidationTrigger: 'onBlur',
    valuePropsMapper: ({ value, onChange }) => ({
      value:
        typeof value === 'string' || typeof value === 'number'
          ? String(value)
          : '',
      onChange,
    }),
  });

  let {
    qa,
    label,
    extra,
    mods,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    necessityLabel,
    validationState,
    message,
    description,
    prefix,
    isDisabled,
    multiLine,
    autoFocus,
    labelProps,
    inputProps,
    wrapperProps,
    inputRef,
    isLoading,
    loadingIndicator,
    value,
    inputStyles = {},
    wrapperStylesProp = {},
    suffix,
    suffixPosition = 'before',
    wrapperRef,
    requiredMark = true,
    tooltip,
    isHidden,
    rows = 1,
    size,
    icon,
    labelSuffix,
    maxLength,
    minLength,
    fullWidth = false,
    ...otherProps
  } = props;
  let styles = extractStyles(otherProps, STYLE_LIST);
  let type = otherProps.type;

  inputStyles = extractStyles(otherProps, INPUT_STYLE_PROPS_LIST, inputStyles);

  let ElementType: 'textarea' | 'input' = multiLine ? 'textarea' : 'input';
  let { isFocused, focusProps } = useFocus({ isDisabled });
  let { hoverProps, isHovered } = useHover({ isDisabled });
  let domRef = useRef(null);
  let defaultInputRef = useRef(null);

  inputRef = inputRef || defaultInputRef;

  // Expose imperative interface for ref
  useImperativeHandle(ref, () => ({
    ...createFocusableRef(domRef, inputRef),
    select() {
      if (inputRef?.current) {
        inputRef.current.select();
      }
    },
    getInputElement() {
      return inputRef?.current;
    },
  }));

  let isInvalid = validationState === 'invalid';

  let validationIcon = isInvalid ? (
    <Warning
      data-element="ValidationIcon"
      style={{ color: 'var(--op-icon-critical)' }}
    />
  ) : (
    <Check
      data-element="ValidationIcon"
      style={{ color: 'var(--op-icon-success)' }}
    />
  );
  let validation = cloneElement(validationIcon);

  // Fix safari bug: https://github.com/philipwalton/flexbugs/issues/270
  if (!inputProps?.placeholder) {
    if (!inputProps) {
      inputProps = {};
    }

    inputProps.placeholder = ' ';
  }

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

  const modifiers = useMemo(
    () => ({
      invalid: isInvalid,
      valid: validationState === 'valid',
      loadable: !!loadingIndicator,
      focused: isFocused,
      hovered: isHovered,
      disabled: isDisabled,
      multiline: multiLine,
      prefix: !!prefix,
      suffix: !!suffix,
      ...mods,
    }),
    [
      mods,
      isInvalid,
      validationState,
      loadingIndicator,
      isFocused,
      isDisabled,
      isHovered,
      multiLine,
      prefix,
      suffix,
    ],
  );

  const hasTextSecurity =
    inputRef?.current?.value && multiLine && type === 'password';
  const textSecurityStyles = hasTextSecurity
    ? {
        fontFamily: 'text-security-disc',
        WebkitTextSecurity: 'disc',
      }
    : {};

  const wrapperStyles = {
    ...wrapperStylesProp,
    width: {
      '': ['60%', '70%', '100%'],
      '[data-full-width="true"]': '100%',
    },
  };

  const textField = (
    <InputWrapperElement
      ref={wrapperRef}
      qa={qa || 'TextInput'}
      mods={modifiers}
      data-size={size}
      styles={wrapperStyles}
      data-full-width={fullWidth}
      {...wrapperProps}
    >
      <InputElement
        as={ElementType}
        {...mergeProps(inputProps, focusProps, hoverProps)}
        ref={inputRef}
        rows={multiLine ? rows : undefined}
        mods={modifiers}
        style={textSecurityStyles}
        autoFocus={autoFocus}
        data-size={size}
        styles={inputStyles}
        isDisabled={isDisabled}
        maxLength={maxLength}
        minLength={minLength}
      />
      {prefix ? <div data-element="Prefix">{prefix}</div> : null}
      {(validationState && !isLoading) || isLoading || suffix ? (
        <div data-element="Suffix">
          {suffixPosition === 'before' ? suffix : null}
          {(validationState && !isLoading) || isLoading ? (
            <div data-element="State">
              {validationState && !isLoading ? (
                <div style={{ padding: '8px' }}>{validation}</div>
              ) : null}
              {isLoading && <CircleNotch data-element="InputIcon" />}
            </div>
          ) : null}
          {suffixPosition === 'after' ? suffix : null}
        </div>
      ) : null}
    </InputWrapperElement>
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
        necessityLabel,
        labelProps,
        isDisabled,
        validationState,
        message,
        description,
        requiredMark,
        tooltip,
        isHidden,
        labelSuffix,
        Component: textField,
        ref: domRef,
      }}
    />
  );
}

const _TextInputBase = forwardRef(TextInputBase);
export { _TextInputBase as TextInputBase };
export { AriaTextFieldProps };
