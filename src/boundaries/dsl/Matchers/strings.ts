import {
  type CoreStringContainsMatcher,
  STRING_CONTAINS_TYPE,
  type AnyCaseMatcher,
  type CoreStringPrefixMatcher,
  STRING_PREFIX_TYPE,
  type CoreStringSuffixMatcher,
  STRING_SUFFIX_TYPE,
} from '../../../entities/types';
import { anyString } from './primitives';

/**
 * Matches any string that contains the given substring.
 *
 * @param substring The substring that the matcher must contain
 * @param example An example string that passes this matcher
 */
export const stringContaining = (
  substring: string,
  example: string
): CoreStringContainsMatcher => ({
  'case:matcher:type': STRING_CONTAINS_TYPE,
  'case:matcher:contains': substring,
  'case:matcher:resolvesTo': 'string',
  'case:matcher:example': example,
});

/**
 * Matches any string that begins with the given constant string prefix
 *
 * @param prefix The prefix string. Must be a string and not a matcher
 * @param suffix An optional string or matcher to match against the suffix
 */
export const stringPrefix = (
  prefix: string,
  suffix: AnyCaseMatcher | string = anyString()
): CoreStringPrefixMatcher => ({
  'case:matcher:type': STRING_PREFIX_TYPE,
  'case:matcher:prefix': prefix,
  'case:matcher:suffix': suffix,
  'case:matcher:resolvesTo': 'string',
});

/**
 * Matches any string that ends with the given constant string suffix
 *
 * @param prefix A string or matcher to match against the prefix. If you don't mind what the prefix is, pass `anyString()`
 * @param suffix The suffix string. Must be a string and not a matcher
 */
export const stringSuffix = (
  prefix: AnyCaseMatcher | string,
  suffix: string
): CoreStringSuffixMatcher => ({
  'case:matcher:type': STRING_SUFFIX_TYPE,
  'case:matcher:prefix': prefix !== undefined ? prefix : anyString(),
  'case:matcher:suffix': suffix,
  'case:matcher:resolvesTo': 'string',
});
