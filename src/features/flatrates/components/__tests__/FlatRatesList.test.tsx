import { render, screen } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { FlatRatesList } from '../FlatRatesList';

describe('FlatRatesList Component', () => {
  it('renders table headers when loaded', async () => {
    const { Wrapper } = createTestAppWrapper();

    render(<FlatRatesList />, { wrapper: Wrapper });

    expect(await screen.findByText(/bezeichnung|name/i)).toBeInTheDocument();
    expect(await screen.findByText(/standardpreis|default price/i)).toBeInTheDocument();
  });
});
