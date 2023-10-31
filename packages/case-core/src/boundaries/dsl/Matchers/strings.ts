import {
  CoreStringContainsMatcher,
  STRING_CONTAINS_TYPE,
  AnyCaseMatcher,
  CoreStringPrefixMatcher,
  STRING_PREFIX_TYPE,
  CoreStringSuffixMatcher,
  STRING_SUFFIX_TYPE,
  AnyCaseStringMatcher,
  CoreBase64EncodedMatcher,
  BASE64_ENCODED_TYPE,
  AnyCaseMatcherOrData,
  CoreJsonStringifiedMatcher,
  JSON_STRINGIFIED_TYPE,
} from '@contract-case/case-entities-internal';
import { anyString } from './primitives';

/**
 * Matches any string that contains the given substring.
 *
 * @param substring - The substring that the matcher must contain
 * @param example - An example string that passes this matcher
 */
export const stringContaining = (
  substring: string,
  example: string,
): CoreStringContainsMatcher => ({
  '_case:matcher:type': STRING_CONTAINS_TYPE,
  '_case:matcher:contains': substring,
  '_case:matcher:resolvesTo': 'string',
  '_case:matcher:example': example,
});

/**
 * Matches any string that begins with the given constant string prefix
 *
 * @param prefix - The prefix string. Must be a string and not a matcher
 * @param suffix - An optional string or matcher to match against the suffix
 */
export const stringPrefix = (
  prefix: string,
  suffix: AnyCaseMatcher | string = anyString(),
): CoreStringPrefixMatcher => ({
  '_case:matcher:type': STRING_PREFIX_TYPE,
  '_case:matcher:prefix': prefix,
  '_case:matcher:suffix': suffix,
  '_case:matcher:resolvesTo': 'string',
});

/**
 * Matches any string that ends with the given constant string suffix
 *
 * @param prefix - A string or matcher to match against the prefix. If you don't mind what the prefix is, pass `anyString()`
 * @param suffix - The suffix string. Must be a string and not a matcher
 */
export const stringSuffix = (
  prefix: AnyCaseMatcher | string,
  suffix: string,
): CoreStringSuffixMatcher => ({
  '_case:matcher:type': STRING_SUFFIX_TYPE,
  '_case:matcher:prefix':
    prefix !== undefined ? (prefix as AnyCaseStringMatcher) : anyString(),
  '_case:matcher:suffix': suffix,
  '_case:matcher:resolvesTo': 'string',
});

/**
 * Matches any string that matches a base64 encoded version of the given string or string matcher
 *
 * WARNING: Since many strings are accidentally decodable as base64, this matcher is
 * best combined with a more restrictive string matcher (eg stringifiedJson()).
 *
 * @param child - The string or string matcher to match against
 */
export const encodedStringBase64 = (
  child: AnyCaseStringMatcher,
): CoreBase64EncodedMatcher => ({
  '_case:matcher:type': BASE64_ENCODED_TYPE,
  '_case:matcher:child': child,
  '_case:matcher:resolvesTo': 'string',
});

/**
 * Matches any string that matches a JSON.stringify()ed version of the given object (which may itself contain matchers)
 *
 * @param child - The string or string matcher to match against
 */
export const stringifiedJson = (
  child: AnyCaseMatcherOrData,
): CoreJsonStringifiedMatcher => ({
  '_case:matcher:type': JSON_STRINGIFIED_TYPE,
  '_case:matcher:child': child,
  '_case:matcher:resolvesTo': 'string',
});
