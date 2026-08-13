import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  getGetActiveFlatRateTypesQueryKey,
  getGetAllFlatRateTypesQueryKey,
  useCreateFlatRateType,
} from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';
import { CreateFlatRateTypeRequest } from '@/api/generated/model';
import { CreateFlatRateTypeBody } from '@/api/generated/zod/flat-rate-types/flat-rate-types';
import queryClient from '@/lib/queryClient';

export const useCreateFlatRateForm = () => {
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  const methods = useForm<CreateFlatRateTypeRequest>({
    resolver: zodResolver(CreateFlatRateTypeBody),
    mode: 'onChange',
    defaultValues: {
      name: '',
      defaultPrice: undefined,
    },
  });

  const { mutate, isPending } = useCreateFlatRateType({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:flatrate.create.success'));
        queryClient.invalidateQueries({ queryKey: getGetActiveFlatRateTypesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAllFlatRateTypesQueryKey() });
        navigate(-1);
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
    mutate({ data });
  };

  return {
    methods,
    onSubmit,
    isPending,
    cancel: () => navigate(-1),
  };
};
