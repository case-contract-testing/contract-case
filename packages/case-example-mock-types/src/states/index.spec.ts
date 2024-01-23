import {
  StateWithVariables,
  NameOnlyState,
} from '@contract-case/case-entities-internal';
import { InState, InStateWithVariables } from '.';

describe('state descriptors', () => {
  describe('InState', () => {
    it('compiles', () => {
      const a: NameOnlyState = new InState('foo');
      expect(a).not.toBe(null);
    });
  });

  describe('InStateWithVariables', () => {
    it('compiles', () => {
      const a: StateWithVariables = new InStateWithVariables('foo', { a: 'b' });
      expect(a).not.toBe(null);
    });
  });
});
