import { CurrencyCircleDollar } from '@jengaicons/react';
import { Meta, StoryFn } from '@storybook/react';

import {
  ICON_ARG,
  TEXT_VALUE_ARG,
  VALIDATION_STATE_ARG,
} from '../../../stories/FormFieldArgs';
import { baseProps } from '../../../stories/lists/baseProps';

import { TextInput, JengaTextInputProps } from './TextInput';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    ...TEXT_VALUE_ARG,
    ...ICON_ARG,
    ...VALIDATION_STATE_ARG,
  },
} as Meta<typeof TextInput>;

const Template: StoryFn<JengaTextInputProps & { icon?: boolean }> = ({
  icon,
  ...props
}) => (
  <TextInput
    fullWidth={false}
    icon={icon ? <CurrencyCircleDollar /> : undefined}
    {...props}
    onChange={(query) => console.log('change', query)}
  />
);

export const Default = Template.bind({});
Default.args = {};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = { defaultValue: 'default value' };

export const WithIcon = Template.bind({});
WithIcon.args = { icon: true };

export const Password = Template.bind({});
Password.args = { icon: true, type: 'password' };

export const Invalid = Template.bind({});
Invalid.args = { validationState: 'invalid' };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true };
