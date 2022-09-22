import {
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  CoreCascadingMatcher,
  CASCADING_CONTEXT_MATCHER_TYPE,
  AnyCaseNodeOrData,
} from 'core/matchers/types';
import type {
  BooleanMatcher,
  NullMatcher,
  NumberMatcher,
  StringMatcher,
} from './types';

/**
 * Matches a number.
 *
 * When in a JSON match context, this will be following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259) - ie, not NaN or Infinity
 *
 * @param example An example number
 */
export const anyNumber = (example = 1.1): NumberMatcher => ({
  'case:matcher:type': NUMBER_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

/**
 * Matches any string.
 *
 * @param example An example string
 */
export const anyString = (example = 'someString'): StringMatcher => ({
  'case:matcher:type': STRING_MATCHER_TYPE,
  'case:matcher:example': example,
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
 * @param content What
 */
export const shapedLike = (
  content: AnyCaseNodeOrData
): CoreCascadingMatcher => ({
  'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
  'case:matcher:child': content,
  'case:context:matchBy': 'type',
});
