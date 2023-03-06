import { httpStatusCodeMatcher } from '../../../entities';
import type { CoreHttpStatusCodeMatcher } from '../../../entities/types';

/**
 * Matches http status codes. Matches may be provided as a string, eg '4XX' or '401', or a number.
 * If an array is provided, any status codes in the array will be matched.
 *
 * @param match
 * @param example
 * @returns
 */
export const httpStatus = (
  match: number | string | Array<number | string>,
  example?: number
): CoreHttpStatusCodeMatcher => {
  if (Array.isArray(match)) {
    return httpStatusCodeMatcher(
      match.map((r) => `${r}`),
      example
    );
  }
  return httpStatusCodeMatcher(`${match}`, example);
};
