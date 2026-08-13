import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { CreateNewFlatRateForm } from '../CreateNewFlatRateForm';

describe('CreateNewFlatRateForm Component', () => {
  it('renders name and default price inputs and buttons', () => {
    const { Wrapper } = createTestAppWrapper();

    render(<CreateNewFlatRateForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/bezeichnung|name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/standardpreis|default price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /speichern|save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /abbrechen|cancel/i })).toBeInTheDocument();
  });

  it('allows user to enter flat rate details', async () => {
    const user = userEvent.setup();
    const { Wrapper } = createTestAppWrapper();

    render(<CreateNewFlatRateForm />, { wrapper: Wrapper });

    const nameInput = screen.getByLabelText(/bezeichnung|name/i);
    const priceInput = screen.getByLabelText(/standardpreis|default price/i);

    await user.type(nameInput, 'Wien -> Linz');
    await user.type(priceInput, '180');

    expect(nameInput).toHaveValue('Wien -> Linz');
    expect(priceInput).toHaveValue('180 €');
  });
});
