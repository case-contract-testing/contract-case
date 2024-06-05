import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { EMPTY_DATA_CONTEXT } from '../../__tests__/testContext';
import { makeContractStore, readContract } from './contractReader';

describe('readContract', () => {
  describe("when given a file that doesn't exist", () => {
    it('fails', () => {
      expect(() => readContract('this-no-existy.json')).toThrow(
        CaseConfigurationError,
      );
    });
  });
  describe("when given a file that isn't json", () => {
    it('fails', () => {
      expect(() => readContract('./README.md')).toThrow(CaseConfigurationError);
    });
  });
});

describe('contractStore', () => {
  const store = makeContractStore(EMPTY_DATA_CONTEXT);
  describe("when given a directory that doesn't exist", () => {
    it('fails', () => {
      expect(() => store.readContractsFromDir('this-no-existy-either')).toThrow(
        CaseConfigurationError,
      );
    });
  });
});
