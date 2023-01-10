import {
  type AnyCaseNodeOrData,
  type CoreAndCombinationMatcher,
  type CoreArrayLengthMatcher,
  COMBINE_MATCHERS_TYPE,
  ARRAY_LENGTH_MATCHER_TYPE,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from './types';

type ArrayLengthOptions = { minLength?: number; maxLength?: number };

export const coreArrayLengthMatcher = ({
  minLength,
  maxLength,
}: ArrayLengthOptions): CoreArrayLengthMatcher => ({
  'case:matcher:type': ARRAY_LENGTH_MATCHER_TYPE,
  'case:matcher:minLength': minLength !== undefined ? minLength : 1,
  'case:matcher:maxLength':
    maxLength !== undefined ? maxLength : ARRAY_LENGTH_PARAMETER_INFINITE,
});

export const coreAndMatcher = (
  ...matchers: AnyCaseNodeOrData[]
): CoreAndCombinationMatcher => ({
  'case:matcher:type': COMBINE_MATCHERS_TYPE,
  'case:matcher:children': [...matchers],
});
