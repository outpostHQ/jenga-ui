import { CaretDownFill, CurrencyCircleDollar } from '@jengaicons/react';
import { Meta, StoryFn } from '@storybook/react';

import { baseProps } from '../../../stories/lists/baseProps';
import { Space } from '../../layout/Space';

import { Button } from './Button';

export default {
  title: 'Actions/Button',
  component: Button,
  parameters: { controls: { exclude: baseProps } },
  argTypes: {
    type: {
      options: ['primary', 'clear', 'invisible', 'link', 'outline'],
      control: 'radio',
    },
    theme: {
      defaultValue: undefined,
      control: { type: 'radio', options: [undefined, 'danger'] },
    },
  },
} as Meta<typeof Button>;

const TemplateSizes: StoryFn<typeof Button> = ({
  label,
  icon,
  rightIcon,
  size,
  ...props
}) => (
  <Button
    icon={icon ? <CurrencyCircleDollar /> : undefined}
    rightIcon={rightIcon ? <CaretDownFill /> : undefined}
    {...props}
  >
    {label}
  </Button>
);

const TemplateStates: StoryFn<typeof Button> = ({ label, mods, ...props }) => (
  <Space>
    <Button
      {...props}
      mods={{
        hovered: false,
        pressed: false,
        focused: false,
        disabled: false,
      }}
    >
      {label || 'Default'}
    </Button>
    <Button
      {...props}
      mods={{
        hovered: true,
        pressed: false,
        focused: false,
        disabled: false,
      }}
    >
      {label || 'Hovered'}
    </Button>
    <Button
      {...props}
      mods={{
        hovered: false,
        pressed: true,
        focused: false,
        disabled: false,
      }}
    >
      {label || 'Pressed'}
    </Button>
    <Button
      {...props}
      mods={{
        hovered: false,
        pressed: false,
        focused: true,
        disabled: false,
      }}
    >
      {label || 'Focused'}
    </Button>
    <Button {...props} isDisabled>
      {label || 'Disabled'}
    </Button>
  </Space>
);

export const Default = TemplateStates.bind({});
Default.args = {
  label: 'Button',
};

export const InvisibleStates = TemplateStates.bind({});
InvisibleStates.args = {
  type: 'invisible',
};

export const PrimaryStates = TemplateStates.bind({});
PrimaryStates.args = {
  type: 'primary',
};

export const OutlineStates = TemplateStates.bind({});
OutlineStates.args = {
  type: 'outline',
};

export const ClearStates = TemplateStates.bind({});
ClearStates.args = {
  type: 'clear',
};

export const LinkStates = TemplateStates.bind({});
LinkStates.args = {
  type: 'link',
};

export const DangerInvisibleStates = TemplateStates.bind({});
DangerInvisibleStates.args = {
  type: 'invisible',
  theme: 'danger',
};

export const DangerPrimaryStates = TemplateStates.bind({});
DangerPrimaryStates.args = {
  type: 'primary',
  theme: 'danger',
};

export const DangerOutlineStates = TemplateStates.bind({});
DangerOutlineStates.args = {
  type: 'outline',
  theme: 'danger',
};

export const DangerClearStates = TemplateStates.bind({});
DangerClearStates.args = {
  type: 'clear',
  theme: 'danger',
};

export const DangerLinkStates = TemplateStates.bind({});
DangerLinkStates.args = {
  type: 'link',
  theme: 'danger',
};

export const LeftIconAndText = TemplateSizes.bind({});
LeftIconAndText.args = {
  label: 'Button',
  icon: true,
};

export const RightIconAndText = TemplateSizes.bind({});
RightIconAndText.args = {
  label: 'Button',
  rightIcon: true,
};

export const TwoIconsAndText = TemplateSizes.bind({});
TwoIconsAndText.args = {
  label: 'Button',
  icon: true,
  rightIcon: true,
};

export const OnlyIcon = TemplateSizes.bind({});
OnlyIcon.args = {
  icon: true,
  type: 'icon',
};

export const Loading = TemplateSizes.bind({});
Loading.args = {
  icon: true,
  isLoading: true,
  label: 'Button',
};
