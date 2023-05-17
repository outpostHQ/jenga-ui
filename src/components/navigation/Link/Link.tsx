import { forwardRef } from 'react';
import { FocusableRef } from '@react-types/shared';

import { Button, JengaButtonProps } from '../../actions';

export const Link = forwardRef(function Link(
  props: JengaButtonProps,
  ref: FocusableRef<HTMLElement>,
) {
  return <Button type="link" {...props} ref={ref} />;
});
