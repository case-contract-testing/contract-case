import type { LoggableContext } from './context/types';
import type { AnyCaseMatcher } from './types';

const locationString = (matchContext: LoggableContext) =>
  `(at ${matchContext['case:currentRun:context:location'].join('.')})`;

export class StripUnsupportedError extends Error {
  constructor(matcher: AnyCaseMatcher, context: LoggableContext) {
    super(
      `Matchers of type '${
        matcher['case:matcher:type']
      }' do not support stripMatchers(). This is an auxillery matcher designed to be used with \`and()\`, and must be combined with a matcher that can be stripped. At: ${locationString(
        context
      )}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = StripUnsupportedError.name;
  }
}
