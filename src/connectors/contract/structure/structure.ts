import type { CaseExample, ContractDescription } from 'entities/contract/types';
import {
  type AnyInteraction,
  isLookupableMatcher,
  type AnyCaseNodeOrData,
  LookupableMatcher,
  LogContext,
} from 'entities/types';

import { addLookup, findLookup } from './lookup';
import type { ContractFile } from './types';

const addMatcher = (
  matcherLookup: Record<string, AnyCaseNodeOrData>,
  matcher: AnyCaseNodeOrData,
  context: LogContext
): Record<string, AnyCaseNodeOrData> => {
  if (isLookupableMatcher(matcher) && 'case:matcher:child' in matcher) {
    return addLookup(
      matcherLookup,
      'matcher',
      matcher['case:matcher:uniqueName'],
      matcher['case:matcher:child'],
      context
    );
  }
  return matcherLookup;
};

const addInteraction = (
  matcherLookup: Record<string, AnyCaseNodeOrData>,
  interaction: AnyInteraction,
  context: LogContext
) =>
  [interaction.request, interaction.response].reduce(
    (acc, curr) => addMatcher(acc, curr, context),
    matcherLookup
  );

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
  matcherLookup: addInteraction(
    contract.matcherLookup,
    example.interaction,
    context
  ),
  examples: [...contract.examples, example],
});

export const hasFailure = (contract: ContractFile): boolean =>
  contract.examples.find((example) => example.result === 'FAILED') !==
  undefined;

export const addLookupableMatcher = (
  contract: ContractFile,
  matcher: LookupableMatcher,
  context: LogContext
): ContractFile => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, context),
  examples: [...contract.examples],
});

export const findMatcher = (
  contract: ContractFile,
  uniqueName: string
): AnyCaseNodeOrData | undefined =>
  findLookup(contract.matcherLookup, 'matcher', uniqueName);

export const addLookupVariable = (
  contract: ContractFile,
  type: 'default' | 'state',
  uniqueName: string,
  variable: LookupableMatcher,
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
  return findLookup(contract.matcherLookup, 'variable:default', uniqueName);
};
