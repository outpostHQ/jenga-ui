import { CurrencyCircleDollar } from '@jengaicons/react';
import { StoryFn } from '@storybook/react';

import { baseProps } from '../../../stories/lists/baseProps';
import { NUMBER_VALUE_ARG } from '../../../stories/FormFieldArgs';

import { NumberInput } from './NumberInput';

export default {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    ...NUMBER_VALUE_ARG,
  },
};

const Template: StoryFn<typeof NumberInput> = ({ icon, ...props }) => (
  <NumberInput
    prefix={icon ? <CurrencyCircleDollar /> : null}
    {...props}
    onChange={(query) => console.log('change', query)}
  />
);

export const Default = Template.bind({});
Default.args = {};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = { defaultValue: 5 };

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
