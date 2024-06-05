import { format } from 'pretty-format';

import {
  LogLevelContext,
  Logger,
  shouldLog,
  locationString,
} from '@contract-case/case-plugin-base';
import { caseVersion } from '../../entities/caseVersion';
import { LogPrinter } from './types';

const caseVersionString = (parentVersions: string[] = []) =>
  `(${parentVersions.concat([`ContractCase@${caseVersion}`]).join('->')})`;

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
  printer: LogPrinter,
) => Logger = (matchContext: LogLevelContext, printer) => ({
  warn(message: string, ...additional: unknown[]): Promise<void> {
    if (shouldLog(matchContext, 'warn')) {
      return printer.log(
        'warn',
        timestampString(),
        caseVersionString(),
        '[WARNING]',
        locationString(matchContext),
        message,
        mapAdditional(additional),
      );
    }
    return Promise.resolve();
  },
  error(message: string, ...additional: unknown[]): Promise<void> {
    if (shouldLog(matchContext, 'error')) {
      return printer.log(
        'error',
        timestampString(),
        caseVersionString(),
        '[ERROR]',
        locationString(matchContext),
        message,
        mapAdditional(additional),
      );
    }
    return Promise.resolve();
  },
  debug(message: string, ...additional: unknown[]): Promise<void> {
    if (shouldLog(matchContext, 'debug')) {
      return printer.log(
        'debug',
        timestampString(),
        caseVersionString(),
        '[DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional),
      );
    }
    return Promise.resolve();
  },
  maintainerDebug(message: string, ...additional: unknown[]): Promise<void> {
    if (shouldLog(matchContext, 'maintainerDebug')) {
      return printer.log(
        'maintainerDebug',
        timestampString(),
        caseVersionString(
          matchContext['_case:currentRun:context:parentVersions'],
        ),
        '[MAINTAINER-DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional),
      );
    }
    return Promise.resolve();
  },

  deepMaintainerDebug(
    message: string,
    ...additional: unknown[]
  ): Promise<void> {
    if (shouldLog(matchContext, 'deepMaintainerDebug')) {
      return printer.log(
        'deepMaintainerDebug',
        timestampString(),
        caseVersionString(
          matchContext['_case:currentRun:context:parentVersions'],
        ),
        '[DEEP-MAINTAINER-DEBUG]',
        locationString(matchContext),
        message,
        mapAdditional(additional),
      );
    }
    return Promise.resolve();
  },
});
