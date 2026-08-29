import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  getGetAllShiftsQueryKey,
  getGetShiftByIdQueryKey,
  useUpdateShift,
} from '@/api/generated/endpoints/shifts/shifts';
import { ShiftResponse } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import {
  getRevenueOptionKey,
  transformUpdateShiftPayload,
} from '@/features/shifts/domain/shift-calculations';
import {
  getCreateShiftSchema,
  UpdateShiftFormValues,
} from '@/features/shifts/domain/shifts-schemas';

export const useUpdateShiftForm = (shift: ShiftResponse) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  const formattedRevenues = (shift.revenues || []).map((rev) => ({
    id: rev.id,
    optionKey: getRevenueOptionKey(rev.entryCategory, rev.flatRateTypeId),
    entryCategory: rev.entryCategory as 'REGULAR' | 'FLAT_RATE' | 'WEEKLY',
    flatRateTypeId: rev.flatRateTypeId ?? null,
    flatRateTypeName: rev.flatRateTypeName,
    revenue: rev.revenue,
    tripCount: rev.tripCount,
    pricePerTrip: rev.pricePerTrip,
    companyRemuneration: rev.companyRemuneration,
  }));

  const methods = useForm<UpdateShiftFormValues>({
    resolver: zodResolver(getCreateShiftSchema(t)) as any,
    mode: 'onChange',
    defaultValues: {
      driverId: shift.driver?.id as number,
      carId: shift.car?.id as number,
      shiftStart: shift.shiftStart || '',
      shiftEnd: shift.shiftEnd || '',
      odometerStart: shift.odometerStart as number,
      odometerEnd: shift.odometerEnd as number,
      status: shift.status || 'APPROVED',
      revenues: formattedRevenues,
    },
  });

  const { mutate, isPending } = useUpdateShift({
    mutation: {
      onSuccess: () => {
        toast.success(
          t('app:shifts.notifications.edit.success', 'Schicht erfolgreich aktualisiert')
        );
        if (shift.id) {
          queryClient.invalidateQueries({ queryKey: getGetShiftByIdQueryKey(shift.id) });
        }
        queryClient.invalidateQueries({ queryKey: getGetAllShiftsQueryKey() });
        navigate(shift.id ? ROUTES.app.shifts.view.getHref(shift.id) : ROUTES.app.shifts.path);
      },
      onError: (error: unknown) => {
        const apiErrorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('errors:common.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const onSubmit = (values: UpdateShiftFormValues) => {
    if (!shift.id) {
      return;
    }
    const payload = transformUpdateShiftPayload(values);
    mutate({ id: shift.id, data: payload });
  };

  return {
    methods,
    onSubmit,
    isPending,
    cancel: () =>
      shift.id
        ? navigate(ROUTES.app.shifts.view.getHref(shift.id))
        : navigate(ROUTES.app.shifts.path),
  };
};
