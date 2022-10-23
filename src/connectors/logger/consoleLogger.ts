/* eslint-disable no-console */
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';

let currentLogLevel: LogLevel = 'info';

export const logger: Logger = {
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      console.log(`${message}`, ...additional);
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      console.log(`[WARN]: ${message}`, ...additional);
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      console.log(`[ERROR]: ${message}`, ...additional);
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      console.log(`[DEBUG]: ${message}`, ...additional);
    }
  },
  trace(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'trace')) {
      console.log(`[MAINTAINER-DEBUG]: ${message}`, ...additional);
    }
  },
  setLevel: (newLevel) => {
    currentLogLevel = newLevel;
  },
};
