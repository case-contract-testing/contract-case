import { caseVersion } from 'caseVersion';
import chalk from 'chalk';
import type { LoggableContext } from 'entities/context/types';
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';
import { Console } from 'node:console';

let currentLogLevel: LogLevel = 'info';

const stdoutLogger = new Console({ stdout: process.stdout });

const caseVersionString = chalk.green(`case@${caseVersion} `);

const locationString = (matchContext: LoggableContext) =>
  matchContext['case:currentRun:context:location'].join('.');

export const makeLogger: (context: LoggableContext) => Logger = (
  matchContext: LoggableContext
) => ({
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      stdoutLogger.log(
        `${caseVersionString}${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      stdoutLogger.log(
        `${chalk.yellow(`[WARN]`)}${caseVersionString}${locationString(
          matchContext
        )}: ${message}`,
        ...additional
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      stdoutLogger.log(
        `${chalk.red(`[ERROR]`)}${caseVersionString}${locationString(
          matchContext
        )}: ${message}`,
        ...additional
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      stdoutLogger.log(
        `${chalk.cyan(`[DEBUG]`)}${caseVersionString}${locationString(
          matchContext
        )}: ${message}`,
        ...additional
      );
    }
  },
  maintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'maintainerDebug')) {
      stdoutLogger.log(
        `${chalk.bgBlue(
          `[MAINTAINER-DEBUG]`
        )}${caseVersionString}${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },
  setLevel: (newLevel) => {
    currentLogLevel = newLevel;
  },
});

export const loggerWithoutContext = makeLogger({
  'case:currentRun:context:location': ['initialising contract'],
});
