import {
  CoreArrayLengthMatcher,
  ARRAY_LENGTH_MATCHER_TYPE,
  ARRAY_LENGTH_PARAMETER_INFINITE,
  AnyCaseMatcherOrData,
  CoreAndCombinationMatcher,
  COMBINE_MATCHERS_TYPE,
  CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';
import { MatchContextByType } from '../../types';

type ArrayLengthOptions = { minLength?: number; maxLength?: number };

export const coreArrayLengthMatcher = ({
  minLength,
  maxLength,
}: ArrayLengthOptions): CoreArrayLengthMatcher => ({
  '_case:matcher:type': ARRAY_LENGTH_MATCHER_TYPE,
  '_case:matcher:minLength': minLength !== undefined ? minLength : 1,
  '_case:matcher:maxLength':
    maxLength !== undefined ? maxLength : ARRAY_LENGTH_PARAMETER_INFINITE,
});

export const coreAndMatcher = (
  ...matchers: AnyCaseMatcherOrData[]
): CoreAndCombinationMatcher => ({
  '_case:matcher:type': COMBINE_MATCHERS_TYPE,
  '_case:matcher:children': [...matchers],
});

/**
 * Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overriden with other matchers
 *
 * Use this to switch out of the default `exactlyLike` matching.
 *
 * @param content - The example object, array, primitive or matcher to match against
 */
export const coreShapedLike = (
  content: AnyCaseMatcherOrData,
): CoreCascadingMatcher & MatchContextByType => ({
  '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  '_case:matcher:child': content,
  '_case:context:matchBy': 'type',
});
