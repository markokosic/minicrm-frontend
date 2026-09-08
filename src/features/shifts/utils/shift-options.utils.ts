import {
  ShiftRevenueEntryResponse,
  ShiftRevenueEntryResponseEntryCategory,
} from '@/api/generated/model';
import { DriverShiftFlatRateOption } from '../domain/shift-calculations';

export const extractShiftFlatRateOptions = (
  revenues?: ShiftRevenueEntryResponse[] | null,
  fallbackName?: string
): DriverShiftFlatRateOption[] => {
  return (revenues || [])
    .filter((r) => r.entryCategory === ShiftRevenueEntryResponseEntryCategory.FLAT_RATE)
    .map((r) => ({
      id: r.flatRateTypeId,
      name: r.flatRateTypeName || fallbackName || 'Pauschalfahrt',
      defaultPrice: r.pricePerTrip,
    }));
};
