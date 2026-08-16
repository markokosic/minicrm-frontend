import { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DriverRevenueOption, DriverRevenueOptionEntryCategory } from '@/api/generated/model';
import { calculateFlatRateTotal, checkWeeklySettlement } from '../utils/shift-calculations.utils';

export const useShiftRevenueRow = (index: number, revenueOptions: DriverRevenueOption[]) => {
  const { setValue, control } = useFormContext();
  const fieldPrefix = `revenues.${index}`;

  const rowValues = useWatch({ control, name: fieldPrefix }) || {};
  const optionKey = rowValues.optionKey;
  const shiftStart = useWatch({ control, name: 'shiftStart' });

  const comboboxData = revenueOptions.map((opt, idx) => ({
    label: opt.label || '',
    value: `${opt.entryCategory}_${opt.flatRateTypeId ?? 'none'}_${idx}`,
  }));

  const previousOptionKeyRef = useRef(optionKey);

  const { isWeeklyPaymentToday, weekdayName } = checkWeeklySettlement(shiftStart);

  useEffect(() => {
    if (optionKey === previousOptionKeyRef.current) {
      return;
    }
    previousOptionKeyRef.current = optionKey;

    if (!optionKey) return;
    const matched = revenueOptions.find(
      (opt, idx) => `${opt.entryCategory}_${opt.flatRateTypeId ?? 'none'}_${idx}` === optionKey
    );
    if (!matched) return;

    setValue(`${fieldPrefix}.entryCategory`, matched.entryCategory);

    if (matched.entryCategory === DriverRevenueOptionEntryCategory.FLAT_RATE) {
      setValue(`${fieldPrefix}.flatRateTypeId`, matched.flatRateTypeId ?? null);
      setValue(`${fieldPrefix}.tripCount`, 1);
      setValue(`${fieldPrefix}.pricePerTrip`, matched.defaultPrice ?? 0);
      setValue(`${fieldPrefix}.revenue`, undefined);
      setValue(`${fieldPrefix}.companyRemuneration`, undefined);
    } else if (matched.entryCategory === DriverRevenueOptionEntryCategory.WEEKLY) {
      setValue(`${fieldPrefix}.flatRateTypeId`, null);
      setValue(`${fieldPrefix}.tripCount`, undefined);
      setValue(`${fieldPrefix}.pricePerTrip`, undefined);
      setValue(`${fieldPrefix}.revenue`, 0);
      setValue(`${fieldPrefix}.companyRemuneration`, isWeeklyPaymentToday ? (matched.defaultPrice ?? 0) : undefined);
    } else {
      setValue(`${fieldPrefix}.flatRateTypeId`, null);
      setValue(`${fieldPrefix}.tripCount`, undefined);
      setValue(`${fieldPrefix}.pricePerTrip`, undefined);
      setValue(`${fieldPrefix}.revenue`, 0);
      setValue(`${fieldPrefix}.companyRemuneration`, undefined);
    }
  }, [optionKey, revenueOptions, setValue, fieldPrefix, isWeeklyPaymentToday]);

  const tripCount = rowValues.tripCount || 0;
  const pricePerTrip = rowValues.pricePerTrip || 0;
  const calculatedTotal = calculateFlatRateTotal(tripCount, pricePerTrip);

  return {
    fieldPrefix,
    rowValues,
    comboboxData,
    calculatedTotal,
    isWeeklyPaymentToday,
    weekdayName,
  };
};
