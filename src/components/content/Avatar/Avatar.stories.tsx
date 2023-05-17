import { CurrencyCircleDollar } from '@jengaicons/react';

import { baseProps } from '../../../stories/lists/baseProps';

import { Avatar } from './Avatar';

export default {
  title: 'Content/Avatar',
  component: Avatar,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const Template = ({ label, icon, ...args }) => (
  <Avatar {...args} icon={icon ? <CurrencyCircleDollar /> : null}>
    {label}
  </Avatar>
);

export const Default = Template.bind({});
Default.args = {
  label: 'OP',
};
