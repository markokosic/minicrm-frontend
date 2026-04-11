export type TenantId = number;

export interface FormFieldConfig {
  name: string;
  labelKey: string;
  placeholderKey: string;
  autoComplete?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number';
}
