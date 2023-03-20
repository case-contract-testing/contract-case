import {
  type AnyCaseNodeOrData,
  type CoreAndCombinationMatcher,
  type CoreArrayLengthMatcher,
  COMBINE_MATCHERS_TYPE,
  ARRAY_LENGTH_MATCHER_TYPE,
  ARRAY_LENGTH_PARAMETER_INFINITE,
  CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
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

/**
 * Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overriden with other matchers
 *
 * Use this to switch out of the default `exactlyLike` matching.
 *
 * @param content - The example object, array, primitive or matcher to match against
 */
export const coreShapedLike = (
  content: AnyCaseNodeOrData
): CoreCascadingMatcher => ({
  'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  'case:matcher:child': content,
  'case:context:matchBy': 'type',
});
