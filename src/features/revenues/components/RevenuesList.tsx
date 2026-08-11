import { Box, Stack } from '@mantine/core';
import { DailyRevenueResponse } from '@/api/generated/model';
import { AppPagination } from '@/components/ui/AppPagination';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { useRevenuesList } from '../hooks/useRevenuesList';
import { RevenueCard } from './RevenueCard';
import { RevenueEditForm } from './RevenueEditForm';
import { RevenuesListSkeleton } from './RevenuesListSkeleton';

export const RevenuesList = () => {
  const {
    revenues,
    drivers,
    cars,
    isLoading,
    error,
    page,
    totalPages,
    totalElements,
    setPage,
    handleEdit,
    handleDelete,
    getRemunerationLabel,
  } = useRevenuesList();

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
                onEdit={(revenue: DailyRevenueResponse) =>
                  handleEdit(revenue, (onCancel, onSuccess) => (
                    <RevenueEditForm
                      revenue={revenue}
                      drivers={drivers}
                      cars={cars}
                      onCancel={onCancel}
                      onSuccess={onSuccess}
                    />
                  ))
                }
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
          totalPages={totalPages}
          onChange={setPage}
        />
      </Box>
    </Stack>
  );
};
