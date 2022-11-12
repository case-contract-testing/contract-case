import { loggerWithoutContext } from 'connectors/logger/consoleLogger';
import type { ContractDescription } from 'entities/contract/types';
import type {
  AnyCaseMatcher,
  AnyInteraction,
  LookupableMatcher,
  MatchingError,
} from 'entities/types';
import type { CaseExample, CaseState, ContractFile } from './types';

const isLookupableMatcher = (
  maybeMatcher: unknown
): maybeMatcher is LookupableMatcher =>
  'case:interaction:uniqueName' in (maybeMatcher as LookupableMatcher);

const addInteractions = (
  matcherLookup: Record<string, AnyCaseMatcher>,
  interaction: AnyInteraction
) =>
  [interaction.request, interaction.response].reduce<
    Record<string, AnyCaseMatcher>
  >((acc: Record<string, AnyCaseMatcher>, matcher: AnyCaseMatcher) => {
    if (isLookupableMatcher(matcher)) {
      if (acc[matcher['case:matcher:uniqueName']]) {
        // we already have this one
        /* throw new CaseCoreError(
          'NOT YET IMPLMENTED: Multiple interactions with the same name'
        ); */
        loggerWithoutContext.warn(
          'NOT YET IMPLEMENTED: MULTIPLE interactions with the same name'
        );
      }
      return {
        ...acc,
        [matcher['case:matcher:uniqueName']]: matcher,
      };
    }
    return acc;
  }, matcherLookup);

export const makeContract = (
  description: ContractDescription
): ContractFile => ({
  description,
  matcherLookup: {} as Record<string, AnyCaseMatcher>,
  examples: new Array<CaseExample>(),
});

export const addSuccess = (
  contract: ContractFile,
  interaction: AnyInteraction,
  states: Array<CaseState>
): ContractFile => ({
  ...contract,
  matcherLookup: addInteractions(contract.matcherLookup, interaction),
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
  errors: Array<MatchingError>
): ContractFile => ({
  ...contract,
  matcherLookup: addInteractions(contract.matcherLookup, interaction),
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
