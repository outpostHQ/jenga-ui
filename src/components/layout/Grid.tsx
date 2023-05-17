import { forwardRef } from 'react';

import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  ShortGridStyles,
  tasty,
} from '../../tasty';

const GridElement = tasty({
  styles: {
    display: 'grid',
    flow: 'row',
  },
});

export interface JengaGridProps
  extends BaseProps,
    ContainerStyleProps,
    ShortGridStyles {}

const PROP_MAP = {
  template: 'gridTemplate',
  columns: 'gridColumns',
  rows: 'gridRows',
  areas: 'gridAreas',
} as const;

export const Grid = forwardRef(function Grid(props: JengaGridProps, ref) {
  const styles = extractStyles(props, CONTAINER_STYLES, undefined, PROP_MAP);

  return (
    <GridElement
      {...filterBaseProps(props, { eventProps: true })}
      ref={ref}
      styles={styles}
    />
  );
});
