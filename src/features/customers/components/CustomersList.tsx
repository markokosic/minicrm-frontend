import { Flex, Text } from '@mantine/core';
import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/config/routes';
import { useGetCustomers } from '../hooks/useGetCustomers';
import { CustomerCard } from './CustomerCard/CustomerCard';

export const CustomersList = () => {
  const { data } = useGetCustomers();

  if (!data || data.length === 0) {
    return <Text>Lade Kunden...</Text>;
  }

  console.log(ROUTES.app.customers.path);

  return (
    <>
      <Flex
        gap={24}
        wrap="wrap"
      >
        {data.map((customer) => (
          <AppLink
            to={`${ROUTES.app.customers.path}/${customer.id}`}
            replace
          >
            <CustomerCard
              key={customer.id}
              customer={customer}
            />
          </AppLink>
        ))}
      </Flex>
    </>
  );
};
