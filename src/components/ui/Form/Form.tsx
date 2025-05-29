import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: ReactNode;
  methods: UseFormReturn<T>;
  id?: string;
};

const Form = <T extends FieldValues>({ children, className, id, onSubmit, methods }: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        className={cn('  space-y-4', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { Form };
