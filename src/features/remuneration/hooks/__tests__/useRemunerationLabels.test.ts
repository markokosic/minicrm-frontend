import { describe, expect, it } from 'vitest';
import { renderHook } from '@/testing/testUtils';
import { RemunerationModelType } from '../../remuneration-types';
import { i18nDriverRemunerationConfigMap, useRemunerationLabels } from '../useRemunerationLabels';

describe('useRemunerationLabels', () => {
  it('should map RemunerationModelType correctly in i18nDriverRemunerationConfigMap', () => {
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.PERCENTAGE_SHARE]).toBe('percentageShare');
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.WEEKLY_FIXED_RATE]).toBe('weeklyFixedRate');
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.FLAT_RATE]).toBe('flatRate');
  });

  it('should return empty string when type is empty or null', () => {
    const { result } = renderHook(() => useRemunerationLabels());
    expect(result.current.getRemunerationLabel(null)).toBe('');
    expect(result.current.getRemunerationLabel(undefined)).toBe('');
  });

  it('should return options list containing all remuneration types', () => {
    const { result } = renderHook(() => useRemunerationLabels());
    const options = result.current.remunerationTypeOptions;

    expect(options).toHaveLength(3);
    expect(options[0].value).toBe(RemunerationModelType.PERCENTAGE_SHARE);
    expect(options[1].value).toBe(RemunerationModelType.WEEKLY_FIXED_RATE);
    expect(options[2].value).toBe(RemunerationModelType.FLAT_RATE);
  });
});
