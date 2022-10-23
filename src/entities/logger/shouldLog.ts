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
        logFunction !== 'maintainerDebug' &&
        logFunction !== 'debug' &&
        logFunction !== 'info'
      );
    case 'info':
      return logFunction !== 'maintainerDebug' && logFunction !== 'debug';
    case 'debug':
      return logFunction !== 'maintainerDebug';
    case 'maintainerDebug':
      return true;
    default:
      throw new CaseCoreError(`Unknown log level '${logLevel}'`);
  }
};
