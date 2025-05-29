import { z } from 'zod';

const emailSchema = z
  .string()
  .min(1, 'E-Mail Adresse ist erforderlich')
  .email('Dies ist keine gültige E-Mail Adresse')
  .max(254, 'E-Mail Adresse ist zu lang');

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .max(72, 'Password must contain less than 72 characters.');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
