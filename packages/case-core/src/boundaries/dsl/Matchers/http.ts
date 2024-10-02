import {
  CoreHttpStatusCodeMatcher,
  httpStatusCodeMatcher,
  CoreUrlEncodedStringMatcher,
  coreUrlEncodedString,
} from '@contract-case/case-core-plugin-http-dsl';
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

/**
 * Matches http status codes. Matches may be provided as a string, eg '4XX' or '401', or a number.
 * If an array is provided, any status codes in the array will be matched.
 *
 * @param match - the status code to match
 * @param example - optionally, an example to use during the test. If you do not provide one, case uses a code that passes the matcher.
 * @returns
 */
export const httpStatus = (
  match: number | string | Array<number | string>,
  example?: number,
): CoreHttpStatusCodeMatcher => {
  if (Array.isArray(match)) {
    return httpStatusCodeMatcher(
      match.map((r) => `${r}`),
      example,
    );
  }
  return httpStatusCodeMatcher(`${match}`, example);
};

/**
 * Convenience matcher to treat the string as a uri encoded string. Useful in `path` segments.
 *
 * During matching, the actual value is decoded with `decodeUriComponent()` and passed to the child matcher.
 *
 * @param child - Any string matcher or literal string
 */
export const uriEncodedString = (
  child: AnyCaseMatcherOrData,
): CoreUrlEncodedStringMatcher =>
  // TODO: Check here that the child matcher will accept a string
  coreUrlEncodedString(child);
