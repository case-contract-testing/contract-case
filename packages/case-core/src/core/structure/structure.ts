import {
  CaseError,
  CaseExample,
  MatchContextWithoutLookup,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  LookupableMatcher,
} from '@contract-case/case-plugin-dsl-types';

import { caseVersion } from '../../entities/versionString';
import { addMock, addMatcher } from './lookup';

import { addLookup, findLookup } from './lookup/internals';
import { CaseContractDescription, ContractData } from '../../entities/types';

/**
 * Internal function to generate a variable name from the current test, for lookup purposes.
 *
 * This exists to stop default variables with the same name from clashing if their contents are different
 *
 * Currently concatenates the test name with the variable name, but don't rely on this.
 *
 * @internal
 *
 * @param variableName - The actual variable name
 * @param context - The current run context. Used to get the test name
 * @returns a unique name.
 */
const variableNameFor = (
  variableName: string,
  context: MatchContextWithoutLookup,
): string =>
  `${variableName}::test[${context['_case:currentRun:context:testName']}]`;

export const makeContract = (
  description: CaseContractDescription,
): ContractData => ({
  contractType: 'case::contract',
  description,
  metadata: {
    _case: {
      version: process.env['CASE_MAINTAINER_TESTING_VERSION_OVERRIDE']
        ? 'case-internal-tests'
        : caseVersion,
    },
  },
  matcherLookup: {} as Record<string, AnyCaseMatcherOrData>,
  examples: new Array<CaseExample>(),
});

export const addExample = (
  contract: ContractData,
  example: CaseExample,
  context: MatchContextWithoutLookup,
): ContractData => ({
  ...contract,
  matcherLookup: addMock(contract.matcherLookup, example.mock, context),
  examples: [...contract.examples, example],
});

/**
 * Whether the contract has any examples or not
 *
 * @param contract - a ContractData object
 * @returns true if the contract has no examples
 */
export const isEmpty = (contract: ContractData): boolean =>
  contract.examples.length === 0;

/**
 * Whether the contract has any examples that are failures
 *
 * @param contract - a ContractData object
 * @returns true if the contract has any failed examples
 */
export const hasFailure = (contract: ContractData): boolean =>
  contract.examples.find((example) => example.result === 'FAILED') !==
  undefined;

export const getFailures = (contract: ContractData): CaseError[] =>
  contract.examples
    .filter((e) => e.result === 'FAILED')
    .map((e) => e.errors)
    .flat();

/**
 * Counts the number of interactions that are VERIFIED (ie, have passed during this run, or previously before the contract was written)
 * @param contract - a ContractData object
 * @returns the number of interactions that are VERIFIED
 */
export const getSuccessCount = (contract: ContractData): number =>
  contract.examples.filter((e) => e.result === 'VERIFIED').length;

/**
 * Counts the number of interactions that are PENDING (ie, not failed or verified)
 * @param contract - a ContractData object
 * @returns the number of interactions that are PENDING
 */
export const getPendingCount = (contract: ContractData): number =>
  contract.examples.filter((e) => e.result === 'PENDING').length;

export const findMatcher = (
  contract: ContractData,
  uniqueName: string,
  context: MatchContextWithoutLookup,
): AnyCaseMatcherOrData | undefined =>
  findLookup(contract.matcherLookup, 'matcher', uniqueName, context);

export const addVariable = (
  contract: ContractData,
  uniqueName: string,
  type: 'default' | 'state',
  variable: AnyCaseMatcherOrData,
  context: MatchContextWithoutLookup,
): ContractData => ({
  ...contract,
  matcherLookup: addLookup(
    contract.matcherLookup,
    `variable:${type}`,
    variableNameFor(uniqueName, context),
    variable,
    context,
  ),
  examples: [...contract.examples],
});

export const findVariable = (
  contract: ContractData,
  uniqueName: string,
  context: MatchContextWithoutLookup,
): AnyCaseMatcherOrData | undefined => {
  const stateVariable = findLookup(
    contract.matcherLookup,
    'variable:state',
    variableNameFor(uniqueName, context),
    context,
  );
  if (stateVariable !== undefined) {
    return stateVariable;
  }
  return findLookup(
    contract.matcherLookup,
    `variable:default`,
    variableNameFor(uniqueName, context),
    context,
  );
};

export const addLookupableMatcher = (
  contract: ContractData,
  matcher: LookupableMatcher,
  context: MatchContextWithoutLookup,
): ContractData => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, context),
  examples: [...contract.examples],
});
