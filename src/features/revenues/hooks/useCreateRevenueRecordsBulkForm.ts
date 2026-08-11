import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { CreateDailyRevenueRequest } from '@/api/generated/model';
import {
  useCreateDailyRevenuesBulk,
  getGetAllDailyRevenuesQueryKey,
} from '@/api/generated/endpoints/revenues/revenues';
import {
  CreateRevenueRecordBulkRequest,
  CreateRevenueRecordRequest,
  getCreateDailyRevenueBulkRequestSchema,
} from '../revenues-schemas';
import { useRevenueFormOptions } from './useRevenueFormOptions';

dayjs.extend(isoWeek);

export const useCreateRevenueRecordsBulkForm = () => {
  const { t } = useTranslation(['app', 'common']);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { drivers, carOptions, driverOptions, isPendingOptions } = useRevenueFormOptions();

  const emptyRevenueRecord = {
    driverId: undefined,
    carId: undefined,
    date: dayjs().format('YYYY-MM-DD'),
    kilometersDriven: undefined,
    kilometersFrom: undefined,
    kilometersTo: undefined,
    drivingStartTime: undefined,
    drivingEndTime: undefined,
    driverRemunerationType: undefined,
    revenue: undefined,
    tripCount: undefined,
    pricePerTrip: undefined,
    companyRemuneration: undefined,
  };

  const methods = useForm<CreateRevenueRecordBulkRequest>({
    resolver: zodResolver(getCreateDailyRevenueBulkRequestSchema(t)),
    mode: 'onChange',
    defaultValues: {
      dailyRevenueRecords: [emptyRevenueRecord as unknown as CreateRevenueRecordRequest],
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'dailyRevenueRecords',
    control,
  });

  const { mutate, isPending: isPendingCreation } = useCreateDailyRevenuesBulk({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:revenues.bulk.success_message'));
        queryClient.invalidateQueries({ queryKey: getGetAllDailyRevenuesQueryKey() });
        navigate('/revenues');
      },
      onError: (error: unknown) => {
        const apiErrorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('common:errors.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const onSubmit = (data: CreateRevenueRecordBulkRequest) => {
    mutate({ data: data.dailyRevenueRecords as unknown as CreateDailyRevenueRequest[] });
  };

  return {
    methods,
    onSubmit,
    fields,
    append: () => append(emptyRevenueRecord as unknown as CreateRevenueRecordRequest),
    remove,
    carOptions,
    driverOptions,
    drivers,
    isPendingData: isPendingOptions,
    isPendingCreation,
    emptyRevenueRecord,
  };
};

