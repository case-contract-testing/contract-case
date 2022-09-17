import type { JsonPrimitive } from 'dsl/types';
import {
  JsonExactPrimitiveMatcher,
  JsonNullMatcher,
  JsonNumberMatcher,
  JsonStringMatcher,
  JSON_EXACT_PRIMITIVE_TYPE,
  JSON_NULL_TYPE,
  JSON_NUMBER_TYPE,
  JSON_STRING_TYPE,
} from './types';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 *
 * @param example Any floating point number, not infinity, not NaN.
 * @returns
 */
export const number = (example = 1.1): JsonNumberMatcher => ({
  'case:matcher:type': JSON_NUMBER_TYPE,
  'case:matcher:example': example,
});

export const string = (example = 'someString'): JsonStringMatcher => ({
  'case:matcher:type': JSON_STRING_TYPE,
  'case:matcher:example': example,
});

export const matchNull = (example = null): JsonNullMatcher => ({
  'case:matcher:type': JSON_NULL_TYPE,
  'case:matcher:example': example,
});

export const exactMatchPrimitive = (
  example: JsonPrimitive
): JsonExactPrimitiveMatcher => ({
  'case:matcher:type': JSON_EXACT_PRIMITIVE_TYPE,
  'case:matcher:example': example,
  'case:matcher:exactlyEqualTo': example,
});
