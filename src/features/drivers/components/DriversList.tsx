import { Flex } from '@mantine/core';
import { AppLink } from '@/components/ui/AppLink';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ROUTES } from '@/config/routes';
import { Driver } from '../drivers-types';
import { useGetDrivers } from '../hooks/useGetDrivers';
import { DriverCard } from './DriverCard';
import { DriverCardSkeleton } from './DriverCardSkeleton';

export const DriversList = () => {
  const { data, isLoading, error } = useGetDrivers();

  if (isLoading || !data) {
    return null;
  }

  const { first, last, page, size, totalElements, totalPages, content } = data;

  return (
    <DataLoadingWrapper
      isLoading={isLoading}
      error={error}
      isEmpty={totalElements === 0}
      skeleton={<DriverCardSkeleton />}
    >
      {content && totalElements > 0 && (
        <Flex
          gap={24}
          wrap="wrap"
        >
          {content.map((driver: Driver) => (
            <AppLink
              key={driver.id}
              to={`${ROUTES.app.drivers.view.getHref(driver.id)}`}
            >
              <DriverCard driver={driver} />
            </AppLink>
          ))}
        </Flex>
      )}
    </DataLoadingWrapper>
  );
};
