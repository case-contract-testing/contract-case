import { format } from 'pretty-format';

import { caseVersion } from '../../entities/caseVersion';
import { shouldLog } from '../../entities/logger/shouldLog';
import { locationString } from '../../entities/context';
import type { LogLevelContext, Logger } from '../../entities/types';
import { LogPrinter } from './types';

const caseVersionString = `(case@${caseVersion})`;

const timestampString = (): string =>
  new Date().toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h24',
    timeZoneName: 'short', // TODO: Use `shortOffset` when all current node versions support it
    fractionalSecondDigits: 3,
  });

const mapAdditional = (additional: unknown[]) =>
  additional
    .map((value) => format(value, { indent: 2, printBasicPrototype: false }))
    .join('\n');

export const makeLogger: (
  context: LogLevelContext,
  printer: LogPrinter
) => Logger = (matchContext: LogLevelContext, printer) => ({
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'warn')) {
      printer.log(
        'warn',
        timestampString(),
        caseVersionString,
        '[WARNING]',
        locationString(matchContext),
        message,
        mapAdditional(additional)
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'error')) {
      printer.log(
        'error',
        timestampString(),
        caseVersionString,
        '[ERROR]',
        locationString(matchContext),
        message,
        mapAdditional(additional)
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'debug')) {
      printer.log(
        'debug',
        timestampString(),
        caseVersionString,
        '[DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional)
      );
    }
  },
  maintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'maintainerDebug')) {
      printer.log(
        'maintainerDebug',
        timestampString(),
        caseVersionString,
        '[MAINTAINER-DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional)
      );
    }
  },

  deepMaintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'deepMaintainerDebug')) {
      printer.log(
        'deepMaintainerDebug',
        timestampString(),
        caseVersionString,
        '[DEEP-MAINTAINER-DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional)
      );
    }
  },
});
