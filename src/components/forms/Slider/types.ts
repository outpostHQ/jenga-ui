import {
  BasePropsWithoutChildren,
  BlockStyleProps,
  OuterStyleProps,
  Styles,
} from '../../../tasty';
import { FormFieldProps } from '../../../shared';

import type { AriaSliderProps } from '@react-types/slider';

export interface JengaSliderBaseProps<T>
  extends Omit<AriaSliderProps<T>, 'label'>,
    BasePropsWithoutChildren,
    OuterStyleProps,
    FormFieldProps,
    BlockStyleProps {
  inputStyles?: Styles;
  gradation?: string[];
  // onChange?: (range: T) => void;
  // onChangeEnd?: (range: T) => void;
  inputWidth?: string;
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** Whether the value's label is displayed. True by default if there's a `label`, false by default if not. */
  showValueLabel?: boolean;
  /** A function that returns the content to display as the value's label. Overrides default formatted number. */
  getValueLabel?: (value: T) => string;
}
