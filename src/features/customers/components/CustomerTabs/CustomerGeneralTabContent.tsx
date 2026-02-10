import { p } from 'node_modules/react-router/dist/development/index-react-server-client-rcoGPJhU.mjs';
import { useNavigate, useParams } from 'react-router';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ROUTES } from '@/config/routes';
import { VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG } from '../../config/customers-form-config';
import { useGetCustomer } from '../../hooks/useGetCustomer';
import { Customer, CustomerType } from '../../types/customers-types';
import { CustomerForm, CustomerFormSkeleton } from '../CustomerForm';

export const CustomerGeneralTabContent = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  if (!customerId) {
    throw new Error('customerId param is required');
  }

  const cId = Number(customerId);

  const navigateToEditCustomer = () => navigate(ROUTES.app.customers.edit.getHref(cId));

  if (isNaN(cId)) {
    throw new Error('customerId param must be a number');
  }

  const { data, isLoading, error } = useGetCustomer({
    id: cId,
  });

  return (
    <DataLoadingWrapper
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
      skeleton={<CustomerFormSkeleton />}
    >
      {data && data.type === CustomerType.CONSUMER && (
        <CustomerForm
          customer={data}
          isEditMode
          config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER]}
        />
      )}

      {data && data.type === CustomerType.BUSINESS && (
        <CustomerForm
          customer={data}
          isEditMode
          config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS]}
        />
      )}
    </DataLoadingWrapper>
  );
};
