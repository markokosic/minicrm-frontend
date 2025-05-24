import React from 'react';
import { Input as BasicInput } from '@/components/ui/Input';
import { FieldWrapper } from '@/components/ui/Form/FieldWrapper';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps & {
    label?: string;
    ref?: React.Ref<HTMLInputElement>;
    // registration: Partial<UseFormRegisterReturn>;
  };

const Input = ({ ref, ...props }: InputProps) => {
  const { className, type, label, name, rules } = props;

  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FieldWrapper
      label={label}
      error={error}
    >
      <BasicInput
        id={name}
        className={className}
        type={type}
        {...field}
        ref={ref}
        {...props}
      />
    </FieldWrapper>
  );
};

export { Input };
