import { useFocusableRef } from '@react-spectrum/utils';
import { forwardRef, useContext, useRef } from 'react';
import { useCheckbox, useCheckboxGroupItem } from '@react-aria/checkbox';
import { useHover } from '@react-aria/interactions';
import { useToggleState } from '@react-stately/toggle';

import { useProviderProps } from '../../../provider';
import {
  BaseProps,
  BLOCK_STYLES,
  Element,
  extractStyles,
  filterBaseProps,
  OUTER_STYLES,
  Styles,
  tasty,
} from '../../../tasty';
import { useFocus } from '../../../utils/react/interactions';
import { mergeProps } from '../../../utils/react';
import { INLINE_LABEL_STYLES, LABEL_STYLES } from '../Label';
import { HiddenInput } from '../../HiddenInput';
import { useFieldProps, useFormProps } from '../Form';
import { FieldWrapper } from '../FieldWrapper';
import { FormFieldProps } from '../../../shared';
import {
  castNullableIsSelected,
  WithNullableSelected,
} from '../../../utils/react/nullableValue';
import { Text } from '../../content/Text';

import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxGroupContext } from './context';

import type { FocusableRef } from '@react-types/shared';
import type { AriaCheckboxProps } from '@react-types/checkbox';

export interface JengaCheckboxProps
  extends BaseProps,
    AriaCheckboxProps,
    FormFieldProps {}

function Check() {
  return (
    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.417 7.604l-.017.018-3.4-3.4 1.433-1.433 1.985 1.985L8.192 0l1.432 1.433-6.189 6.189-.018-.018z"
        fill="currentColor"
      />
    </svg>
  );
}
function IndeterminateOutline() {
  return (
    <svg width="9" height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 .044v2.001l.026.025h8.063V.044H0z" />
    </svg>
  );
}

const CheckboxWrapperElement = tasty({
  as: 'label',
  qa: 'CheckboxWrapper',
  styles: {
    position: 'relative',
    display: 'flex',
    placeItems: 'center start',
    placeContent: 'baseline',
    gap: '1x',
    flow: 'row',
    preset: 'default',
    cursor: 'pointer',
  },
});

const CheckboxElement = tasty({
  qa: 'Checkbox',
  styles: {
    display: 'grid',
    placeItems: 'center',
    radius: '0.5x',
    fill: {
      '': '#op-surface',
      'checked | indeterminate': '#op-surface-primary',
      'invalid & checked': '#op-text-critical',
    },
    color: {
      '': '#op-surface',
      checked: '#op-surface',
      'disabled & !checked & !indeterminate': '#clear',
    },
    border: {
      '': '#op-border',
      invalid: '#op-border-critical',
      'disabled | ((indeterminate | checked) & !invalid)': '#clear',
    },
    cursor: {
      disabled: 'not-allowed',
    },
    width: '2.5x',
    height: '2.5x',
    outline: {
      '': '#clear',
      focused: '#op-border-focus',
    },
    transition: 'theme',
    opacity: {
      '': 1,
      disabled: 0.5,
    },
  },
});

