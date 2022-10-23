/* eslint-disable no-console */
import { caseVersion } from 'caseVersion';
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';
import { Console } from 'node:console';

let currentLogLevel: LogLevel = 'info';

const stdoutLogger = new Console({ stdout: process.stdout });

const caseVersionString = `[case@${caseVersion}]`;

export const logger: Logger = {
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      stdoutLogger.log(`${caseVersionString} ${message}`, ...additional);
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      stdoutLogger.log(
        `${caseVersionString} [WARN]: ${message}`,
        ...additional
      );
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      stdoutLogger.log(
        `${caseVersionString} [ERROR]: ${message}`,
        ...additional
      );
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      stdoutLogger.log(
        `${caseVersionString} [DEBUG]: ${message}`,
        ...additional
      );
    }
  },
  trace(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'trace')) {
      stdoutLogger.log(
        `${caseVersionString} [MAINTAINER-DEBUG]: ${message}`,
        ...additional
      );
    }
  },
  setLevel: (newLevel) => {
    currentLogLevel = newLevel;
  },
};
