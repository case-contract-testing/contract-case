import type { CaseExample, ContractDescription } from 'entities/contract/types';
import type {
  AnyCaseNodeOrData,
  LogContext,
  LookupableMatcher,
} from 'entities/types';
import { addMock, addMatcher } from './lookup';

import { addLookup, findLookup } from './lookup/internals';
import type { ContractFile } from './types';

export const makeContract = (
  description: ContractDescription
): ContractFile => ({
  description,
  matcherLookup: {} as Record<string, AnyCaseNodeOrData>,
  examples: new Array<CaseExample>(),
});

export const addExample = (
  contract: ContractFile,
  example: CaseExample,
  context: LogContext
): ContractFile => ({
  ...contract,
  matcherLookup: addMock(contract.matcherLookup, example.interaction, context),
  examples: [...contract.examples, example],
});

export const hasFailure = (contract: ContractFile): boolean =>
  contract.examples.find((example) => example.result === 'FAILED') !==
  undefined;

export const findMatcher = (
  contract: ContractFile,
  uniqueName: string
): AnyCaseNodeOrData | undefined =>
  findLookup(contract.matcherLookup, 'matcher', uniqueName);

export const addVariable = (
  contract: ContractFile,
  type: 'state' | 'default',
  uniqueName: string,
  variable: AnyCaseNodeOrData,
  context: LogContext
): ContractFile => ({
  ...contract,
  matcherLookup: addLookup(
    contract.matcherLookup,
    `variable:${type}`,
    uniqueName,
    variable,
    context
  ),
  examples: [...contract.examples],
});

export const findVariable = (
  contract: ContractFile,
  type: 'state' | 'default',
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
  return findLookup(contract.matcherLookup, `variable:${type}`, uniqueName);
};

export const addLookupableMatcher = (
  contract: ContractFile,
  matcher: LookupableMatcher,
  context: LogContext
): ContractFile => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, context),
  examples: [...contract.examples],
});
