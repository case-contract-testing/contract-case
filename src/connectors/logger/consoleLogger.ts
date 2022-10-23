import { caseVersion } from 'caseVersion';
import chalk from 'chalk';
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';
import { Console } from 'node:console';

let currentLogLevel: LogLevel = 'info';

const stdoutLogger = new Console({ stdout: process.stdout });

const caseVersionString = chalk.green(`[case@${caseVersion}]`);

export const logger: Logger = {
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      stdoutLogger.log(`${caseVersionString} ${message}`, ...additional);
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      stdoutLogger.log(
        `${chalk.yellow(`[WARN]`)}${caseVersionString} ${message}`,
        ...additional
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      stdoutLogger.log(
        `${chalk.red(`[ERROR]`)}${caseVersionString} ${message}`,
        ...additional
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      stdoutLogger.log(
        `${chalk.cyan(`[DEBUG]`)}${caseVersionString} ${message}`,
        ...additional
      );
    }
  },
  trace(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'trace')) {
      stdoutLogger.log(
        `${chalk.bgBlue(`[MAINTAINER-DEBUG]`)}${caseVersionString} ${message}`,
        ...additional
      );
    }
  },
  setLevel: (newLevel) => {
    currentLogLevel = newLevel;
  },
};
