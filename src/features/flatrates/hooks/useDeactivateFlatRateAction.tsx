import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Text } from '@mantine/core';
import {
  getGetActiveFlatRateTypesQueryKey,
  getGetAllFlatRateTypesQueryKey,
  useDeactivateFlatRateType,
} from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';
import { FlatRateTypeResponse } from '@/api/generated/model';
import { useConfirmModal } from '@/common/hooks/useConfirmModal';

export const useDeactivateFlatRateAction = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['app', 'common']);
  const { confirm } = useConfirmModal();

  const { mutate: deactivateMutate } = useDeactivateFlatRateType({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:flatrate.create.deactivate_success'));
        queryClient.invalidateQueries({ queryKey: getGetActiveFlatRateTypesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAllFlatRateTypesQueryKey() });
      },
      onError: (err: unknown) => {
        const apiErrorMessage =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('common:errors.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const handleDeactivate = (flatRate: FlatRateTypeResponse) => {
    if (!flatRate.id) {return;}
    confirm({
      title: t('app:flatrate.modals.deactivate_confirm.title'),
      children: (
        <Text size="sm">
          {t('app:flatrate.modals.deactivate_confirm.message')}
        </Text>
      ),
      labels: {
        confirm: t('app:flatrate.modals.deactivate_confirm.confirm'),
        cancel: t('common:actions.cancel'),
      },
      onConfirm: () => {
        deactivateMutate({ id: flatRate.id! });
      },
    });
  };

  return { handleDeactivate };
};
