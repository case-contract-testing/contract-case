import {
  coreNumberMatcher,
  coreIntegerMatcher,
  coreStringMatcher,
} from '../../../entities';
import {
  type CoreAndCombinationMatcher,
  BOOLEAN_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
} from '../../../entities/types';
import { and } from './meta';
import type {
  BooleanMatcher,
  NullMatcher,
  NumberMatcher,
  StringMatcher,
} from './types';
/**
 * Matches any number.
 *
 * When in a JSON match context, this will be following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259) - ie, not NaN or Infinity
 *
 * @param example - An example number
 */
export const anyNumber = (example = 1.1): NumberMatcher => ({
  ...coreNumberMatcher(example),
  '_case:context:matchBy': 'type',
});

/**
 * Matches any integer.
 *
 * @param example - An example integer
 */
export const anyInteger = (example = 1): CoreAndCombinationMatcher =>
  and(coreIntegerMatcher(example), anyNumber(example));

/**
 * Matches any string.
 *
 * @param example - An example string
 */
export const anyString = (example = 'someString'): StringMatcher => ({
  ...coreStringMatcher(example),
  '_case:context:matchBy': 'type',
});

/**
 * Matches any Boolean.
 *
 * @param example - An example boolean
 */
export const anyBoolean = (example = true): BooleanMatcher => ({
  '_case:matcher:type': BOOLEAN_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:context:matchBy': 'type',
  '_case:matcher:resolvesTo': 'boolean',
});

/**
 * Matches any null.
 *
 * You don't actually need this matcher, you can just use the literal `null`
 *
 * @param example - An example null
 */
export const anyNull = (example = null): NullMatcher => ({
  '_case:matcher:type': NULL_MATCHER_TYPE,
  '_case:matcher:example': example,
  '_case:context:matchBy': 'type',
  '_case:matcher:resolvesTo': 'null',
});
