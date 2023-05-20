import { forwardRef, useMemo, useRef } from 'react';
import { useFocusableRef } from '@react-spectrum/utils';
import { useSwitch } from '@react-aria/switch';
import { useHover } from '@react-aria/interactions';
import { useToggleState } from '@react-stately/toggle';
import { CircleNotch } from '@jengaicons/react';

import { useProviderProps } from '../../../provider';
import {
  BaseProps,
  BLOCK_STYLES,
  BlockStyleProps,
  Element,
  extractStyles,
  filterBaseProps,
  OUTER_STYLES,
  OuterStyleProps,
  Styles,
  tasty,
} from '../../../tasty';
import { useFocus } from '../../../utils/react/interactions';
import { mergeProps } from '../../../utils/react';
import { HiddenInput } from '../../HiddenInput';
import { INLINE_LABEL_STYLES, LABEL_STYLES } from '../Label';
import { Text } from '../../content/Text';
import { FieldWrapper } from '../FieldWrapper';
import { FormFieldProps } from '../../../shared';
import {
  castNullableIsSelected,
  WithNullableSelected,
} from '../../../utils/react/nullableValue';
import { useFieldProps, useFormProps } from '../Form';

import type { AriaSwitchProps } from '@react-types/switch';

const SwitchWrapperElement = tasty({
  qa: 'SwitchWrapper',
  styles: {
    display: 'flex',
    position: 'relative',
    placeItems: {
      '': 'center stretch',
      'side-label': 'baseline stretch',
    },
    gap: '1x',
  },
});

const SwitchLabelElement = tasty({
  as: 'label',
  qa: 'SwitchLabel',
  styles: {
    position: 'relative',
    display: 'flex',
    placeItems: 'center',
    gap: '1x',
    flow: 'row',
    preset: 'input',
    width: 'min-content',
    cursor: 'pointer',
    verticalAlign: 'baseline',
  },
});

const SwitchElement = tasty({
  qa: 'Switch',
  styles: {
    position: 'relative',
    display: 'grid',
    verticalAlign: 'baseline',
    placeItems: 'center',
    radius: 'round',
    fill: {
      '': '#op-surface',
      checked: '#op-surface-primary',
    },
    color: '#white',
    border: '#op-border',
    width: {
      '': '45px',
      '[data-size="small"]': '3.5x 3.5x',
    },
    height: {
      '': '25px',
      '[data-size="small"]': '2x 2x',
    },
    outline: {
      '': '#purple-03.0',
      focused: '#purple-03',
    },
    transition: 'theme',

    placeSelf: {
      '': null,
      'inside-form & side-label': 'start',
    },
    opacity: {
      '': 1,
      disabled: 0.5,
    },
    cursor: {
      '': 'pointer',
      disabled: 'not-allowed',
    },

    Thumb: {
      position: 'absolute',
      width: {
        '': '19px',
        '[data-size="small"]': '1.5x 1.5x',
      },
      height: {
        '': '19px',
        '[data-size="small"]': '1.5x 1.5x',
      },
      radius: 'round',
      fill: {
        '': '#op-surface-primary',
        checked: '#op-surface',
        disabled: '#white.5',
      },
      top: {
        '': '3px',
        '[data-size="small"]': '2px',
      },
      left: {
        '': '3px',
        '[data-size="small"]': '2px',
        checked: '2.8125x',
        'checked & [data-size="small"]': '1.725x',
      },
      transition: 'left, theme',
    },
  },
});

export interface JengaSwitchProps
  extends BaseProps,
    OuterStyleProps,
    BlockStyleProps,
    FormFieldProps,
    AriaSwitchProps {
  inputStyles?: Styles;
  isLoading?: boolean;
  size?: 'large' | 'small';
}

function Switch(props: WithNullableSelected<JengaSwitchProps>, ref) {
  props = castNullableIsSelected(props);
  props = useProviderProps(props);
  props = useFormProps(props);
  props = useFieldProps(props, {
    defaultValidationTrigger: 'onChange',
    valuePropsMapper: ({ value, onChange }) => ({
      isSelected: value != null ? value : false,
      isIndeterminate: false,
      onChange: onChange,
    }),
  });

  let {
    qa,
    isDisabled = false,
    autoFocus,
    children,
    label,
    extra,
    labelProps,
    labelStyles,
    isLoading,
    insideForm,
    validationState,
    message,
    description,
    labelPosition,
    inputStyles,
    requiredMark = true,
    tooltip,
    labelSuffix,
    size = 'large',
    ...otherProps
  } = props;

  let styles = extractStyles(props, OUTER_STYLES);

  inputStyles = extractStyles(props, BLOCK_STYLES, inputStyles);

  labelStyles = useMemo(
    () => ({
      ...(insideForm ? LABEL_STYLES : INLINE_LABEL_STYLES),
      ...labelStyles,
    }),
    [insideForm, labelStyles],
  );

  let { isFocused, focusProps } = useFocus({ isDisabled }, true);
  let { hoverProps, isHovered } = useHover({ isDisabled });

  let inputRef = useRef(null);
  let domRef = useFocusableRef(ref, inputRef);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { inputProps } = useSwitch(props, useToggleState(props), inputRef);

  const mods = {
    'inside-form': insideForm,
    'side-label': labelPosition === 'side',
    checked: inputProps.checked,
    disabled: isDisabled,
    hovered: isHovered,
    focused: isFocused,
  };

  const switchField = (
    <SwitchWrapperElement mods={mods} data-size={size}>
      <HiddenInput
        data-qa="HiddenInput"
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
      />
      <SwitchElement
        qa={qa || 'Switch'}
        mods={mods}
        data-size={size}
        styles={inputStyles}
      >
        <div data-element="Thumb" aria-hidden="true" />
      </SwitchElement>
      {children ? <Text nowrap>{children}</Text> : null}
    </SwitchWrapperElement>
  );

  if (insideForm) {
    return (
      <FieldWrapper
        {...{
          as: 'label',
          labelPosition,
          label,
          extra,
          styles,
          labelStyles,
          labelProps,
          isDisabled,
          validationState,
          message,
          children,
          description,
          requiredMark,
          tooltip,
          labelSuffix,
          Component: switchField,
          ref: domRef,
        }}
      />
    );
  }

  return (
    <SwitchLabelElement
      styles={styles}
      mods={mods}
      {...hoverProps}
      {...filterBaseProps(otherProps)}
      ref={domRef}
    >
      {switchField}
      {label ? (
        <Element
          styles={labelStyles}
          mods={{
            disabled: isDisabled,
          }}
          {...filterBaseProps(labelProps)}
        >
          {label}
          {isLoading ? (
            <>
              {label ? <>&nbsp;</> : null}
              <CircleNotch />
            </>
          ) : null}
        </Element>
      ) : null}
    </SwitchLabelElement>
  );
}

/**
 * Switches allow users to turn an individual option on or off.
 * They are usually used to activate or deactivate a specific setting.
 */
let _Switch = forwardRef(Switch);

(_Switch as any).jengaInputType = 'Checkbox';

export { _Switch as Switch };
