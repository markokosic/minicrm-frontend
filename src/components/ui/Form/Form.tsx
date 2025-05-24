import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: ReactNode;
  form: UseFormReturn<T>;
  id?: string;
};

const Form = <T extends FieldValues>({ children, className, id, onSubmit, form }: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={cn('p-4 space-y-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { Form };
