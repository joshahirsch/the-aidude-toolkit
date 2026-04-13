import { describe, expect, it } from 'vitest';
import { MODULE_INFO, SESSION_MODULE_ORDER, ZONES } from '@/types/toolkit';

describe('toolkit configuration', () => {
  it('keeps every configured module connected to a known zone', () => {
    const configuredModules = new Set(Object.keys(MODULE_INFO));
    const zonedModules = new Set(ZONES.flatMap((zone) => zone.modules));

    expect(zonedModules).toEqual(configuredModules);
  });

  it('defines a zone order for each session', () => {
    expect(SESSION_MODULE_ORDER['talk-like-a-human'].length).toBeGreaterThan(0);
    expect(SESSION_MODULE_ORDER['humanity-at-scale'].length).toBeGreaterThan(0);
  });
});
