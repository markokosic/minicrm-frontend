import { Flex, Text } from '@mantine/core';
import { useGetCustomers } from '../hooks/useGetCustomers';
import { CustomerCard } from './CustomerCard/CustomerCard';

export const CustomersList = () => {
  const { data } = useGetCustomers();

  if (!data || data.length === 0) {
    return <Text>Lade Kunden...</Text>;
  }

  return (
    <>
      <Flex
        gap={24}
        wrap="wrap"
      >
        {data.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
          />
        ))}
      </Flex>
    </>
  );
};
