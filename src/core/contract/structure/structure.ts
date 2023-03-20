import { caseVersion } from '../../../entities/caseVersion';
import type {
  ContractDescription,
  ContractData,
  AnyCaseNodeOrData,
  CaseExample,
  MatchContextWithoutLookup,
  LookupableMatcher,
} from '../../../entities/types';
import { addMock, addMatcher } from './lookup';

import { addLookup, findLookup } from './lookup/internals';

export const makeContract = (
  description: ContractDescription
): ContractData => ({
  contractType: 'case::contract',
  description,
  metadata: { case: { version: caseVersion } },
  matcherLookup: {} as Record<string, AnyCaseNodeOrData>,
  examples: new Array<CaseExample>(),
});

export const addExample = (
  contract: ContractData,
  example: CaseExample,
  context: MatchContextWithoutLookup
): ContractData => ({
  ...contract,
  matcherLookup: addMock(contract.matcherLookup, example.mock, context),
  examples: [...contract.examples, example],
});

export const hasFailure = (contract: ContractData): boolean =>
  contract.examples.find((example) => example.result === 'FAILED') !==
  undefined;

export const findMatcher = (
  contract: ContractData,
  uniqueName: string
): AnyCaseNodeOrData | undefined =>
  findLookup(contract.matcherLookup, 'matcher', uniqueName);

export const addVariable = (
  contract: ContractData,
  uniqueName: string,
  variable: AnyCaseNodeOrData,
  context: MatchContextWithoutLookup
): ContractData => ({
  ...contract,
  matcherLookup: addLookup(
    contract.matcherLookup,
    `variable:default`,
    uniqueName,
    variable,
    context
  ),
  examples: [...contract.examples],
});

export const findVariable = (
  contract: ContractData,
  uniqueName: string
): AnyCaseNodeOrData | undefined => {
  const stateVariable = findLookup(
    contract.matcherLookup,
    'variable:state',
    uniqueName
  );
  if (stateVariable !== undefined) {
    return stateVariable;
  }
  return findLookup(contract.matcherLookup, `variable:default`, uniqueName);
};

export const addLookupableMatcher = (
  contract: ContractData,
  matcher: LookupableMatcher,
  context: MatchContextWithoutLookup
): ContractData => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, context),
  examples: [...contract.examples],
});
