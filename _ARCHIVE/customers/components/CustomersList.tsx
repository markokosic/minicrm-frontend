import { Flex, Group, SimpleGrid, Text } from '@mantine/core';
import { AppLink } from 'src/components/ui/AppLink';
import { DataLoadingWrapper } from 'src/components/ui/DataLoadingWrapper';
import { ROUTES } from 'src/config/routes';
// import { CustomerTabs } from '@/types/routing-types';
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
                to={`${ROUTES.app.customers.view.getHref(customer.id, CustomerTabs.GENERAL)}`}
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
