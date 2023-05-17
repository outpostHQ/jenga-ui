import { AriaButtonProps } from '@react-types/button';

import { JengaButtonProps } from '../../components/actions';

/** Converts AriaButtonProps to JengaButtonProps */
export function ariaToJengaButtonProps(
  props: AriaButtonProps<'button'>,
): JengaButtonProps {
  const { type, ...filteredProps } = props;

  return {
    ...filteredProps,
    htmlType: type,
  };
}

/** Converts JengaButtonProps to AriaButtonProps */
export function jengaToAriaButtonProps(
  props: JengaButtonProps,
): AriaButtonProps<'button'> {
  const { htmlType, ...filteredProps } = props;

  return {
    ...filteredProps,
    type: htmlType,
  };
}
