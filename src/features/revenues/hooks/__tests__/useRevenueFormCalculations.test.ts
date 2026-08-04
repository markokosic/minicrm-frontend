import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@/testing/testUtils';
import { DriverResponse } from '@/api/generated/model';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { useRevenueFormCalculations } from '../useRevenueFormCalculations';

describe('useRevenueFormCalculations', () => {
  const mockSetValue = vi.fn();
  const mockResetField = vi.fn();

  const mockDriver: DriverResponse = {
    id: 1,
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phone: '12345678',
    status: 'ACTIVE' as any,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    currentRemunerationConfigs: [
      {
        remunerationModelType: RemunerationModelType.FLAT_RATE as any,
        flatRateFee: 25,
      },
    ],
  };

  it('should sync revenue when FLAT_RATE, tripCount and pricePerTrip are present', () => {
    renderHook(() =>
      useRevenueFormCalculations({
        drivers: [mockDriver],
        driverId: 1,
        selectedDriverRemunerationConfig: RemunerationModelType.FLAT_RATE,
        tripCount: 4,
        pricePerTrip: 25,
        setValue: mockSetValue,
        resetField: mockResetField,
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('revenue', 100, { shouldValidate: true });
  });

  it('should pre-fill pricePerTrip from flatRateFee config if not set', () => {
    renderHook(() =>
      useRevenueFormCalculations({
        drivers: [mockDriver],
        driverId: 1,
        selectedDriverRemunerationConfig: RemunerationModelType.FLAT_RATE,
        pricePerTrip: null,
        setValue: mockSetValue,
        resetField: mockResetField,
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('pricePerTrip', 25, { shouldValidate: true });
  });

  it('should auto-select driverRemunerationType if driver has only 1 config', () => {
    renderHook(() =>
      useRevenueFormCalculations({
        drivers: [mockDriver],
        driverId: 1,
        setValue: mockSetValue,
        resetField: mockResetField,
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('driverRemunerationType', RemunerationModelType.FLAT_RATE, {
      shouldValidate: true,
    });
  });

  it('should calculate kilometers driven correctly', () => {
    renderHook(() =>
      useRevenueFormCalculations({
        drivers: [mockDriver],
        driverId: 1,
        kilometersFrom: 100,
        kilometersTo: 250,
        setValue: mockSetValue,
        resetField: mockResetField,
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('kilometersDriven', 150, { shouldValidate: true });
  });

  it('should apply fieldPrefix correctly when specified', () => {
    renderHook(() =>
      useRevenueFormCalculations({
        drivers: [mockDriver],
        driverId: 1,
        kilometersFrom: 50,
        kilometersTo: 100,
        setValue: mockSetValue,
        resetField: mockResetField,
        fieldPrefix: 'dailyRevenueRecords.0.',
      })
    );

    expect(mockSetValue).toHaveBeenCalledWith('dailyRevenueRecords.0.kilometersDriven', 50, {
      shouldValidate: true,
    });
  });
});
