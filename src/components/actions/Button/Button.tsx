import { cloneElement, forwardRef, ReactElement, useMemo } from 'react';
import { CircleNotch } from '@jengaicons/react';
import { FocusableRef } from '@react-types/shared';

import { JengaActionProps } from '../Action';
import {
  CONTAINER_STYLES,
  extractStyles,
  Styles,
  tasty,
  TEXT_STYLES,
} from '../../../tasty';
import { accessibilityWarning } from '../../../utils/warnings';
import { useAction } from '../use-action';

export interface JengaButtonProps extends JengaActionProps {
  icon?: ReactElement;
  rightIcon?: ReactElement;
  isLoading?: boolean;
  isSelected?: boolean;
  type?: 'primary' | 'clear' | 'invisible' | 'link' | 'outline' | (string & {});
  size?: 'small' | 'medium' | 'large' | (string & {});
}

const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES];

export const DEFAULT_BUTTON_STYLES: Styles = {
  display: 'inline-grid',
  placeItems: 'center stretch',
  placeContent: 'center',
  position: 'relative',
  margin: 0,
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
  fontSize: '0.9375rem',
  fontWeight: 500,
  cursor: 'pointer',
  gap: '1x',
  flow: 'column',
  textDecoration: 'none',
  transition: 'theme',
  reset: 'button',
  padding: '0.5rem 1rem',
  whiteSpace: 'nowrap',
  radius: '2r',
  ButtonIcon: {
    display: 'grid',
    fontSize: '@icon-size',
  },
};

const ButtonElement = tasty({
  qa: 'Button',
  styles: DEFAULT_BUTTON_STYLES,
  variants: {
    default: {
      opacity: {
        '': 1,
        ' [disabled]': 0.5,
      },
      cursor: {
        '': 'pointer',
        '[disabled]': 'not-allowed',
      },

      outline: {
        '': '0 #purple-03.0',
        focused: '@outline-width #op-border-focus',
      },
      border: {
        // default
        '': '#op-border-primary',
        '[data-type="primary"] & pressed': '#op-border-primary',
        '[data-type="outline"]': '#op-border',
        '[data-type="outline"] & [disabled]': '#op-border',

        '([data-type="clear"] | [data-type="outline"]) & pressed': '#op-border',
        '([data-type="clear"]': '1px solid #clear',
        '([data-type="clear"] & hovered': '#op-border',
        '([data-type="clear"] & pressed': '#op-border',
        '([data-type="clear"] & [disabled]': '#op-border',

        '[data-type="invisible"] & pressed': '0',

        '[data-type="link"] | [data-type="invisible"]': 0,
      },
      fill: {
        '': '#op-surface-primary',
        '[data-type="primary"]': '#op-surface-primary',
        '[data-type="primary"] & pressed': '#op-surface-primary-pressed',
        '[data-type="primary"] & hovered': '#op-surface-primary-hovered',

        '([data-type="clear"] | [data-type="outline"])': '#clear',
        '([data-type="clear"] | [data-type="outline"]) & hovered':
          '#op-surface-hovered',
        '([data-type="clear"] | [data-type="outline"]) & pressed':
          '#op-surface-pressed',

        '[data-type="link"]': '#clear',
        '[data-type="invisible"]': '#clear',
      },
      color: {
        // default
        '': '#op-text-on-primary',
        '[data-type="invisible"] | [data-type="clear"] | [data-type="outline"]':
          '#op-text',
        '[data-type="link"]': '#op-text-primary',
      },
      padding: {
        '': '1x 2x',
        '[data-type="link"] | [data-type="invisible"]': 0,
        '[data-is-single-icon-only] ': '0.5rem',
      },
    },
    danger: {
      opacity: {
        '': 1,
        ' [disabled]': 0.5,
      },
      cursor: {
        '': 'pointer',
        '[disabled]': 'not-allowed',
      },

      outline: {
        '': '0 #clear',
        focused: '@outline-width #op-border-focus',
      },
      border: {
        '': '#op-border-critical',
        '[data-type="primary"] & pressed': '#op-border-critical',
        '[data-type="outline"]': '#op-border-critical',

        '[data-type="outline"] & pressed': '#op-border-critical',
        '[data-type="link"]': '#clear',

        '[data-type="clear"]': '0',
        '[data-type="clear"] & hovered | [data-type="clear"]  & pressed':
          '#op-border-critical',

        '[data-type="invisible"]': '0',
      },
      fill: {
        '': '#op-surface-critical',
        '[data-type="primary"]': '#op-surface-critical',
        '[data-type="primary"] & hovered': '#op-surface-critical-hovered',
        '[data-type="primary"] & pressed': '#op-surface-critical-pressed',

        '[data-type="invisible"]': '#clear',
        '[data-type="invisible"] & hovered': '#clear',
        '[data-type="invisible"] & pressed': '#clear',

        '[data-type="link"]': '#clear',

        '[data-type="clear"] | [data-type="outline"]': '#clear',
        '([data-type="clear"] | [data-type="outline"]) & hovered':
          '#op-surface-critical-hovered',
        '([data-type="clear"] | [data-type="outline"]) & pressed':
          '#op-surface-critical-hovered',
      },
      color: {
        '': '#op-text-on-primary',

        '[data-type="invisible"] | [data-type="clear"] | [data-type="outline"]':
          '#op-text-critical',
        '[data-type="outline"] & hovered': '#white',
        '[data-type="outline"] & pressed': '#white',

        '[data-type="invisible"] & hovered | [data-type="invisible"] & pressed':
          '#op-surface-critical-pressed',

        '[data-type="link"]': '#op-text-critical',
        '[data-type="link"] & hovered | [data-type="link"] & pressed':
          '#op-surface-critical-pressed',
      },
      padding: {
        '': '1x 2x',
        '[data-type="link"] | [data-type="invisible"]': 0,
        '[data-type="icon"] ': '0.5rem',
        '[data-is-single-icon-only] ': '0.5rem',
      },
      // filter: {
      //   '': '',
      //   '[data-type="link"] & hovered | [data-type="link"] & pressed':
      //     'brightness(0.7)',
      // },
    },
  },
});

