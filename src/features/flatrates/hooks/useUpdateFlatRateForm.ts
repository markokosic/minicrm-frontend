import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  getGetActiveFlatRateTypesQueryKey,
  getGetAllFlatRateTypesQueryKey,
  useUpdateFlatRateType,
} from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';
import { CreateFlatRateTypeRequest, FlatRateTypeResponse } from '@/api/generated/model';
import { UpdateFlatRateTypeBody } from '@/api/generated/zod/flat-rate-types/flat-rate-types';
import { useQueryClient } from '@tanstack/react-query';


interface UseUpdateFlatRateFormProps {
  flatRate: FlatRateTypeResponse | null;
  onSuccess?: () => void;
}

export const useUpdateFlatRateForm = ({ flatRate, onSuccess }: UseUpdateFlatRateFormProps) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation(['app', 'common', 'errors']);

  const methods = useForm<CreateFlatRateTypeRequest>({
    resolver: zodResolver(UpdateFlatRateTypeBody),
    mode: 'onChange',
    defaultValues: {
      name: flatRate?.name || '',
      defaultPrice: flatRate?.defaultPrice ?? undefined,
    },
  });

  useEffect(() => {
    if (flatRate) {
      methods.reset({
        name: flatRate.name || '',
        defaultPrice: flatRate.defaultPrice ?? undefined,
      });
    }
  }, [flatRate, methods]);

  const { mutate, isPending } = useUpdateFlatRateType({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:flatrate.update_success'));
        queryClient.invalidateQueries({ queryKey: getGetActiveFlatRateTypesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAllFlatRateTypesQueryKey() });
        onSuccess?.();
      },
      onError: (error: unknown) => {
        const apiErrorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('common:errors.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const onSubmit = (data: CreateFlatRateTypeRequest) => {
    if (flatRate?.id) {
      mutate({ id: flatRate.id, data });
    }
  };

  return {
    methods,
    onSubmit,
    isPending,
  };
};
