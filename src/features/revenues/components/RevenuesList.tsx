import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Paper, Skeleton, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { useGetAllDrivers } from '@/api/generated/endpoints/drivers/drivers';
import { getGetAllDailyRevenuesQueryKey, useDeleteDailyRevenue } from '@/api/generated/endpoints/revenues/revenues';
import { CarResponse as Car, DailyRevenueResponse } from '@/api/generated/model';
import { useConfirmModal } from '@/common/hooks/useConfirmModal';
import { useRemunerationLabels } from '@/features/remuneration/hooks/useRemunerationLabels';
import { RevenueCard } from './RevenueCard';
import { RevenueEditForm } from './RevenueEditForm';

interface RevenuesListProps {
  revenues: DailyRevenueResponse[];
}

export const RevenuesList = ({ revenues }: RevenuesListProps) => {
  const { t } = useTranslation(['app', 'common']);
  const { getRemunerationLabel } = useRemunerationLabels();
  const { confirm } = useConfirmModal();

  const { data: driversResponse, isPending: isLoadingDrivers } = useGetAllDrivers({ pageable: {} });
  const { data: cars = [], isLoading: isLoadingCars } = useGetAllCars<Car[]>(
    { pageable: {} },
    {
      query: {
        select: (response) => response.data?.content ?? [],
      },
    }
  );
  const queryClient = useQueryClient();
  const { mutate: deleteRevenue } = useDeleteDailyRevenue({
    mutation: {
      onSuccess: () => {
        toast.success(t('common:actions.confirm'));
        queryClient.invalidateQueries({ queryKey: getGetAllDailyRevenuesQueryKey() });
      },
      onError: (err: unknown) => {
        const apiErrorMessage =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
          (err as { message?: string })?.message ||
          t('common:errors.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const drivers = driversResponse?.data?.content ?? [];

  const handleEdit = (revenue: DailyRevenueResponse) => {
    const modalId = modals.open({
      title: t('common:actions.edit'),
      size: 'xl',
      children: (
        <RevenueEditForm
          revenue={revenue}
          drivers={drivers}
          cars={cars}
          onCancel={() => modals.close(modalId)}
          onSuccess={() => modals.close(modalId)}
        />
      ),
    });
  };

  const handleDelete = (revenue: DailyRevenueResponse) => {
    confirm({
      title: t('common:actions.delete', 'Delete Revenue'),
      children: (
        <Text size="sm">
          Are you sure you want to delete this daily revenue entry for{' '}
          <strong>
            {revenue.driver
              ? `${revenue.driver.firstName} ${revenue.driver.lastName}`
              : ''}
          </strong>{' '}
          on <strong>{revenue.date}</strong>? This action cannot be undone.
        </Text>
      ),
      onConfirm: () => {
        if (revenue.id) {
          deleteRevenue({ id: revenue.id });
        }
      },
    });
  };

  if (isLoadingDrivers || isLoadingCars) {
    return (
      <Stack gap="md">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Paper
            key={idx}
            p="md"
            withBorder
            radius="md"
          >
            <Skeleton
              height={20}
              width="40%"
              mb="sm"
            />
            <Skeleton
              height={50}
              mb="sm"
            />
            <Skeleton
              height={20}
              width="20%"
            />
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      {revenues.map((item) => (
        <RevenueCard
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRemunerationLabel={getRemunerationLabel}
        />
      ))}
    </Stack>
  );
};