export const Button = forwardRef(function Button(
  allProps: JengaButtonProps,
  ref: FocusableRef<HTMLElement>,
) {
  let {
    type,
    size,
    label,
    children,
    theme = 'default',
    icon,
    rightIcon,
    mods,
    ...props
  } = allProps;

  const isDisabled = props.isDisabled || props.isLoading;
  const isLoading = props.isLoading;
  const isSelected = props.isSelected;

  children = children || icon || rightIcon ? children : label;

  if (!children) {
    const specifiedLabel =
      label ?? props['aria-label'] ?? props['aria-labelledby'];
    if (icon) {
      if (!specifiedLabel) {
        accessibilityWarning(
          'If you provide `icon` property for a Button and do not provide any children then you should specify the `label` property to make sure the Button element stays accessible.',
        );
        label = 'Unnamed'; // fix to avoid warning in production
      }
    } else {
      if (!specifiedLabel) {
        accessibilityWarning(
          'If you provide no children for a Button then you should specify the `label` property to make sure the Button element stays accessible.',
        );
        label = 'Unnamed'; // fix to avoid warning in production
      }
    }
  }

  if (icon) {
    icon = cloneElement(icon, {
      'data-element': 'ButtonIcon',
    });
  }

  if (rightIcon) {
    rightIcon = cloneElement(rightIcon, {
      'data-element': 'ButtonIcon',
    });
  }

  const singleIcon = !!(
    ((icon && !rightIcon) || (rightIcon && !icon)) &&
    !children
  );

  const modifiers = useMemo(
    () => ({
      loading: isLoading,
      selected: isSelected,
      'single-icon-only': singleIcon,
      ...mods,
    }),
    [mods, isDisabled, isLoading, isSelected, singleIcon],
  );

  const { actionProps } = useAction(
    { ...allProps, isDisabled, mods: modifiers, ...(label ? { label } : {}) },
    ref,
  );

  const styles = extractStyles(props, STYLE_PROPS);

  return (
    <ButtonElement
      {...actionProps}
      variant={theme as 'default' | 'danger'}
      data-theme={theme}
      data-type={type ?? 'primary'}
      styles={styles}
    >
      {icon || isLoading ? (
        !isLoading ? (
          icon
        ) : (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
            }}
            className="loading-spinner"
          >
            <CircleNotch />
          </div>
        )
      ) : null}
      {children}
      {rightIcon}
    </ButtonElement>
  );
});
