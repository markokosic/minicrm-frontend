import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PageLayout } from '@/components/layout/PageLayout';
import { OptionSelector } from '@/components/ui/OptionSelector';
import { BusinessCustomerCreateForm, ConsumerCustomerCreateForm } from '../components/CustomerForm';
import { CustomerType } from '../types/customers-types';

export const CustomerCreatePage = () => {
  const { t } = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const openModal = (val: CustomerType) =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => null,
      onConfirm: () => setSelectedCustomer(val),
    });

  const options = [
    { label: 'Consumer', value: CustomerType.CONSUMER },
    { label: 'Business', value: CustomerType.BUSINESS },
  ];

  const handleCustomerChange = (val: CustomerType) => {
    if (selectedCustomer === null) {
      setSelectedCustomer(val as CustomerType);
      return;
    }

    if (Object.values(CustomerType).includes(val as CustomerType)) {
      openModal(val);
    }
  };

  return (
    <PageLayout
      title={t('customers:actions.add_customer')}
      // actions={desktopActions}
    >
      <OptionSelector
        options={options}
        title={!selectedCustomer ? 'Select the type of customer you would like to create.' : ''}
        subtitle={
          !selectedCustomer ? 'Either choose between a private individual or a company.' : ''
        }
        onChange={(val) => handleCustomerChange(val as CustomerType)}
        selectedOption={selectedCustomer}
      />

      {selectedCustomer === CustomerType.CONSUMER && <ConsumerCustomerCreateForm />}
      {selectedCustomer === CustomerType.BUSINESS && <BusinessCustomerCreateForm />}
    </PageLayout>
  );
};
