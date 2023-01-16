import { coreLookupMatcher, coreLookupMatcherRequest } from 'entities';
import { coreAndMatcher } from 'entities/nodes/matchers/auxillary';
import {
  AnyCaseNodeOrData,
  CoreAndCombinationMatcher,
  LookupableMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
  CoreCascadingMatcher,
  AnyData,
  AnyCaseMatcher,
  HasExample,
  CONTEXT_VARIABLE_TYPE,
  CoreContextVariableMatcher,
} from 'entities/types';

/**
 * Meta matcher that matches all matchers provided. Use this to combine matching rules for the same element
 *
 * @param options
 */
export const and = (
  ...matchers: AnyCaseNodeOrData[]
): CoreAndCombinationMatcher => coreAndMatcher(...matchers);

/**
 * Adds an example to the provided matcher
 *
 * @param options
 */
export const withExample = <T extends AnyCaseMatcher>(
  matcher: T,
  example: AnyData
): HasExample<T> => ({ ...matcher, 'case:matcher:example': example });

/**
 * Meta matcher that gives the matcher below it a unique name that can be reused in tests after this one.
 *
 */
export const namedMatch = (
  uniqueName: string,
  matcherOrData?: AnyCaseNodeOrData | undefined
): LookupableMatcher =>
  matcherOrData === undefined
    ? coreLookupMatcherRequest(uniqueName)
    : coreLookupMatcher(uniqueName, matcherOrData);

/**
 * Everything inside this matcher will be matched exactly, unless overridden with an `any*` matcher
 *
 * Use this to switch out of `shapedLike` and back to the default exact matching.
 *
 * @param content What
 */
export const exactlyLike = (
  content: AnyCaseNodeOrData
): CoreCascadingMatcher => ({
  'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  'case:matcher:child': content,
  'case:context:matchBy': 'exact',
});

/**
 * Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overriden with other matchers
 *
 * Use this to switch out of the default `exactlyLike` matching.
 *
 * @param content The example object, array, primitive or matcher to match against
 */
export const shapedLike = (
  content: AnyCaseNodeOrData
): CoreCascadingMatcher => ({
  'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  'case:matcher:child': content,
  'case:context:matchBy': 'type',
});

/**
 * Matches the content of a variable from a provider state.
 *
 * @param name The name of the variable
 */
export const stateVariable = (name: string): CoreContextVariableMatcher => ({
  'case:matcher:type': CONTEXT_VARIABLE_TYPE,
  'case:matcher:variableName': name,
});
