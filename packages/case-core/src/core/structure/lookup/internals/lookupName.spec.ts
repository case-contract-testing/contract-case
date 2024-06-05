import { CaseCoreError } from '@contract-case/case-plugin-base';
import { stripType } from './lookupName';

describe('stripType', () => {
  it('strips matcher correctly', () => {
    expect(
      stripType({ lookupType: 'matcher', name: 'matcher:example name' }),
    ).toBe('example name');
  });

  it('throws if called without the right type', () => {
    expect(() =>
      stripType({
        lookupType: 'variable:default',
        name: 'matcher:example name',
      }),
    ).toThrow(CaseCoreError);
  });
});
