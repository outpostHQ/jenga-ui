import { forwardRef } from 'react';
import { FocusableRef } from '@react-types/shared';

import { useProviderProps } from '../../../../provider';
import { useFormProps } from '../Form';
import { Button, JengaButtonProps } from '../../../actions';
import { FieldTypes } from '../types';
import { JengaFormInstance } from '../useForm';

export interface JengaSubmitProps<T extends FieldTypes = FieldTypes>
  extends JengaButtonProps {
  form?: JengaFormInstance<T>;
}

export const Submit = forwardRef(function Submit(
  props: JengaSubmitProps,
  ref: FocusableRef<HTMLElement>,
) {
  props = useProviderProps(props);
  props = useFormProps(props);

  const { form, ...otherProps } = props;

  const formData = form?.getFieldsValue() ?? {};
  const isInvalid = Object.keys(formData).some(
    (name) => form?.isFieldInvalid(name) ?? false,
  );

  return (
    <Button
      ref={ref}
      type="primary"
      htmlType="submit"
      isLoading={form?.isSubmitting}
      isDisabled={isInvalid}
      {...otherProps}
    />
  );
});
