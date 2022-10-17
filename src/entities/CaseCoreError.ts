import type { MatchContext } from './context/types';

export class CaseCoreError extends Error {
  constructor(message: string, context?: MatchContext) {
    super(`${message}${context ? context['case:context:location'] : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseCoreError.name;
  }
}
