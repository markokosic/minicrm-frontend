import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useGetDriverRevenueOptions } from '@/api/generated/endpoints/drivers/drivers';
import {
  getGetAllShiftsQueryKey,
  useCreateShift,
} from '@/api/generated/endpoints/shifts/shifts';
import { CreateShiftRequest } from '@/api/generated/model';
import queryClient from '@/lib/queryClient';
import { getCreateShiftSchema } from '../shifts-schemas';

export interface ShiftRevenueFormRow {
  optionKey?: string;
  entryCategory: 'REGULAR' | 'FLAT_RATE' | 'WEEKLY';
  flatRateTypeId?: number | null;
  revenue?: number;
  tripCount?: number;
  pricePerTrip?: number;
}

export const useCreateShiftForm = () => {
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  const methods = useForm<any>({
    resolver: zodResolver(getCreateShiftSchema(t)),
    mode: 'onChange',
    defaultValues: {
      driverId: undefined,
      carId: undefined,
      shiftStart: '',
      shiftEnd: '',
      odometerStart: undefined,
      odometerEnd: undefined,
      status: 'APPROVED',
      revenues: [],
    },
  });

  const selectedDriverId = useWatch({
    control: methods.control,
    name: 'driverId',
  });

  const { data: revenueOptionsResponse, isLoading: isLoadingRevenueOptions } =
    useGetDriverRevenueOptions(selectedDriverId, {
      query: {
        enabled: typeof selectedDriverId === 'number' && selectedDriverId > 0,
      },
    });

  const revenueOptions = revenueOptionsResponse?.data || [];

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'revenues',
  });

  const { mutate, isPending } = useCreateShift({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:shifts.notifications.create.success'));
        queryClient.invalidateQueries({ queryKey: getGetAllShiftsQueryKey() });
        navigate(-1);
      },
      onError: (error: unknown) => {
        const apiErrorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('errors:common.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const onSubmit = (values: any) => {
    const formattedRevenues = values.revenues.map((r: ShiftRevenueFormRow) => {
      if (r.entryCategory === 'FLAT_RATE') {
        return {
          entryCategory: 'FLAT_RATE' as const,
          flatRateTypeId: r.flatRateTypeId,
          tripCount: Number(r.tripCount || 1),
          pricePerTrip: Number(r.pricePerTrip || 0),
        };
      }
      return {
        entryCategory: r.entryCategory,
        revenue: Number(r.revenue || 0),
      };
    });

    const payload: CreateShiftRequest = {
      driverId: Number(values.driverId),
      carId: Number(values.carId),
      odometerStart: Number(values.odometerStart),
      odometerEnd: Number(values.odometerEnd),
      shiftStart: dayjs(values.shiftStart).toISOString(),
      shiftEnd: dayjs(values.shiftEnd).toISOString(),
      status: values.status || 'APPROVED',
      revenues: formattedRevenues,
    };

    mutate({ data: payload });
  };

  const odometerStart = useWatch({ control: methods.control, name: 'odometerStart' });
  const odometerEnd = useWatch({ control: methods.control, name: 'odometerEnd' });
  const shiftStart = useWatch({ control: methods.control, name: 'shiftStart' });
  const shiftEnd = useWatch({ control: methods.control, name: 'shiftEnd' });

  const calculatedKm =
    typeof odometerStart === 'number' && typeof odometerEnd === 'number' && odometerEnd >= odometerStart
      ? odometerEnd - odometerStart
      : null;

  const calculatedDuration = (() => {
    if (!shiftStart || !shiftEnd) return null;
    const start = dayjs(shiftStart);
    const end = dayjs(shiftEnd);
    if (!start.isValid() || !end.isValid() || !end.isAfter(start)) return null;

    const diffMinutes = end.diff(start, 'minute');
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const decimalHours = Math.round((diffMinutes / 60) * 100) / 100;

    return {
      hours,
      minutes,
      decimalHours,
      text: `${hours} Std. ${minutes > 0 ? `${minutes} Min.` : ''} (${decimalHours} h)`,
    };
  })();

  return {
    methods,
    selectedDriverId,
    revenueOptions,
    isLoadingRevenueOptions,
    fields,
    append,
    remove,
    onSubmit,
    isPending,
    calculatedKm,
    calculatedDuration,
    cancel: () => navigate(-1),
  };
};
