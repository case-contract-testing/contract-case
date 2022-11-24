import type { ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';
import {
  type AnyInteraction,
  isLookupableMatcher,
  type MatchingError,
  type AnyCaseNodeOrData,
  LookupableMatcher,
} from 'entities/types';

import type { CaseExample, CaseState, ContractFile } from './types';

const addMatcher = (
  matcherLookup: Record<string, AnyCaseNodeOrData>,
  matcher: AnyCaseNodeOrData,
  logger: Logger
): Record<string, AnyCaseNodeOrData> => {
  if (isLookupableMatcher(matcher) && 'case:matcher:child' in matcher) {
    if (matcherLookup[matcher['case:matcher:uniqueName']]) {
      // we already have this one
      logger.warn(
        `NOT YET IMPLEMENTED: Test that multiple interactions with the same name are the same ('${matcher['case:matcher:uniqueName']}')`
      );
    }
    return {
      ...matcherLookup,
      [matcher['case:matcher:uniqueName']]: matcher['case:matcher:child'],
    };
  }
  return matcherLookup;
};

const addInteractions = (
  matcherLookup: Record<string, AnyCaseNodeOrData>,
  interaction: AnyInteraction,
  logger: Logger
) =>
  [interaction.request, interaction.response].reduce(
    (acc, curr) => addMatcher(acc, curr, logger),
    matcherLookup
  );

export const findMatcher = (
  contract: ContractFile,
  uniqueName: string
): AnyCaseNodeOrData | undefined => contract.matcherLookup[uniqueName];

export const makeContract = (
  description: ContractDescription
): ContractFile => ({
  description,
  matcherLookup: {} as Record<string, AnyCaseNodeOrData>,
  examples: new Array<CaseExample>(),
});

export const addSuccess = (
  contract: ContractFile,
  interaction: AnyInteraction,
  states: Array<CaseState>,
  logger: Logger
): ContractFile => ({
  ...contract,
  matcherLookup: addInteractions(contract.matcherLookup, interaction, logger),
  examples: [
    ...contract.examples,
    {
      result: 'VERIFIED',
      states,
      interaction,
    },
  ],
});

export const addFailure = (
  contract: ContractFile,
  interaction: AnyInteraction,
  states: Array<CaseState>,
  errors: Array<MatchingError>,
  logger: Logger
): ContractFile => ({
  ...contract,
  matcherLookup: addInteractions(contract.matcherLookup, interaction, logger),
  examples: [
    ...contract.examples,
    {
      result: 'FAILED',
      states,
      interaction,
      errors,
    },
  ],
});

export const addLookupableMatcher = (
  contract: ContractFile,
  matcher: LookupableMatcher,
  logger: Logger
): ContractFile => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, logger),
  examples: [...contract.examples],
});
