import { LogLevelContext } from '../context/types';
import { CaseConfigurationError, CaseCoreError } from '../errors';

import type { LogLevel } from './types';

export const shouldLog = (
  context: LogLevelContext,
  logLevel: LogLevel,
): boolean => {
  switch (context['_case:currentRun:context:logLevel']) {
    case 'none':
      return false;
    case 'error':
      return logLevel === 'error';
    case 'warn':
      return (
        logLevel !== 'deepMaintainerDebug' &&
        logLevel !== 'maintainerDebug' &&
        logLevel !== 'debug'
      );
    case 'debug':
      return (
        logLevel !== 'maintainerDebug' && logLevel !== 'deepMaintainerDebug'
      );
    case 'maintainerDebug':
      return logLevel !== 'deepMaintainerDebug';
    case 'deepMaintainerDebug':
      return true;
    case undefined:
      throw new CaseCoreError(
        `The run context had no log level, but this should never happen. (context[_case:currentRun:context:logLevel] is ${context['_case:currentRun:context:logLevel']})`,
      );
    default:
      throw new CaseConfigurationError(
        `Unknown log level '${context['_case:currentRun:context:logLevel']}'`,
      );
  }
};
