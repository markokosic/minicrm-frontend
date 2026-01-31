import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { PageLayout } from '@/components/layout/PageLayout';
import { OptionSelector } from '@/components/ui/OptionSelector';
import { CreateBusinessCustomerForm } from '../components/CustomerForm/CreateBusinessCustomerForm';
import { CreateConsumerCustomerForm } from '../components/CustomerForm/CreateConsumerCustomerForm';
import { CustomerType } from '../types/customers-types';

export const CustomerCreatePage = () => {
  const { t } = useTranslation();

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);

  const options = [
    { label: 'Consumer', value: CustomerType.CONSUMER },
    { label: 'Business', value: CustomerType.BUSINESS },
  ];

  return (
    <PageLayout
      title={t('customers:actions.add_customer')}
      // actions={desktopActions}
    >
      {/* <CreateConsumerCustomerForm /> */}
      {/* <CreateBusinessCustomerForm /> */}
      <OptionSelector
        options={options}
        title="Select the type of customer you would like to create."
        subtitle="Either choose between a private individual or a company."
        onChange={(val) => setSelectedCustomer(val as CustomerType)}
        selectedOption={selectedCustomer}
      />
    </PageLayout>
  );
};
