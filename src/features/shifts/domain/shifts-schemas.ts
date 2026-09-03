import { TFunction } from 'i18next';
import { z } from 'zod';

export interface ShiftRevenueFormRow {
  id?: number | null;
  optionKey?: string | null;
  entryCategory: 'REGULAR' | 'FLAT_RATE' | 'WEEKLY';
  flatRateTypeId?: number | null;
  flatRateTypeName?: string | null;
  revenue?: number | null;
  tripCount?: number | null;
  pricePerTrip?: number | null;
  weeklyDriverRent?: number | null;
}

export const getCreateShiftSchema = (t: TFunction) =>
  z
    .object({
      driverId: z.number({
        message: t('errors:shifts.driverId.required', 'Bitte wählen Sie einen Fahrer aus'),
      }),
      carId: z.number({
        message: t('errors:shifts.carId.required', 'Bitte wählen Sie ein Fahrzeug aus'),
      }),
      shiftStart: z.string().min(1, t('errors:shifts.shiftStart.required', 'Bitte geben Sie den Schichtbeginn an')),
      shiftEnd: z.string().min(1, t('errors:shifts.shiftEnd.required', 'Bitte geben Sie das Schichtende an')),
      odometerStart: z
        .number({
          message: t('errors:shifts.odometerStart.required', 'Tachostand Beginn ist erforderlich'),
        })
        .min(0, t('errors:shifts.odometerStart.invalid', 'Ungültiger Tachostand')),
      odometerEnd: z
        .number({
          message: t('errors:shifts.odometerEnd.required', 'Tachostand Ende ist erforderlich'),
        })
        .min(0, t('errors:shifts.odometerEnd.invalid', 'Ungültiger Tachostand')),
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional().default('APPROVED'),
      revenues: z
        .array(
          z.object({
            id: z.number().optional().nullable(),
            optionKey: z.string().optional().nullable(),
            entryCategory: z.enum(['REGULAR', 'FLAT_RATE', 'WEEKLY']),
            flatRateTypeId: z.number().optional().nullable(),
            revenue: z.number().optional().nullable(),
            tripCount: z.number().optional().nullable(),
            pricePerTrip: z.number().optional().nullable(),
            weeklyDriverRent: z.number().optional().nullable(),
          })
        )
        .min(1, t('errors:shifts.revenues.min', 'Mindestens ein Umsatzeintrag erforderlich')),
    })
    .refine((data) => data.odometerEnd >= data.odometerStart, {
      message: t('errors:shifts.odometerEnd.must_be_greater', 'Tachostand Ende muss >= Tachostand Beginn sein'),
      path: ['odometerEnd'],
    });

export type CreateShiftFormValues = z.infer<ReturnType<typeof getCreateShiftSchema>>;
export type UpdateShiftFormValues = CreateShiftFormValues;
