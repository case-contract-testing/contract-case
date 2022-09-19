import {
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  CoreCascadingExactMatcher,
  CASCADING_EXACT_MATCHER_TYPE,
  CaseNodeOrData,
} from 'core/matchers/types';
import type {
  BooleanMatcher,
  NullMatcher,
  NumberMatcher,
  StringMatcher,
} from './types';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 *
 * @param example Any floating point number, not infinity, not NaN.
 * @returns
 */
export const anyNumber = (example = 1.1): NumberMatcher => ({
  'case:matcher:type': NUMBER_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const anyString = (example = 'someString'): StringMatcher => ({
  'case:matcher:type': STRING_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const anyBoolean = (example = true): BooleanMatcher => ({
  'case:matcher:type': BOOLEAN_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const anyNull = (example = null): NullMatcher => ({
  'case:matcher:type': NULL_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const exact = (example: CaseNodeOrData): CoreCascadingExactMatcher => ({
  'case:matcher:type': CASCADING_EXACT_MATCHER_TYPE,
  'case:matcher:child': example,
  'case:context:matchBy': 'exact',
});
