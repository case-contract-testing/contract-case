import type { MatchContextData } from 'entities/context/types';

const locationString = (matchContext: MatchContextData) =>
  `(at ${matchContext['case:currentRun:context:location'].join('.')})`;

export class CaseCoreError extends Error {
  constructor(message: string, context?: MatchContextData) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseCoreError.name;
  }
}
