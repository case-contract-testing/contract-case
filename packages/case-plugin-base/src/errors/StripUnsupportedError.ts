import { AnyCaseMatcher } from '@contract-case/case-plugin-dsl-types';
import type { DataContext } from '../context/types';

const locationString = (matchContext: DataContext) =>
  `(at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * Tried to strip matchers from something that doesn't have an example
 *
 * Throw this during `matcher.strip` execution if `strip` has been called when the
 * results can't be reconciled without an example.
 *
 * @public
 */
export class StripUnsupportedError extends Error {
  constructor(matcher: AnyCaseMatcher, context: DataContext) {
    super(
      `Matchers of type '${
        matcher['_case:matcher:type']
      }' do not support stripMatchers() without an example. This is an auxiliary matcher designed to be used with \`and()\`, and must be combined with a matcher that can be stripped. At: ${locationString(
        context,
      )}`,
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'StripUnsupportedError';
  }
}
