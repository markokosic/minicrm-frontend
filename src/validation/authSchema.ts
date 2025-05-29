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

const nameSchema = z.string().min(1, 'Dieses Feld ist erforderlich').max(100, 'Name ist zu lang');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });
