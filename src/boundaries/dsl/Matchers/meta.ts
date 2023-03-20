import {
  coreAndMatcher,
  coreLookupMatcherRequest,
  coreLookupMatcher,
  coreShapedLike,
} from '../../../entities';
import {
  type AnyCaseNodeOrData,
  type CoreAndCombinationMatcher,
  type AnyCaseMatcher,
  type AnyData,
  type HasExample,
  type LookupableMatcher,
  type CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
  type CoreContextVariableMatcher,
  CONTEXT_VARIABLE_TYPE,
  type LogLevel,
  ResolvesTo,
} from '../../../entities/types';

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
export const shapedLike = (content: AnyCaseNodeOrData): CoreCascadingMatcher =>
  coreShapedLike(content);

/**
 * Matches the content of a variable from a provider state.
 *
 * @param name The name of the variable
 */
export const stateVariable = (name: string): CoreContextVariableMatcher => ({
  'case:matcher:type': CONTEXT_VARIABLE_TYPE,
  'case:matcher:variableName': name,
});

/**
 * Matches the content of a variable from a provider state.
 *
 * @param name The name of the variable
 */
export const stringStateVariable = (
  name: string
): CoreContextVariableMatcher & ResolvesTo<'string'> => ({
  'case:matcher:type': CONTEXT_VARIABLE_TYPE,
  'case:matcher:variableName': name,
  'case:matcher:resolvesTo': 'string',
});

/**
 * Alters the case log level below this matcher. Useful for debugging.
 *
 * This has no effect on matching.
 *
 * Note that this log level change is saved into the contract, which may not be what you want.
 *
 * @param logLevel The new {@link LogLevel}
 * @param child The next matcher in the tree.
 */
export const logLevel = (
  level: LogLevel,
  child: AnyCaseNodeOrData
): CoreCascadingMatcher => ({
  'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  'case:matcher:child': child,
  'case:currentRun:context:logLevel': level,
});
