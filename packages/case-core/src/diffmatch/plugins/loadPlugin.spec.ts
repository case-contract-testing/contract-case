import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { MatcherExecutors } from '../matching/MatcherExecutors';
import { loadPlugin } from './loadPlugin';
import { EMPTY_MATCH_CONTEXT } from '../../__tests__/testContext';
import { MockSetupFns } from './types';

describe('plugin loader', () => {
  beforeEach(() => {
    Object.keys(MatcherExecutors).forEach((key) => {
      // clear all executors
      delete MatcherExecutors[key as keyof typeof MatcherExecutors];
    });
  });

  describe('with LOAD_IN_PROGRESS as the version name', () => {
    it('throws a configuration error', () => {
      expect(() => {
        loadPlugin({} as MockSetupFns, EMPTY_MATCH_CONTEXT, {
          name: 'Empty test plugin',
          version: 'LOAD_IN_PROGRESS',
          matcherExecutors: {},
          setupMocks: {},
        });
      }).toThrow(CaseConfigurationError);
    });
  });
  describe('with a valid version', () => {
    it('loads an empty plugin', () => {
      expect(() => {
        loadPlugin({} as MockSetupFns, EMPTY_MATCH_CONTEXT, {
          name: 'Empty test plugin',
          version: '0.0.0',
          matcherExecutors: {},
          setupMocks: {},
        });
      }).not.toThrow();
    });
  });
});
