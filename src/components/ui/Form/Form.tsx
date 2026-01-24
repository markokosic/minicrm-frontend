import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, BoxProps, ElementProps, Stack } from '@mantine/core';
import { FormRenderer } from './FormRenderer';

interface FormProps<T extends FieldValues> extends BoxProps, ElementProps<'form', 'onSubmit'> {
  onSubmit: SubmitHandler<T>;
  children?: ReactNode;
  methods: UseFormReturn<T>;
  id?: string;
  gap?: number | string;
  formFields: any[];
}

const Form = <T extends FieldValues>({
  children,
  id,
  onSubmit,
  methods,
  gap = 'md',
  formFields,
  ...others
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
        maw={1020}
        {...others}
      >
        {children ? <Stack gap={gap}>{children}</Stack> : <FormRenderer formFields={formFields} />}
      </Box>
    </FormProvider>
  );
};

export { Form };
