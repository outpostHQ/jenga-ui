import { ForwardedRef, forwardRef } from 'react';

import { TextInput } from '../TextInput/TextInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { NumberInput } from '../NumberInput/NumberInput';
import { FileInput } from '../FileInput/FileInput';
import { TextArea } from '../TextArea/TextArea';

type JengaInput = typeof TextInput & {
  Text: typeof TextInput;
  Password: typeof PasswordInput;
  Number: typeof NumberInput;
  TextArea: typeof TextArea;
  File: typeof FileInput;
};

export const Input: JengaInput = Object.assign(
  forwardRef(function Input(props, ref: ForwardedRef<HTMLInputElement>) {
    return <TextInput ref={ref} {...props} />;
  }),
  {
    Text: TextInput,
    Password: PasswordInput,
    Number: NumberInput,
    TextArea: TextArea,
    File: FileInput,
  },
);
