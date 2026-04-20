import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import { Select as $Select, type SelectProps as $SelectProps } from '@mantine/core';

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$SelectProps, 'value' | 'defaultValue'>;

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  onChange,
  ...props
}: SelectProps<T>) => {
  const { control: contextControl } = useFormContext<T>();

  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control: control ?? contextControl,
  });

  return (
    <$Select
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        // onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
};
