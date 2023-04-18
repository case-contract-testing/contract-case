import chalk from 'chalk';

import { Console } from 'node:console';
import { caseVersion } from '../../entities/caseVersion';
import { shouldLog } from '../../entities/logger/shouldLog';
import { locationString as formatLocationString } from '../../entities/context';
import type { LogLevelContext, Logger } from '../../entities/types';

const stdoutLogger = new Console({ stdout: process.stdout });

const caseVersionString = chalk.whiteBright(`(case@${caseVersion})`);

const locationString = (context: LogLevelContext) =>
  `${chalk.blueBright(formatLocationString(context))}`;

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

export const makeLogger: (context: LogLevelContext) => Logger = (
  matchContext: LogLevelContext
) => ({
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'warn')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.yellowBright(
          `[WARNING]`
        )} ${locationString(matchContext)}: ${chalk.yellowBright(message)}`,
        ...additional
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'error')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.redBright(
          `[ERROR]`
        )} ${locationString(matchContext)}: ${chalk.redBright(message)}`,
        ...additional
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'debug')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.cyan(
          `[DEBUG]`
        )} ${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },
  maintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'maintainerDebug')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.bgBlueBright.black(
          `[MAINTAINER-DEBUG]`
        )} ${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },

  deepMaintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(matchContext, 'deepMaintainerDebug')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.bgMagentaBright.black(
          `[DEEP-MAINTAINER-DEBUG]`
        )} ${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },
});
