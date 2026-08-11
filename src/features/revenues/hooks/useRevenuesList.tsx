import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
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
import { useRemunerationLabels } from '@/features/remuneration';
import { useRevenueFilters } from './useRevenueFilters';

export const useRevenuesList = () => {
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
  const totalPages = pageData?.totalPages;

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

  const handleEdit = (
    _revenue: DailyRevenueResponse,
    renderEditForm: (onCancel: () => void, onSuccess: () => void) => React.ReactNode
  ) => {
    const modalId = modals.open({
      title: t('common:actions.edit'),
      size: 'xl',
      children: renderEditForm(
        () => modals.close(modalId),
        () => modals.close(modalId)
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

  return {
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
  };
};
