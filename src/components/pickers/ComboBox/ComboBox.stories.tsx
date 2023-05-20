import { CurrencyCircleDollar } from '@jengaicons/react';
import { Meta, Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { SELECTED_KEY_ARG } from '../../../stories/FormFieldArgs';
import { baseProps } from '../../../stories/lists/baseProps';

import { ComboBox, JengaComboBoxProps } from './ComboBox';

export default {
  title: 'Pickers/ComboBox',
  component: ComboBox,
  subcomponents: { Item: ComboBox.Item },
  args: { id: 'name', label: 'Choose your favourite color' },
  parameters: { controls: { exclude: baseProps } },
  argTypes: { ...SELECTED_KEY_ARG },
} as Meta<JengaComboBoxProps<any>>;

const Template: Story<JengaComboBoxProps<any>> = (args) => (
  <>
    <ComboBox {...args}>
      <ComboBox.Item key="red">Red</ComboBox.Item>
      <ComboBox.Item key="orange">Orange</ComboBox.Item>
      <ComboBox.Item key="yellow">Yellow</ComboBox.Item>
      <ComboBox.Item key="green">Green</ComboBox.Item>
      <ComboBox.Item key="blue">Blue</ComboBox.Item>
      <ComboBox.Item key="purple">Purple</ComboBox.Item>
      <ComboBox.Item key="violet">Violet</ComboBox.Item>
    </ComboBox>
  </>
);

export const Default = Template.bind({});
Default.args = {};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = { placeholder: 'Enter a value' };

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = { defaultSelectedKey: 'purple' };

export const WithIcon = Template.bind({});
WithIcon.args = { icon: <CurrencyCircleDollar /> };

export const Invalid = Template.bind({});
Invalid.args = { selectedKey: 'yellow', validationState: 'invalid' };

export const Valid = Template.bind({});
Valid.args = { selectedKey: 'yellow', validationState: 'valid' };

export const Disabled = Template.bind({});
Disabled.args = { selectedKey: 'yellow', isDisabled: true };

export const Wide: Story<JengaComboBoxProps<any>> = (args) => (
  <ComboBox {...args}>
    <ComboBox.Item key="red">
      Red lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </ComboBox.Item>
    <ComboBox.Item key="blue">
      Blue lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </ComboBox.Item>
  </ComboBox>
);

Wide.args = { width: '600px', defaultSelectedKey: 'red' };

export const With1LongOption: Story<JengaComboBoxProps<any>> = (args) => (
  <ComboBox {...args}>
    <ComboBox.Item key="red">Red</ComboBox.Item>
    <ComboBox.Item key="orange">Orange</ComboBox.Item>
    <ComboBox.Item key="yellow">Yellow</ComboBox.Item>
    <ComboBox.Item key="green">
      green lorem ipsum dolor sit amet, consectetur adipiscing elit
    </ComboBox.Item>
    <ComboBox.Item key="blue">Blue</ComboBox.Item>
    <ComboBox.Item key="purple">Purple</ComboBox.Item>
    <ComboBox.Item key="violet">Violet</ComboBox.Item>
  </ComboBox>
);
With1LongOption.parameters = { layout: 'centered' };
With1LongOption.play = async ({ canvasElement }) => {
  const { getByRole } = within(canvasElement);

  const openButton = getByRole('button');

  await userEvent.click(openButton);
};

export const With1LongOptionFiltered = With1LongOption.bind({});
With1LongOptionFiltered.parameters = { layout: 'centered' };
With1LongOptionFiltered.play = async ({ canvasElement }) => {
  const { getByRole } = within(canvasElement);

  const combobox = getByRole('combobox');

  await userEvent.type(combobox, 'Red');
};
