import { useEffect, useRef, useState } from 'react';
import { ModalProvider } from '@react-aria/overlays';
import { StyleSheetManager } from 'styled-components';

import {
  BASE_STYLES,
  BaseProps,
  BLOCK_STYLES,
  extractStyles,
  filterBaseProps,
  tasty,
} from '../tasty';
import { Provider } from '../provider';
import { TOKENS } from '../tokens';
import { useViewportSize } from '../utils/react';
import { TrackingProps, TrackingProvider } from '../providers/TrackingProvider';

import { PortalProvider } from './portal';
import { GlobalStyles } from './GlobalStyles';
import { AlertDialogApiProvider } from './overlays/AlertDialog';
import { NotificationsProvider } from './overlays/NewNotifications';
import { JengaIconContext } from '@jengaicons/react';

const RootElement = tasty({
  id: 'jenga-ui-kit-root',
  className: 'root',
});

const DEFAULT_STYLES = {
  display: 'block',
  preset: 't3',
  ...Object.keys(TOKENS).reduce((map, key) => {
    map[`@${key}`] = TOKENS[key];

    return map;
  }, {}),
};
const STYLES = [...BASE_STYLES, ...BLOCK_STYLES];

export interface JengaRootProps extends BaseProps {
  tokens?: { [key: string]: string };
  bodyStyles?: { [key: string]: string };
  fonts?: boolean;
  publicUrl?: string;
  router?: any;
  font?: string;
  monospaceFont?: string;
  applyLegacyTokens?: boolean;
  tracking?: TrackingProps;
}

const IS_DVH_SUPPORTED =
  typeof CSS !== 'undefined' && typeof CSS?.supports === 'function'
    ? CSS.supports('height: 100dvh')
    : false;

export function Root(allProps: JengaRootProps) {
  let {
    children,
    /** Raw css styles for body element */
    bodyStyles,
    fonts,
    publicUrl,
    router,
    font,
    monospaceFont,
    applyLegacyTokens,
    tracking,
    ...props
  } = allProps;

  const ref = useRef(null);

  const [rootRef, setRootRef] = useState();

  // We need to measure the window's height in JS rather than using percentages in CSS
  // so that contents (e.g. menu) can inherit the max-height properly. Using percentages
  // does not work properly because there is nothing to base the percentage on.
  // We cannot use vh units because mobile browsers adjust the window height dynamically
  // when the address bar/bottom toolbars show and hide on scroll and vh units are fixed.
  // Also, the visual viewport is smaller than the layout viewport when the virtual keyboard
  // is up, so use the VisualViewport API to ensure the tray is displayed above the keyboard.
  let viewport = useViewportSize({ isDisabled: IS_DVH_SUPPORTED });
  let [height, setHeight] = useState(
    IS_DVH_SUPPORTED ? undefined : viewport.height,
  );
  let timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (IS_DVH_SUPPORTED && typeof window !== 'undefined') {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // When the height is decreasing, and the keyboard is visible
    // (visual viewport smaller than layout viewport), delay setting
    // the new max height until after the animation is complete
    // so that there isn't an empty space under the tray briefly.
    if (
      viewport.height < (height || 0) &&
      viewport.height < window.innerHeight
    ) {
      timeoutRef.current = setTimeout(() => {
        setHeight(viewport.height);
      }, 500);
    } else {
      setHeight(viewport.height);
    }
  }, [height, viewport.height]);

  useEffect(() => {
    if (!rootRef) {
      // @ts-ignore
      setRootRef(ref?.current);
    }
  }, []);

  const styles = extractStyles(props, STYLES, DEFAULT_STYLES);

  return (
    <Provider router={router} root={rootRef}>
      <TrackingProvider event={tracking?.event}>
        <StyleSheetManager enableVendorPrefixes={false}>
          <RootElement
            ref={ref}
            {...filterBaseProps(props, { eventProps: true })}
            styles={styles}
            style={{
              '--jenga-dynamic-viewport-height': height
                ? height + 'px'
                : '100dvh',
            }}
          >
            <GlobalStyles
              bodyStyles={bodyStyles}
              applyLegacyTokens={applyLegacyTokens}
              publicUrl={publicUrl}
              fonts={fonts}
              font={font}
              monospaceFont={monospaceFont}
            />
            <ModalProvider>
              <PortalProvider value={ref}>
                <NotificationsProvider rootRef={ref}>
                  <AlertDialogApiProvider>
                    <JengaIconContext.Provider
                      value={{
                        size: '1rem',
                        color: 'currentColor',
                      }}
                    >
                      {children}
                    </JengaIconContext.Provider>
                  </AlertDialogApiProvider>
                </NotificationsProvider>
              </PortalProvider>
            </ModalProvider>
          </RootElement>
        </StyleSheetManager>
      </TrackingProvider>
    </Provider>
  );
}
