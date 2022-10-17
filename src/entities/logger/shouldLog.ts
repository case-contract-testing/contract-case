import { CaseCoreError } from 'entities/CaseCoreError';
import type { LogLevel } from './types';

export const shouldLog = (
  logLevel: LogLevel,
  logFunction: LogLevel
): boolean => {
  switch (logLevel) {
    case 'error':
      return logFunction === 'error';
    case 'warn':
      return (
        logFunction !== 'trace' &&
        logFunction !== 'debug' &&
        logFunction !== 'info'
      );
    case 'info':
      return logFunction !== 'trace' && logFunction !== 'debug';
    case 'debug':
      return logFunction !== 'trace';
    case 'trace':
      return true;
    default:
      throw new CaseCoreError(`Unknown log level '${logLevel}'`);
  }
};