function Checkbox(
  props: WithNullableSelected<JengaCheckboxProps>,
  ref: FocusableRef,
) {
  // Swap hooks depending on whether this checkbox is inside a CheckboxGroup.
  // This is a bit unorthodox. Typically, hooks cannot be called in a conditional,
  // but since the checkbox won't move in and out of a group, it should be safe.
  let groupState = useContext(CheckboxGroupContext);

  props = castNullableIsSelected(props);

  let originalProps = props;

  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, {
    defaultValidationTrigger: 'onChange',
    valuePropsMapper: ({ value, onChange }) => ({
      isSelected: value ?? false,
      isIndeterminate: false,
      onChange: onChange,
    }),
    unsafe__isDisabled: !!groupState,
  });

  let {
    qa,
    isIndeterminate = false,
    isDisabled = false,
    insideForm,
    isRequired,
    autoFocus,
    children,
    label,
    extra,
    validationState,
    labelProps,
    labelStyles,
    labelPosition,
    necessityLabel,
    necessityIndicator,
    message,
    description,
    requiredMark = true,
    tooltip,
    isHidden,
    labelSuffix,
    ...otherProps
  } = props;

  let styles: Styles = extractStyles(props, OUTER_STYLES);
  let inputStyles = extractStyles(props, BLOCK_STYLES);

  labelStyles = {
    ...(insideForm && !groupState ? LABEL_STYLES : INLINE_LABEL_STYLES),
    ...labelStyles,
  };

  let { isFocused, focusProps } = useFocus({ isDisabled }, true);
  let { hoverProps, isHovered } = useHover({ isDisabled });

  let inputRef = useRef(null);
  let domRef = useFocusableRef(ref, inputRef);

  const toggleState = useToggleState(props);

  let { inputProps } = groupState // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useCheckboxGroupItem(
        {
          ...props,
          // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
          // it's passed explicitly here to avoid typescript error (requires strictNullChecks disabled).
          value: props.value || '',
          // Only pass isRequired and validationState to react-aria if they came from
          // the props for this individual checkbox, and not from the group via context.
          isRequired: originalProps.isRequired,
          validationState: originalProps.validationState,
        },
        groupState,
        inputRef,
      ) // eslint-disable-next-line react-hooks/rules-of-hooks
    : useCheckbox(
        {
          ...props,
          ...(typeof label === 'string' && label.trim()
            ? { 'aria-label': label }
            : {}),
        },
        toggleState,
        inputRef,
      );

  let markIcon = isIndeterminate ? <IndeterminateOutline /> : <Check />;

  if (groupState) {
    for (let key of ['isSelected', 'defaultSelected', 'isEmphasized']) {
      if (originalProps[key] != null) {
        console.warn(
          `JengaUIKit: ${key} is unsupported on individual <Checkbox> elements within a <CheckboxGroup>. Please apply these props to the group instead.`,
        );
      }
    }
    if (props.value == null) {
      console.warn(
        'JengaUIKit: A <Checkbox> element within a <CheckboxGroup> requires a `value` property.',
      );
    }
  }

  const mods = {
    checked: inputProps.checked,
    indeterminate: isIndeterminate,
    invalid: validationState === 'invalid',
    valid: validationState === 'valid',
    disabled: isDisabled,
    hovered: isHovered,
    focused: isFocused,
    'side-label': labelPosition === 'side',
    'inside-form': insideForm,
  };

  const checkboxField = (
    <CheckboxWrapperElement
      isHidden={isHidden}
      mods={mods}
      styles={{
        position: 'relative',
      }}
    >
      <HiddenInput
        data-qa={qa || 'Checkbox'}
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
      />
      <CheckboxElement qa="Checkbox" mods={mods} styles={inputStyles}>
        {markIcon}
      </CheckboxElement>
      {children && <Text>{children}</Text>}
    </CheckboxWrapperElement>
  );

  if (insideForm && !groupState) {
    return (
      <FieldWrapper
        {...{
          as: 'label',
          labelPosition,
          label,
          children,
          extra,
          styles,
          isRequired,
          labelStyles,
          isHidden,
          labelProps,
          isDisabled,
          validationState,
          necessityLabel,
          necessityIndicator,
          message,
          description,
          requiredMark,
          tooltip,
          labelSuffix,
          Component: checkboxField,
          ref: domRef,
        }}
      />
    );
  }

  return (
    <CheckboxWrapperElement
      as="label"
      styles={styles}
      isHidden={isHidden}
      {...hoverProps}
      {...filterBaseProps(otherProps)}
      ref={domRef}
    >
      {checkboxField}
      {label ? (
        <Element
          styles={labelStyles}
          mods={{
            invalid: validationState === 'invalid',
            valid: validationState === 'valid',
            disabled: isDisabled,
          }}
          {...filterBaseProps(labelProps)}
        >
          {label}
        </Element>
      ) : null}
    </CheckboxWrapperElement>
  );
}

/**
 * Checkboxes allow users to select multiple items from a list of individual items,
 * or to mark one individual item as selected.
 */
let _Checkbox = forwardRef(Checkbox);

(_Checkbox as any).jengaInputType = 'Checkbox';
let __Checkbox = Object.assign(
  _Checkbox as typeof _Checkbox & { Group: typeof CheckboxGroup },
  { Group: CheckboxGroup },
);

export { __Checkbox as Checkbox };
