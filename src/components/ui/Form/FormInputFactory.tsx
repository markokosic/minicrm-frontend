import { FieldValues, RegisterOptions } from 'react-hook-form';
import { Input, InputProps } from './Input';
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import { useTranslation } from 'react-i18next';

type Config<TFieldValues extends FieldValues = FieldValues> = {
  name: keyof TFieldValues;
  labelKey: string;
  placeholderKey: string;
  type: HTMLInputTypeAttribute;
  rules?: Omit<RegisterOptions, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

type Props = Omit<InputProps, 'label' | 'name' | 'placeholder' | 'rules' | 'type' | 'autoComplete'>;

export const createInputWrapper = <TFieldValues extends FieldValues>(config: Config<TFieldValues>) => {
  return function WrappedInput(props: Props) {
    const { ...rest } = props;

    const { t } = useTranslation();

    return (
      <Input
        type={config.type}
        label={t(config.labelKey)}
        placeholder={t(config.placeholderKey)}
        name={config.name as string}
        rules={config.rules}
        autoComplete={config.autoComplete}
        {...rest}
      />
    );
  };
};
