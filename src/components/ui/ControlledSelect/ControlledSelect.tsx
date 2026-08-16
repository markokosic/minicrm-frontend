import React from 'react';
import { Select, SelectProps } from '@mantine/core';
import { useController, useFormContext, FieldValues, Path, UseControllerProps } from 'react-hook-form';

export type FormSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: UseControllerProps<TFieldValues>['rules'];
  defaultValue?: UseControllerProps<TFieldValues>['defaultValue'];
} & Omit<SelectProps<any>, 'value' | 'onChange' | 'error' | 'name'>;

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  rules,
  defaultValue,
  searchable = true,
  clearable = true,
  ...selectProps
}: FormSelectProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Select
      {...selectProps}
      ref={ref}
      name={name}
      value={value ?? null}
      onChange={(val) => onChange(val)}
      onBlur={onBlur}
      error={error?.message}
      searchable={searchable}
      clearable={clearable}
    />
  );
}