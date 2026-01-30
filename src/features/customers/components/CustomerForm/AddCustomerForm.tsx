import { CustomerType } from '../../types/customers-types';

interface Props {
  type: CustomerType;
}

export const AddCustomerForm = ({ type }: Props) => {
  if (type === CustomerType.BUSINESS) {
    // return <AddBusinessCustomerForm />;
  }

  //   return <AddConsumerCustomerForm />;
};
