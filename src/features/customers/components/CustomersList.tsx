import { Flex, Group, Text } from '@mantine/core';
import { AppLink } from '@/components/ui/AppLink';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ROUTES } from '@/config/routes';
import { useGetCustomers } from '../hooks/useGetCustomers';
import { CustomerCard } from './CustomerCard/CustomerCard';
import { CustomerCardSkeleton } from './CustomerCard/CustomerCardSkelleton';

export const CustomersList = () => {
  const { data, isLoading, error } = useGetCustomers();

  return (
    <>
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={data?.length === 0}
        skeleton={<CustomerCardSkeleton />}
      >
        {data && data?.length > 0 && (
          <Flex
            gap={24}
            wrap="wrap"
          >
            {data.map((customer) => (
              <AppLink
                key={customer.id}
                to={`${ROUTES.app.customers.path}/${customer.id}`}
              >
                <CustomerCard customer={customer} />
              </AppLink>
            ))}
          </Flex>
        )}
      </DataLoadingWrapper>
    </>
  );
};
