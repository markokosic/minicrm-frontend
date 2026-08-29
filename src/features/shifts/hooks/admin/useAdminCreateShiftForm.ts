import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { getGetAllShiftsQueryKey, useCreateShift } from '@/api/generated/endpoints/shifts/shifts';
import { transformShiftFormPayload } from '../../domain/shift-calculations';
import { CreateShiftFormValues, getCreateShiftSchema } from '../../domain/shifts-schemas';

export const useAdminCreateShiftForm = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  const methods = useForm<CreateShiftFormValues>({
    resolver: zodResolver(getCreateShiftSchema(t)) as any,
    mode: 'onChange',
    defaultValues: {
      driverId: undefined as unknown as number,
      carId: undefined as unknown as number,
      shiftStart: '',
      shiftEnd: '',
      odometerStart: undefined as unknown as number,
      odometerEnd: undefined as unknown as number,
      status: 'APPROVED',
      revenues: [],
    },
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

  const onSubmit = (values: CreateShiftFormValues) => {
    const payload = transformShiftFormPayload(values);
    mutate({ data: payload });
  };

  return {
    methods,
    onSubmit,
    isPending,
    cancel: () => navigate(-1),
  };
};
