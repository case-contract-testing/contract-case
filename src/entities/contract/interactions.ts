import { CaseCoreError } from 'entities/CaseCoreError';
import { coreLookupMatcher } from 'entities/nodes/matchers';
import type {
  AnyCaseNodeOrData,
  MatchContext,
  AnyMockType,
  CaseMockFor,
  CaseError,
  ExampleNames,
} from 'entities/types';
import type { CaseExample } from './types';

export const exampleToNames = (
  { states, interaction }: CaseExample,
  index: string
): ExampleNames => {
  const stateNames = states.map((state) => state.stateName).join(' and ');

  const requestName =
    'case:matcher:uniqueName' in interaction.request
      ? interaction.request['case:matcher:uniqueName']
      : `Mock ${index}'s request`;
  const responseName =
    'case:matcher:uniqueName' in interaction.response
      ? interaction.response['case:matcher:uniqueName']
      : `Mock ${index}'s response`;

  return {
    requestName,
    responseName,
    interactionName: `${stateNames !== '' ? `When ${stateNames}, then ` : ''}${
      interaction['case:interaction:uniqueName']
        ? interaction['case:interaction:uniqueName']
        : `${requestName} -> ${responseName}`
    }`,
  };
};

const nameMatcher = (matcher: AnyCaseNodeOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

export const nameMock = <T extends AnyMockType>(
  interaction: CaseMockFor<T>,
  context: MatchContext
): CaseMockFor<T> => ({
  ...interaction,
  request: nameMatcher(interaction.request, context),
  response: nameMatcher(interaction.response, context),
});

export const makeSuccessExample = (example: CaseExample): CaseExample => {
  if (example.result !== 'PENDING') {
    throw new CaseCoreError(
      `Trying to make a successful example from one that wasn't pending (was ${example.result})`
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
      `Trying to make a failed example from one that wasn't pending (was ${example.result})`
    );
  }
  return { ...example, result: 'FAILED', errors };
};
