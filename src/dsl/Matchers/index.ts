import {
  JsonNumberMatcher,
  JsonStringMatcher,
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
