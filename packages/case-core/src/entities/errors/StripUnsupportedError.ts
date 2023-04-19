import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import type { DataContext } from '../../entities/context/types';

const locationString = (matchContext: DataContext) =>
  `(at ${matchContext['_case:currentRun:context:location'].join('.')})`;

export class StripUnsupportedError extends Error {
  constructor(matcher: AnyCaseMatcher, context: DataContext) {
    super(
      `Matchers of type '${
        matcher['_case:matcher:type']
      }' do not support stripMatchers() without an example. This is an auxillery matcher designed to be used with \`and()\`, and must be combined with a matcher that can be stripped. At: ${locationString(
        context
      )}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = StripUnsupportedError.name;
  }
}
