import { forwardRef } from 'react';

import { useSlotProps } from '../../../utils/react';
import { JengaSpaceProps, Space } from '../../layout/Space';
import { tasty } from '../../../tasty';

const ButtonGroupElement = tasty(Space, {
  qa: 'ButtonGroup',
  styles: {
    gridArea: 'buttonGroup',
  },
});

export const ButtonGroup = forwardRef(function ButtonGroup(
  props: JengaSpaceProps,
  ref,
) {
  return (
    <ButtonGroupElement ref={ref} {...useSlotProps(props, 'buttonGroup')} />
  );
});
