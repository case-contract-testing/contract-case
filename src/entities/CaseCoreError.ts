import type { LoggableContext } from './context/types';

const locationString = (matchContext: LoggableContext) =>
  `(at ${matchContext['case:run:context:location'].join('.')})`;

export class CaseCoreError extends Error {
  constructor(message: string, context?: LoggableContext) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseCoreError.name;
  }
}
