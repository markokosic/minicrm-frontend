import { describe, expect, it } from 'vitest';
import { mapDriversToComboboxOptions, mapDriversToOptions } from '../driver-options.utils';

describe('driver-options.utils', () => {
  const mockDrivers = [
    { id: 10, fullName: 'John Doe' },
    { id: 20, fullName: 'Jane Smith' },
  ];

  it('mapDriversToOptions should map drivers to select options', () => {
    expect(mapDriversToOptions(mockDrivers)).toEqual([
      { value: '10', label: 'John Doe', id: 10 },
      { value: '20', label: 'Jane Smith', id: 20 },
    ]);
  });

  it('mapDriversToComboboxOptions should map drivers to combobox options', () => {
    expect(mapDriversToComboboxOptions(mockDrivers)).toEqual([
      { value: 10, label: 'John Doe' },
      { value: 20, label: 'Jane Smith' },
    ]);
  });
});
