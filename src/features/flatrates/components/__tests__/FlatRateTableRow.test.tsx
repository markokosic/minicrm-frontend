import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from '@mantine/core';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { FlatRateTableRow } from '../FlatRateTableRow';

describe('FlatRateTableRow Component', () => {
  const mockFlatRate = {
    id: 42,
    name: 'Wien -> Linz',
    defaultPrice: 180,
    status: 'ACTIVE' as const,
  };

  it('renders flat rate row data correctly', () => {
    const { Wrapper } = createTestAppWrapper();

    render(
      <Table>
        <Table.Tbody>
          <FlatRateTableRow
            flatRate={mockFlatRate}
            onEdit={vi.fn()}
            onDeactivate={vi.fn()}
          />
        </Table.Tbody>
      </Table>,
      { wrapper: Wrapper }
    );

    expect(screen.getByText('#42')).toBeInTheDocument();
    expect(screen.getByText('Wien -> Linz')).toBeInTheDocument();
    expect(screen.getByText('180,00 €')).toBeInTheDocument();
  });

  it('calls onEdit and onDeactivate when action buttons are clicked', async () => {
    const user = userEvent.setup();
    const { Wrapper } = createTestAppWrapper();
    const handleEdit = vi.fn();
    const handleDeactivate = vi.fn();

    render(
      <Table>
        <Table.Tbody>
          <FlatRateTableRow
            flatRate={mockFlatRate}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
          />
        </Table.Tbody>
      </Table>,
      { wrapper: Wrapper }
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(handleEdit).toHaveBeenCalledWith(mockFlatRate);

    await user.click(buttons[1]);
    expect(handleDeactivate).toHaveBeenCalledWith(mockFlatRate);
  });
});
