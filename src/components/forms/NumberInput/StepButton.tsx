import { CaretDownFill, CaretUpFill } from '@jengaicons/react';

import { Button } from '../../actions';
import { Styles } from '../../../tasty';

const STEP_BUTTON_STYLES: Styles = {
  width: '4x',
  radius: {
    '': '0 (1r - 1bw) 0 0',
    down: '0 0 (1r - 1bw) 0',
  },
  fontSize: '12px',
  lineHeight: '12px',
  height: 'auto',
  fill: {
    '': '#dark.0',
    hovered: '#dark.04',
    pressed: '#purple.10',
    '[disabled]': '#dark.0',
  },

  '@icon-size': {
    '': '14px',
    '[data-size="small"]': '13px',
  },
};

/**
 * Buttons for NumberField.
 */
export function StepButton(props) {
  return (
    <Button
      preventDefault
      type="clear"
      border="0"
      padding="0"
      styles={STEP_BUTTON_STYLES}
      icon={
        props.direction === 'up' ? (
          <CaretUpFill style={{ fontSize: 'var(--icon-size)' }} />
        ) : (
          <CaretDownFill style={{ fontSize: 'var(--icon-size)' }} />
        )
      }
      mods={{
        up: props.direction === 'up',
        down: props.direction === 'down',
      }}
      label={`Step ${props.direction}`}
      {...props}
    />
  );
}
