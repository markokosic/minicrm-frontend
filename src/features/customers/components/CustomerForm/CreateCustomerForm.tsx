import { CustomerType } from '../../types/customers-types';

interface Props {
  type: CustomerType;
}

export const CreateCustomerForm = ({ type }: Props) => {
  if (type === CustomerType.BUSINESS) {
    // return <AddBusinessCustomerForm />;
  }

  //   return <AddConsumerCustomerForm />;
};
