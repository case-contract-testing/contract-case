import { loggerWithoutContext } from 'connectors/logger/consoleLogger';
import type { ContractDescription } from 'entities/contract/types';
import type { AnyInteraction, MatchingError } from 'entities/types';
import type { CaseExample, CaseState, ContractFile } from './types';

const addInteractions = (
  interactionLookup: Record<string, AnyInteraction>,
  interactions: Array<AnyInteraction>
) =>
  interactions.reduce<Record<string, AnyInteraction>>(
    (acc: Record<string, AnyInteraction>, interaction: AnyInteraction) => {
      if (acc[interaction['case:interaction:uniqueName']]) {
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
        [interaction['case:interaction:uniqueName']]: interaction,
      };
    },
    interactionLookup
  );

export const makeContract = (
  description: ContractDescription
): ContractFile => ({
  description,
  interactionLookup: {} as Record<string, AnyInteraction>,
  examples: new Array<CaseExample>(),
});

export const addSuccess = (
  contract: ContractFile,
  interactions: Array<AnyInteraction>,
  states: Array<CaseState>
): ContractFile => ({
  ...contract,
  interactionLookup: addInteractions(contract.interactionLookup, interactions),
  examples: [
    ...contract.examples,
    {
      result: 'VERIFIED',
      states,
      interactionKeys: interactions.map(
        (interaction) => interaction['case:interaction:uniqueName']
      ),
    },
  ],
});

export const addFailure = (
  contract: ContractFile,
  interactions: Array<AnyInteraction>,
  states: Array<CaseState>,
  errors: Array<MatchingError>
): ContractFile => ({
  ...contract,
  interactionLookup: addInteractions(contract.interactionLookup, interactions),
  examples: [
    ...contract.examples,
    {
      result: 'FAILED',
      states,
      interactionKeys: interactions.map(
        (interaction) => interaction['case:interaction:uniqueName']
      ),
      errors,
    },
  ],
});
