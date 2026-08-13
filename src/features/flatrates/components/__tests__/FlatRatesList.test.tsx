import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { FlatRatesList } from '../FlatRatesList';
import * as flatRateEndpoints from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';

describe('FlatRatesList Component', () => {
  it('renders table headers and flat rate item when loaded', async () => {
    vi.spyOn(flatRateEndpoints, 'useGetActiveFlatRateTypes').mockReturnValue({
      data: {
        data: [
          { id: 1, name: 'Wien -> Airport', defaultPrice: 45, active: true },
        ],
      },
      isLoading: false,
      error: null,
    } as any);

    const { Wrapper } = createTestAppWrapper();

    render(<FlatRatesList />, { wrapper: Wrapper });

    expect(await screen.findByText(/bezeichnung|name/i)).toBeInTheDocument();
    expect(await screen.findByText(/standardpreis|default price/i)).toBeInTheDocument();
    expect(await screen.findByText('Wien -> Airport')).toBeInTheDocument();
  });
});
