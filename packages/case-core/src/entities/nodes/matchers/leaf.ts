import {
  CoreBooleanMatcher,
  CoreNullMatcher,
  CoreNumberMatcher,
  CoreStringMatcher,
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  INTEGER_MATCH_TYPE,
  CoreIntegerMatch,
} from './types';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 *
 * @param example - Any floating point number, not infinity, not NaN.
 * @returns
 */
export const coreNumberMatcher = (example: number): CoreNumberMatcher => ({
  '_case:matcher:type': NUMBER_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:matcher:resolvesTo': 'number',
});

export const coreIntegerMatcher = (example: number): CoreIntegerMatch => ({
  '_case:matcher:type': INTEGER_MATCH_TYPE,
  '_case:matcher:example': example,
  '_case:matcher:resolvesTo': 'number',
});

export const coreStringMatcher = (example: string): CoreStringMatcher => ({
  '_case:matcher:type': STRING_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:matcher:resolvesTo': 'string',
});

export const coreBooleanMatcher = (example: boolean): CoreBooleanMatcher => ({
  '_case:matcher:type': BOOLEAN_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:matcher:resolvesTo': 'boolean',
});

export const coreNullMatcher = (example = null): CoreNullMatcher => ({
  '_case:matcher:type': NULL_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:matcher:resolvesTo': 'null',
});
