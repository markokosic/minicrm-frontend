import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { useGetAllDrivers } from '@/api/generated/endpoints/drivers/drivers';
import {
  getGetAllDailyRevenuesQueryKey,
  useDeleteDailyRevenue,
  useGetAllDailyRevenues,
} from '@/api/generated/endpoints/revenues/revenues';
import { CarResponse as Car, DailyRevenueResponse } from '@/api/generated/model';
import { useConfirmModal } from '@/common/hooks/useConfirmModal';
import { usePagination } from '@/common/hooks/usePagination';
import { AppPagination } from '@/components/ui/AppPagination';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { useRemunerationLabels } from '@/features/remuneration/hooks/useRemunerationLabels';
import { useRevenueFilters } from '../hooks/useRevenueFilters';
import { RevenueCard } from './RevenueCard';
import { RevenueEditForm } from './RevenueEditForm';
import { RevenuesListSkeleton } from './RevenuesListSkeleton';

export const RevenuesList = () => {
  const { t } = useTranslation(['app', 'common']);
  const { getRemunerationLabel } = useRemunerationLabels();
  const { confirm } = useConfirmModal();

  const { page, pageable, setPage } = usePagination();
  const { driverId, dateFrom, dateTo } = useRevenueFilters();

  const {
    data: response,
    isPending: isLoadingRevenues,
    error,
  } = useGetAllDailyRevenues({
    pageable,
    driverId,
    dateFrom,
    dateTo,
  });

  const pageData = response?.data;
  const revenues = pageData?.content ?? [];
  const totalElements = pageData?.totalElements ?? 0;

  const { data: driversResponse, isPending: isLoadingDrivers } = useGetAllDrivers({ pageable: {} });
  const { data: cars = [], isLoading: isLoadingCars } = useGetAllCars<Car[]>(
    { pageable: {} },
    {
      query: {
        select: (res) => res.data?.content ?? [],
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

  const isLoading = isLoadingRevenues || isLoadingDrivers || isLoadingCars;

  return (
    <Stack
      style={{ height: '100%', overflow: 'hidden' }}
      gap="xs"
    >
      <Box
        style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          paddingRight: 6,
          paddingBottom: 8,
        }}
      >
        <DataLoadingWrapper
          isLoading={isLoading}
          error={error}
          isEmpty={!isLoading && totalElements === 0}
          skeleton={<RevenuesListSkeleton />}
        >
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
        </DataLoadingWrapper>
      </Box>

      <Box style={{ flexShrink: 0 }}>
        <AppPagination
          page={page}
          totalPages={pageData?.totalPages}
          onChange={setPage}
        />
      </Box>
    </Stack>
  );
};


