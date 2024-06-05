import {
  CoreNumberMatcher,
  NUMBER_MATCHER_TYPE,
  CoreIntegerMatcher,
  INTEGER_MATCH_TYPE,
  CoreStringMatcher,
  STRING_MATCHER_TYPE,
  CoreBooleanMatcher,
  BOOLEAN_MATCHER_TYPE,
  CoreNullMatcher,
  NULL_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';

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

export const coreIntegerMatcher = (example: number): CoreIntegerMatcher => ({
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
