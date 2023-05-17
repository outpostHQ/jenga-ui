import { ReactNode } from 'react';

import {
  LabelPosition,
  NecessityIndicator,
  ValidationState,
} from '../../../shared';
import { Props, Styles } from '../../../tasty';

// ADDING NEW PROPS TO THIS INTERFACE REQUIRES ADDING THEM TO createFieldWrapperPropsKeys FUNCTION

export type JengaFieldWrapperProps = {
  as?: string;
  validationState?: ValidationState;
  styles?: Styles;
  /** Whether the input is required */
  isRequired?: boolean;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  fieldProps?: Props;
  isHidden?: boolean;

  label?: ReactNode;
  labelPosition?: LabelPosition;
  labelSuffix?: ReactNode;
  labelStyles?: Styles;
  labelProps?: Props;
  /** The description for the field. It will be placed below the label */
  description?: ReactNode;
  // eslint-disable-next-line react/boolean-prop-naming
  requiredMark?: boolean;
  tooltip?: ReactNode;
  extra?: ReactNode;
  necessityLabel?: ReactNode;
  necessityIndicator?: NecessityIndicator;

  /** Custom message for the field. It will be placed below the label and the input */
  message?: string | ReactNode;
  /** Styles for the message */
  messageStyles?: Styles;

  Component?: JSX.Element;
};
