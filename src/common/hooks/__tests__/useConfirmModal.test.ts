import { modals } from '@mantine/modals';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@/testing/testUtils';
import { useConfirmModal } from '../useConfirmModal';

vi.mock('@mantine/modals', () => ({
  modals: {
    openConfirmModal: vi.fn(),
  },
}));

describe('useConfirmModal', () => {
  it('should call modals.openConfirmModal with correct default options', () => {
    const { result } = renderHook(() => useConfirmModal());
    const onConfirmMock = vi.fn();

    result.current.confirm({
      onConfirm: onConfirmMock,
    });

    expect(modals.openConfirmModal).toHaveBeenCalledWith(
      expect.objectContaining({
        centered: true,
        confirmProps: { color: 'red' },
        onConfirm: onConfirmMock,
      })
    );
  });
});
