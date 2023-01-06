import { coreLookupMatcher, coreLookupMatcherRequest } from 'entities';
import { httpStatusCodeMatcher } from 'entities/nodes/matchers/http';
import {
  coreNumberMatcher,
  coreStringMatcher,
} from 'entities/nodes/matchers/leaf';
import {
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
  AnyCaseNodeOrData,
  LookupableMatcher,
} from 'entities/nodes/matchers/types';
import {
  ARRAY_EACH_ENTRY_MATCHES,
  CoreArrayEachEntryMatches,
  CoreHttpStatusCodeMatcher,
} from 'entities/types';
import type {
  BooleanMatcher,
  NullMatcher,
  NumberMatcher,
  StringMatcher,
} from './types';

export * from './auxillary';

/**
 * Matches a number.
 *
 * When in a JSON match context, this will be following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259) - ie, not NaN or Infinity
 *
 * @param example An example number
 */
export const anyNumber = (example = 1.1): NumberMatcher => ({
  ...coreNumberMatcher(example),
  'case:context:matchBy': 'type',
});

/**
 * Matches any string.
 *
 * @param example An example string
 */
export const anyString = (example = 'someString'): StringMatcher => ({
  ...coreStringMatcher(example),
  'case:context:matchBy': 'type',
});

/**
 * Matches any Boolean.
 *
 * @param example An example boolean
 */
export const anyBoolean = (example = true): BooleanMatcher => ({
  'case:matcher:type': BOOLEAN_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
  'case:matcher:resolvesTo': 'boolean',
});

/**
 * Matches any null.
 *
 * You don't actually need this matcher, you can just use the literal `null`
 *
 * @param example An example null
 */
export const anyNull = (example = null): NullMatcher => ({
  'case:matcher:type': NULL_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
  'case:matcher:resolvesTo': 'null',
});

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
 * Matches an array where each element matches the provided matcher.
 *
 * @param matcher The example object, array, primitive or matcher to match against
 */
export const arrayEachEntryMatches = (
  matcher: AnyCaseNodeOrData,
  example?: Array<AnyCaseNodeOrData>
): CoreArrayEachEntryMatches => ({
  'case:matcher:type': ARRAY_EACH_ENTRY_MATCHES,
  'case:matcher:matcher': matcher,
  ...(example !== undefined ? { 'case:matcher:example': example } : {}),
});

/**
 * Matches http status codes. Matches may be provided as a string, eg '4XX' or '401', or a number.
 * If an array is provided, any status codes in the array will be matched.
 *
 * @param match
 * @param example
 * @returns
 */
export const httpStatus = (
  match: number | string | Array<number | string>,
  example?: number
): CoreHttpStatusCodeMatcher => httpStatusCodeMatcher(match, example);

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
