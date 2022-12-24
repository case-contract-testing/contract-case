import { caseVersion } from 'caseVersion';
import chalk from 'chalk';
import { locationString as formatLocationString } from 'entities/context';
import type { LoggableContext } from 'entities/context/types';
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';
import { Console } from 'node:console';

let currentLogLevel: LogLevel = 'info';

const stdoutLogger = new Console({ stdout: process.stdout });

const caseVersionString = chalk.whiteBright(`(case@${caseVersion})`);

const locationString = (context: LoggableContext) =>
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
    timeZoneName: 'shortOffset',
    fractionalSecondDigits: 3,
  });

export const makeLogger: (context: LoggableContext) => Logger = (
  matchContext: LoggableContext
) => ({
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${locationString(
          matchContext
        )}: ${message}`,
        ...additional
      );
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.yellowBright(
          `[WARNING]`
        )} ${locationString(matchContext)}: ${chalk.yellowBright(message)}`,
        ...additional
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.redBright(
          `[ERROR]`
        )} ${locationString(matchContext)}: ${chalk.redBright(message)}`,
        ...additional
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.cyan(
          `[DEBUG]`
        )} ${locationString(matchContext)}: ${message}`,
        ...additional
      );
    }
  },
  maintainerDebug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'maintainerDebug')) {
      stdoutLogger.log(
        `${timestampString()} ${caseVersionString} ${chalk.bgBlueBright(
          `[MAINTAINER-DEBUG]`
        )} ${locationString(matchContext)}: ${message}`,
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
