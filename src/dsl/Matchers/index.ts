import {
  JSON_SERIALISABLE_NUMBER_TYPE,
  JSON_SERIALISABLE_STRING_TYPE,
  JSON_SERIALISABLE_BOOLEAN_TYPE,
  JSON_SERIALISABLE_NULL_TYPE,
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
export const number = (example = 1.1): NumberMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_NUMBER_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const string = (example = 'someString'): StringMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_STRING_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const boolean = (example = true): BooleanMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_BOOLEAN_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

export const matchNull = (example = null): NullMatcher => ({
  'case:matcher:type': JSON_SERIALISABLE_NULL_TYPE,
  'case:matcher:example': example,
  'case:context:matchBy': 'type',
});

/*
export const exactMatchPrimitive = (
  example: JsonPrimitive
): JsonExactPrimitiveMatcher => ({
  'case:matcher:type': JSON_EXACT_PRIMITIVE_TYPE,
  'case:matcher:example': example,
  'case:matcher:exactlyEqualTo': example,
});
*/
