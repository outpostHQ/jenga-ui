import { forwardRef, useRef } from 'react';
import { X, MagnifyingGlass } from '@jengaicons/react';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';

import {
  JengaTextInputBaseProps,
  TextInputBase,
} from '../TextInput/TextInputBase';
import { useProviderProps } from '../../../provider';
import { Button } from '../../actions';
import { ariaToJengaButtonProps } from '../../../utils/react/mapProps';
import {
  castNullableStringValue,
  WithNullableValue,
} from '../../../utils/react/nullableValue';
import { tasty } from '../../../tasty';

export interface JengaSearchInputProps extends JengaTextInputBaseProps {
  /** Whether the search input is clearable using ESC keyboard button or clear button inside the input */
  isClearable?: boolean;
}

const ClearButton = tasty(Button, {
  icon: <X />,
  styles: {
    radius: 'right (1r - 1bw)',
    width: '4x',
    height: 'auto',
    placeSelf: 'stretch',
  },
});

export const SearchInput = forwardRef(function SearchInput(
  props: WithNullableValue<JengaSearchInputProps>,
  ref,
) {
  props = castNullableStringValue(props);
  props = useProviderProps(props);

  let { isClearable, validationState } = props;

  let inputRef = useRef(null);

  let state = useSearchFieldState(props);
  let { inputProps, clearButtonProps } = useSearchField(props, state, inputRef);
  let showClearButton = isClearable && state.value !== '' && !props.isReadOnly;

  return (
    <TextInputBase
      ref={ref}
      inputProps={inputProps}
      inputRef={inputRef}
      type="search"
      icon={<MagnifyingGlass />}
      suffixPosition="after"
      {...props}
      suffix={
        props.suffix || showClearButton ? (
          <>
            {props.suffix}
            {showClearButton && (
              <ClearButton
                type={validationState === 'invalid' ? 'clear' : 'neutral'}
                theme={validationState === 'invalid' ? 'danger' : undefined}
                {...ariaToJengaButtonProps(clearButtonProps)}
              />
            )}
          </>
        ) : undefined
      }
    />
  );
});
