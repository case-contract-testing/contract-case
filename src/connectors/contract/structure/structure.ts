import { CaseConfigurationError } from 'entities';
import type { CaseExample, ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';
import {
  type AnyInteraction,
  isLookupableMatcher,
  type AnyCaseNodeOrData,
  LookupableMatcher,
} from 'entities/types';
import { rawEquality } from './rawEquals';

import type { ContractFile } from './types';

const addMatcher = (
  matcherLookup: Record<string, AnyCaseNodeOrData>,
  matcher: AnyCaseNodeOrData,
  logger: Logger
): Record<string, AnyCaseNodeOrData> => {
  if (isLookupableMatcher(matcher) && 'case:matcher:child' in matcher) {
    logger.maintainerDebug(`Saving lookup matcher:`, matcher);
    if (matcherLookup[matcher['case:matcher:uniqueName']]) {
      if (
        !rawEquality(
          matcher['case:matcher:child'],
          matcherLookup[matcher['case:matcher:uniqueName']]
        )
      ) {
        logger.error(
          `The matcher with the name '${matcher['case:matcher:uniqueName']}' has more than one definition, and they are not the same`
        );
        logger.error('New matcher is', matcher['case:matcher:child']);
        logger.error(
          'Existing matcher is',
          matcherLookup[matcher['case:matcher:uniqueName']]
        );

        throw new CaseConfigurationError(
          `The matcher with the name '${matcher['case:matcher:uniqueName']}' has more than one definition, and they are not the same`
        );
      } else {
        logger.maintainerDebug(
          `The matcher with the name '${matcher['case:matcher:uniqueName']}' is already stored exactly as given`
        );
      }
    }

    return {
      ...matcherLookup,
      [matcher['case:matcher:uniqueName']]: matcher['case:matcher:child'],
    };
  }
  return matcherLookup;
};

const addInteraction = (
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

export const addExample = (
  contract: ContractFile,
  example: CaseExample,
  logger: Logger
): ContractFile => ({
  ...contract,
  matcherLookup: addInteraction(
    contract.matcherLookup,
    example.interaction,
    logger
  ),
  examples: [...contract.examples, example],
});

export const hasFailure = (contract: ContractFile): boolean =>
  contract.examples.find((example) => example.result === 'FAILED') !==
  undefined;

export const addLookupableMatcher = (
  contract: ContractFile,
  matcher: LookupableMatcher,
  logger: Logger
): ContractFile => ({
  ...contract,
  matcherLookup: addMatcher(contract.matcherLookup, matcher, logger),
  examples: [...contract.examples],
});
