import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ADD_CUSTOMER_FORM_CONFIG } from '@/features/customers/config/customers-form-config';
import { CustomerType } from '@/features/customers/types/customers-types';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { FormRenderer } from '../FormRenderer';

describe('FormRenderer', () => {
  it('renders groups and fields according to config', () => {
    const { Wrapper } = createTestAppWrapper();

    const addCustomerFields = ADD_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER].getFields();

    const Renderer = () => {
      const methods = useForm();

      return (
        <Wrapper>
          <FormProvider {...methods}>
            <FormRenderer formFields={addCustomerFields} />
          </FormProvider>
        </Wrapper>
      );
    };

    render(<Renderer />);

    addCustomerFields.forEach((group) => {
      if (group.groupName) {
        expect(screen.getByText(group.groupName)).toBeInTheDocument();
      }
      group.fields.forEach((field) => {
        expect(screen.getByLabelText(field.labelKey)).toBeInTheDocument();
      });
    });
  });
});
