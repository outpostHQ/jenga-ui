import { ReactNode } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import {
  JengaDialogProps,
  JengaDialogTriggerProps,
  Dialog,
  DialogTrigger,
} from '../../Dialog';
import { tasty } from '../../../../tasty';
import { Flex } from '../../../layout/Flex';
import { Title } from '../../../content/Title';
import { ClearSlots } from '../../../../utils/react';
import { JengaNotifyApiPropsWithID } from '../types';
import { useNotificationsObserver } from '../hooks';

export type NotificationsDialogTriggerProps = Omit<
  JengaDialogTriggerProps,
  'type'
> & {
  onCloseNotificationInBar?: (props: JengaNotifyApiPropsWithID) => void;
};

export function NotificationsDialogTrigger(
  props: NotificationsDialogTriggerProps,
) {
  const { onCloseNotificationInBar, ...dialogTriggerProps } = props;

  useNotificationsObserver((args) => onCloseNotificationInBar?.(args));

  return <DialogTrigger {...dialogTriggerProps} type="popover" />;
}

const StyledDialog = tasty(Dialog, { height: 'auto calc(100vh - 12x)' });

const StyledDialogContent = tasty(Flex, {
  styles: {
    flow: 'column',
    placeItems: 'start start',
    styledScrollbar: true,
    height: '100%',
    border: '1bw solid #border',
    radius: '0.5x',
    overflow: 'auto',
  },
});

export type NotificationsDialogProps = { title?: ReactNode } & JengaDialogProps;

export function NotificationsDialog(props: NotificationsDialogProps) {
  const { children, title = 'Notifications', ...dialogProps } = props;

  return (
    <StyledDialog {...dialogProps}>
      <VisuallyHidden>
        <Title>{title}</Title>
      </VisuallyHidden>

      <StyledDialogContent>
        <ClearSlots>{children}</ClearSlots>
      </StyledDialogContent>
    </StyledDialog>
  );
}
