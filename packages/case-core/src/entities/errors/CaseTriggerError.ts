import type { DataContext } from '../../entities/context/types';

const locationString = (matchContext: DataContext) =>
  ` (at ${matchContext['_case:currentRun:context:location'].join('.')})`;

export class CaseTriggerError extends Error {
  constructor(message: string, context?: DataContext) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseTriggerError.name;
  }
}
