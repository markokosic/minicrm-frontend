export type TenantId = number;

export interface FormFieldConfig {
  name: string;
  labelKey: string;
  placeholderKey: string;
  autoComplete?: string;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'number'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'file';
  options?: { value: string; label: string }[];
}

export type FormFieldsGroupConfig = Record<string, Record<string, FormFieldConfig>>;
