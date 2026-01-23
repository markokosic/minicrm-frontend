export interface FieldConfig {
  name: string;
  labelKey: string;
  placeholderKey: string;
  autoComplete?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number';
}
