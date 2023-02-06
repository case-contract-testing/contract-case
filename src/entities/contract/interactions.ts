import { CaseCoreError } from 'entities/CaseCoreError';
import { coreLookupMatcher } from 'entities/nodes/matchers';
import type {
  AnyCaseNodeOrData,
  MatchContext,
  AnyInteractionType,
  CaseInteractionFor,
  CaseError,
} from 'entities/types';
import type { CaseExample } from './types';

export const nameExample = (
  { states, interaction }: CaseExample,
  index: string
): string => {
  const stateNames = states.map((state) => state.stateName).join(' and ');
  if (interaction['case:interaction:uniqueName']) {
    return interaction['case:interaction:uniqueName'];
  }
  const requestName =
    'case:matcher:uniqueName' in interaction.request
      ? interaction.request['case:matcher:uniqueName']
      : `Interaction ${index}'s request`;
  const responseName =
    'case:matcher:uniqueName' in interaction.response
      ? interaction.response['case:matcher:uniqueName']
      : `Interaction ${index}'s response`;

  return `${
    stateNames !== '' ? `When ${stateNames}, then ` : ''
  }${requestName} -> ${responseName}`;
};

const nameMatcher = (matcher: AnyCaseNodeOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

export const nameInteraction = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  context: MatchContext
): CaseInteractionFor<T> => ({
  ...interaction,
  request: nameMatcher(interaction.request, context),
  response: nameMatcher(interaction.response, context),
});

export const makeSuccessExample = (example: CaseExample): CaseExample => {
  if (example.result !== 'PENDING') {
    throw new CaseCoreError(
      "Trying to make a successful example from one that wasn't pending"
    );
  }
  return { ...example, result: 'VERIFIED' };
};

export const makeFailedExample = (
  example: CaseExample,
  errors: Array<CaseError>
): CaseExample => {
  if (example.result !== 'PENDING') {
    throw new CaseCoreError(
      "Trying to make a successful example from one that wasn't pending"
    );
  }
  return { ...example, result: 'FAILED', errors };
};
