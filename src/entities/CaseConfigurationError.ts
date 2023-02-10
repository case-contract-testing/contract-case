import type { LoggableContext } from './context/types';

const locationString = (matchContext: LoggableContext) =>
  ` (at ${matchContext['case:currentRun:context:location'].join('.')})`;

export class CaseConfigurationError extends Error {
  constructor(message: string, context?: LoggableContext) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseConfigurationError.name;
  }
}
