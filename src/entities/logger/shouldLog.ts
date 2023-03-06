import { CaseConfigurationError, CaseCoreError } from '../../entities';
import type { LogLevelContext } from '../../entities/types';

import type { LogLevel } from './types';

export const shouldLog = (
  context: LogLevelContext,
  logFunction: LogLevel
): boolean => {
  switch (context['case:currentRun:context:logLevel']) {
    case 'none':
      return false;
    case 'error':
      return logFunction === 'error';
    case 'warn':
      return (
        logFunction !== 'deepMaintainerDebug' &&
        logFunction !== 'maintainerDebug' &&
        logFunction !== 'debug'
      );
    case 'debug':
      return (
        logFunction !== 'maintainerDebug' &&
        logFunction !== 'deepMaintainerDebug'
      );
    case 'maintainerDebug':
      return logFunction !== 'deepMaintainerDebug';
    case 'deepMaintainerDebug':
      return true;
    case undefined:
      throw new CaseCoreError(
        `The run context had no log level, but this should never happen. (context[case:currentRun:context:logLevel] is ${context['case:currentRun:context:logLevel']})`
      );
    default:
      throw new CaseConfigurationError(
        `Unknown log level '${context['case:currentRun:context:logLevel']}'`
      );
  }
};
