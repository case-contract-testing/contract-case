import {
  CoreBooleanMatcher,
  CoreNullMatcher,
  CoreNumberMatcher,
  CoreStringMatcher,
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
} from './types';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 *
 * @param example Any floating point number, not infinity, not NaN.
 * @returns
 */
export const coreNumberMatcher = (example: number): CoreNumberMatcher => ({
  'case:matcher:type': NUMBER_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:matcher:resolvesTo': 'number',
});

export const coreStringMatcher = (example: string): CoreStringMatcher => ({
  'case:matcher:type': STRING_MATCHER_TYPE,
  'case:matcher:example': example,
  'case:matcher:resolvesTo': 'string',
});

export const coreBooleanMatcher = (example: boolean): CoreBooleanMatcher => ({
  'case:matcher:type': BOOLEAN_MATCHER_TYPE,
  'case:matcher:example': example,
});

export const coreNullMatcher = (example = null): CoreNullMatcher => ({
  'case:matcher:type': NULL_MATCHER_TYPE,
  'case:matcher:example': example,
});
