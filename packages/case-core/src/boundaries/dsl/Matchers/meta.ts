import {
  AnyCaseMatcherOrData,
  CoreAndCombinationMatcher,
  AnyCaseMatcher,
  AnyData,
  HasExample,
  CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
  LookupableMatcher,
  CoreContextVariableMatcher,
  CONTEXT_VARIABLE_TYPE,
  ResolvesTo,
} from '@contract-case/case-entities-internal';
import {
  coreAndMatcher,
  coreLookupMatcherRequest,
  coreLookupMatcher,
  coreShapedLike,
} from '../../../entities';
import { LogLevel, MatchContextByExact } from '../../../entities/types';

/**
 * Meta matcher that matches all matchers provided. Use this to combine matching rules for the same element
 *
 * @param matchers - All of the matchers to run against this particular spot
 */
export const and = (
  ...matchers: AnyCaseMatcherOrData[]
): CoreAndCombinationMatcher => coreAndMatcher(...matchers);

/**
 * Adds an example to the provided matcher. Useful when you have a complicated
 * set of constraints and Case can't figure out what the best example should be.
 *
 * @param matcher - Any matcher
 * @param example - The example to use when stripping the matchers
 */
export const withExample = <T extends AnyCaseMatcher>(
  matcher: T,
  example: AnyData,
): HasExample<CoreCascadingMatcher> => ({
  '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  '_case:matcher:child': matcher,
  '_case:matcher:example': example,
});

/**
 * Meta matcher that gives the matcher below it a unique name that can be reused in tests after this one.
 *
 * @param uniqueName - The name you can use to match this content later
 * @param matcherOrData - The content of this named match. If omitted, the content will be looked up in a previously named match
 */
export const namedMatch = (
  uniqueName: string,
  matcherOrData?: AnyCaseMatcherOrData | undefined,
): LookupableMatcher =>
  matcherOrData === undefined
    ? coreLookupMatcherRequest(uniqueName)
    : coreLookupMatcher(uniqueName, matcherOrData);

/**
 * Everything inside this matcher will be matched exactly, unless overridden with an `any*` matcher
 *
 * Use this to switch out of `shapedLike` and back to the default exact matching.
 *
 * @param content - The example object, array, primitive or matcher to match exactly against
 */
export const exactlyLike = (
  content: AnyCaseMatcherOrData,
): CoreCascadingMatcher & MatchContextByExact => ({
  '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  '_case:matcher:child': content,
  '_case:context:matchBy': 'exact',
});

/**
 * Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overriden with other matchers
 *
 * Use this to switch out of the default `exactlyLike` matching.
 *
 * @param content - The example object, array, primitive or matcher to match against, ignoring content
 */
export const shapedLike = (
  content: AnyCaseMatcherOrData,
): CoreCascadingMatcher => coreShapedLike(content);

/**
 * Matches the content of a variable from a provider state.
 *
 * @param name - The name of the variable
 */
export const stateVariable = (name: string): CoreContextVariableMatcher => ({
  '_case:matcher:type': CONTEXT_VARIABLE_TYPE,
  '_case:matcher:variableName': name,
});

/**
 * Matches the content of a variable from a provider state.
 *
 * @param name - The name of the variable
 */
export const stringStateVariable = (
  name: string,
): CoreContextVariableMatcher & ResolvesTo<'string'> => ({
  '_case:matcher:type': CONTEXT_VARIABLE_TYPE,
  '_case:matcher:variableName': name,
  '_case:matcher:resolvesTo': 'string',
});

/**
 * Alters the case log level below this matcher. Useful for debugging.
 *
 * This has no effect on matching.
 *
 * Note that this log level change is saved into the contract, which may not be what you want.
 *
 * @param logLevel - The new {@link LogLevel}
 * @param child - The next matcher in the tree.
 */
export const logLevel = (
  level: LogLevel,
  child: AnyCaseMatcherOrData,
): CoreCascadingMatcher & {
  '_case:currentRun:context:logLevel': LogLevel;
} => ({
  '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  '_case:matcher:child': child,
  '_case:currentRun:context:logLevel': level,
});
