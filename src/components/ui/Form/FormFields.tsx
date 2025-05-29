import { FieldValues, RegisterOptions } from 'react-hook-form';
import { Input, InputProps } from './Input';
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';

type Config<TFieldValues extends FieldValues = FieldValues> = {
  name: keyof TFieldValues;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  rules?: Omit<RegisterOptions, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

const createInputWrapper = <TFieldValues extends FieldValues>(config: Config<TFieldValues>) => {
  const WrappedInput = (
    props: Omit<InputProps, 'label' | 'name' | 'placeholder' | 'rules' | 'type' | 'autoComplete'>
  ) => {
    return (
      <Input
        type={config.type}
        label={config.label}
        placeholder={config.placeholder}
        name={config.name as string}
        rules={config.rules}
        autoComplete={config.autoComplete}
        {...props}
      />
    );
  };

  return WrappedInput;
};

export const EmailInput = createInputWrapper({
  name: 'email',
  label: 'E-Mail Adresse',
  placeholder: 'E-Mail Adresse eingeben',
  type: 'text',
  autoComplete: 'email',
});

export const PasswordInput = createInputWrapper({
  name: 'password',
  label: 'Passwort',
  placeholder: 'Passwort eingeben',
  type: 'password',
  autoComplete: 'current-password',
});
