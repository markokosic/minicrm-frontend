//TODO uninstall packages and remove file

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function mapFieldConfig(field, t) {
  return {
    name: field.name,
    type: field.type,
    label: t(field.labelKey),
    placeholder: t(field.placeholderKey),
  };
}