import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, BoxProps, ElementProps, Stack } from '@mantine/core';

interface FormProps<T extends FieldValues> extends BoxProps, ElementProps<'form', 'onSubmit'> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  methods: UseFormReturn<T>;
  id?: string;
  gap?: number | string;
}

const Form = <T extends FieldValues>({
  children,
  id,
  onSubmit,
  methods,
  gap = 'md',
  ...others
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
        {...others}
      >
        <Stack gap={gap}>{children}</Stack>
      </Box>
    </FormProvider>
  );
};

export { Form };
