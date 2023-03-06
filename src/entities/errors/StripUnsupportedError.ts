import type { MatchContextData } from '../../entities/context/types';
import type { AnyCaseMatcher } from '../../entities/types';

const locationString = (matchContext: MatchContextData) =>
  `(at ${matchContext['case:currentRun:context:location'].join('.')})`;

export class StripUnsupportedError extends Error {
  constructor(matcher: AnyCaseMatcher, context: MatchContextData) {
    super(
      `Matchers of type '${
        matcher['case:matcher:type']
      }' do not support stripMatchers() without an example. This is an auxillery matcher designed to be used with \`and()\`, and must be combined with a matcher that can be stripped. At: ${locationString(
        context
      )}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = StripUnsupportedError.name;
  }
}
