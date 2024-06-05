import { CaseCoreError } from '../../errors';
import { CaseError } from '../../matchers/errors.types';
import { AnyMockDescriptor } from '../../mocks/types';
import type { CaseExample, ExampleNames } from './types';

const getRequestName = (index: string, mock: AnyMockDescriptor) => {
  if (!('request' in mock)) {
    return 'No request defined';
  }

  return '_case:matcher:uniqueName' in mock.request &&
    typeof mock.request['_case:matcher:uniqueName'] === 'string'
    ? mock.request['_case:matcher:uniqueName']
    : `Mock ${index}'s request`;
};

const getResponseName = (index: string, mock: AnyMockDescriptor): string => {
  if (!('response' in mock)) {
    return 'No response defined';
  }

  return '_case:matcher:uniqueName' in mock.response &&
    typeof mock.response['_case:matcher:uniqueName'] === 'string'
    ? mock.response['_case:matcher:uniqueName']
    : `Mock ${index}'s response`;
};

export const exampleToNames = (
  { states, mock }: CaseExample,
  index: string,
): ExampleNames => {
  const stateNames = states.map((state) => state.stateName).join(' and ');

  const requestName = getRequestName(index, mock);

  const responseName = getResponseName(index, mock);

  return {
    requestName,
    responseName,
    mockName: `${
      stateNames !== '' ? `When ${stateNames}, then ` : ''
    }${requestName} -> ${responseName}`,
  };
};

export const makeSuccessExample = (example: CaseExample): CaseExample => {
  if (example.result !== 'PENDING') {
    throw new CaseCoreError(
      `Trying to make a successful example from one that wasn't pending (was ${example.result})`,
    );
  }
  return { ...example, result: 'VERIFIED' };
};

export const makeFailedExample = (
  example: CaseExample,
  errors: Array<CaseError>,
): CaseExample => {
  if (example.result !== 'PENDING') {
    throw new CaseCoreError(
      `Trying to make a failed example from one that wasn't pending (was ${example.result})`,
    );
  }
  return { ...example, result: 'FAILED', errors };
};
