import { ReactNode } from 'react';
import { Check } from '@jengaicons/react';

import { Button, JengaButtonProps } from '../../actions';
import { Text } from '../../content/Text';
import { tasty } from '../../../tasty';
import { Space } from '../../layout/Space';

const StyledButton = tasty(Button, {
  styles: {
    border: {
      '': '#clear',
      pressed: '#clear',
    },
    fill: {
      '': '#op-surface',
      'hovered | focused': '#op-surface-hovered',
      'pressed | selected': '#op-surface-active',
      'focused & selected': '#op-surface-active',
      'focused & pressed': '#op-surface-active',
      disabled: '#clear',
    },
    color: {
      '': '#op-text',
      'hovered | focused': '#op-text',
      'pressed | selected': '#op-text-strong',
      'focused & selected': '#op-text-strong',
      'focused & pressed': '#op-text-strong',
      disabled: '#dark-04',
    },
    cursor: {
      '': 'pointer',
      disabled: 'not-allowed',
    },
    shadow: '#clear',
    padding: {
      '': '(0.75x - 1px) (1.5x - 1px)',
      'selectable & !selected':
        '(0.75x - 1px) (1.5x - 1px) (0.75x - 1px) (1.5x - 1px)',
      'selectionIcon & selectable & !selected':
        '(0.75x - 1px) (1.5x - 1px) (0.75x - 1px) (1.5x - 1px + 22px)',
    },
    display: 'flex',
    flow: 'row',
    justifyContent: 'start',
    Postfix: {
      color: {
        '': '#op-text-soft',
        'hovered | focused': '#op-text-soft',
      },
    },
  },
});

const RadioIcon = tasty({
  styles: {
    display: 'flex',
    width: '1.875x',
    placeContent: 'center',

    '&::before': {
      display: 'block',
      content: '""',
      width: '1x',
      height: '1x',
      radius: 'round',
      fill: '#current',
    },
  },
});

const getPostfix = (postfix) =>
  typeof postfix === 'string' ? (
    <Text nowrap color="inherit" data-element="Postfix">
      {postfix}
    </Text>
  ) : (
    postfix
  );

export type MenuSelectionType = 'checkbox' | 'radio';

export type MenuButtonProps = {
  postfix: ReactNode;
  selectionIcon?: MenuSelectionType;
  isSelectable?: boolean;
  // eslint-disable-next-line react/boolean-prop-naming
  disabled?: boolean;
} & JengaButtonProps;

const getSelectionTypeIcon = (selectionIcon?: MenuSelectionType) => {
  switch (selectionIcon) {
    case 'checkbox':
      return <Check />;
    case 'radio':
      return <RadioIcon />;
    default:
      return undefined;
  }
};

export function MenuButton({
  children,
  icon,
  postfix,
  ...props
}: MenuButtonProps) {
  const { selectionIcon, isSelected, isSelectable } = props;
  const checkIcon =
    isSelectable && isSelected
      ? getSelectionTypeIcon(selectionIcon)
      : undefined;
  const mods = {
    ...props.mods,
    selectionIcon: !!selectionIcon,
    selectable: isSelectable,
    selected: isSelected,
  };

  return (
    <StyledButton
      type="neutral"
      size="small"
      {...props}
      icon={checkIcon}
      mods={mods}
    >
      {icon && <Text color="inherit">{icon}</Text>}
      <Space gap="1x" placeContent="space-between" overflow="auto" width="100%">
        <Text ellipsis color="inherit">
          {children}
        </Text>
        {postfix && getPostfix(postfix)}
      </Space>
    </StyledButton>
  );
}
