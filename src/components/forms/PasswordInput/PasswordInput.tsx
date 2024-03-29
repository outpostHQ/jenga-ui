import { forwardRef, useCallback, useRef, useState } from 'react';
import { useTextField } from '@react-aria/textfield';
import { EyeSlash, Eye } from '@jengaicons/react';

import {
  JengaTextInputBaseProps,
  TextInputBase,
} from '../TextInput/TextInputBase';
import { useProviderProps } from '../../../provider';
import { Button } from '../../actions';
import {
  castNullableStringValue,
  WithNullableValue,
} from '../../../utils/react/nullableValue';
import { useFieldProps } from '../Form';

function PasswordInput(props: WithNullableValue<JengaTextInputBaseProps>, ref) {
  props = castNullableStringValue(props);
  props = useProviderProps(props);
  props = useFieldProps(props, {
    defaultValidationTrigger: 'onBlur',
    valuePropsMapper: ({ value, onChange }) => ({
      value: value?.toString() ?? '',
      onChange,
    }),
  });

  let [type, setType] = useState('password');
  let inputRef = useRef(null);
  let { labelProps, inputProps } = useTextField(
    {
      ...props,
      type,
    },
    inputRef,
  );

  const { suffix, multiLine, ...rest } = props;

  const toggleType = useCallback(() => {
    setType((type) => (type === 'password' ? 'text' : 'password'));
  }, []);

  const wrappedSuffix = (
    <>
      {suffix}
      <Button
        excludeFromTabOrder
        type="outline"
        styles={{
          border: '0',
          borderLeft: '1px solid #op-border',
          zIndex: 1,
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        }}
        htmlType="button"
        placeSelf="stretch"
        height="auto"
        width="4.5x"
        label="Toggle masking"
        icon={type === 'password' ? <EyeSlash /> : <Eye />}
        onPress={toggleType}
      />
    </>
  );

  return (
    <TextInputBase
      ref={ref}
      labelProps={labelProps}
      inputProps={inputProps}
      inputRef={inputRef}
      inputStyles={{ paddingRight: '4x' }}
      type={type}
      suffixPosition="after"
      overflow="hidden"
      suffix={wrappedSuffix}
      multiLine={multiLine}
      {...rest}
    />
  );
}

/**
 * PasswordInputs are password inputs that allow users to input passwords or code entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _PasswordInput = forwardRef(PasswordInput);

(_PasswordInput as any).jengaInputType = 'Text';

export { _PasswordInput as PasswordInput };
