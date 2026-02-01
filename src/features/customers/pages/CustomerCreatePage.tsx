import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PageLayout } from '@/components/layout/PageLayout';
import { OptionSelector } from '@/components/ui/OptionSelector';
import { CustomerCreateForm } from '../components/CustomerForm';
import { ADD_CUSTOMER_FORM_CONFIG } from '../config/customers-form-config';
import { CustomerType } from '../types/customers-types';

export const CustomerCreatePage = () => {
  const { t } = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const openModal = (val: CustomerType) =>
    modals.openConfirmModal({
      title: t('common:modals.confirm_title'),
      children: <Text size="sm">{t('customers:modals.switch_type.text')}</Text>,
      labels: {
        confirm: t('customers:modals.switch_type.confirm_button'),
        cancel: t('common:actions.cancel'),
      },
      onCancel: () => null,
      onConfirm: () => setSelectedCustomer(val),
    });

  const options = [
    { label: t('common:consumer'), value: CustomerType.CONSUMER },
    { label: t('common:business'), value: CustomerType.BUSINESS },
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
        title={!selectedCustomer ? t('customers:type_selection.title') : ''}
        subtitle={!selectedCustomer ? t('customers:type_selection.subtitle') : ''}
        onChange={(val) => handleCustomerChange(val as CustomerType)}
        selectedOption={selectedCustomer}
      />

      {selectedCustomer === CustomerType.CONSUMER && (
        <CustomerCreateForm
          type={CustomerType.CONSUMER}
          config={ADD_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER]}
        />
      )}

      {selectedCustomer === CustomerType.BUSINESS && (
        <CustomerCreateForm
          type={CustomerType.BUSINESS}
          config={ADD_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS]}
        />
      )}
    </PageLayout>
  );
};
