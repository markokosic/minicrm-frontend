import { describe, expect, it } from 'vitest';
import { RemunerationModelType } from '../../remuneration-types';
import {
  buildRemunerationTypeOptions,
  getRemunerationLabelText,
  i18nDriverRemunerationConfigMap,
} from '../remuneration-labels.utils';

describe('remuneration-labels.utils', () => {
  const dummyT = (key: string) => `translated:${key}`;

  it('i18nDriverRemunerationConfigMap should have valid keys', () => {
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.PERCENTAGE_SHARE]).toBe('percentageShare');
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.WEEKLY_FIXED_RATE]).toBe('weeklyFixedRate');
    expect(i18nDriverRemunerationConfigMap[RemunerationModelType.FLAT_RATE]).toBe('flatRate');
  });

  it('getRemunerationLabelText should handle empty and null types', () => {
    expect(getRemunerationLabelText(null, dummyT)).toBe('');
    expect(getRemunerationLabelText(undefined, dummyT)).toBe('');
  });

  it('getRemunerationLabelText should translate valid type', () => {
    expect(getRemunerationLabelText(RemunerationModelType.FLAT_RATE, dummyT)).toBe(
      'translated:app:remuneration.type.flatRate'
    );
  });

  it('buildRemunerationTypeOptions should build 3 options with labels', () => {
    const options = buildRemunerationTypeOptions(dummyT);
    expect(options).toHaveLength(3);
    expect(options[0].value).toBe(RemunerationModelType.PERCENTAGE_SHARE);
    expect(options[1].value).toBe(RemunerationModelType.WEEKLY_FIXED_RATE);
    expect(options[2].value).toBe(RemunerationModelType.FLAT_RATE);
  });
});
