/* eslint-disable no-console */
import { shouldLog } from 'entities/logger/shouldLog';
import type { Logger, LogLevel } from 'entities/logger/types';

let currentLogLevel: LogLevel = 'info';

export const logger: Logger = {
  info(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'info')) {
      console.log(message, ...additional);
    }
  },
  warn(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'warn')) {
      console.log(message, ...additional);
    }
  },
  error(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'error')) {
      console.log(message, ...additional);
    }
  },
  debug(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'debug')) {
      console.log(message, ...additional);
    }
  },
  trace(message: string, ...additional: unknown[]): void {
    if (shouldLog(currentLogLevel, 'trace')) {
      console.log(message, ...additional);
    }
  },
  setLevel: (newLevel) => {
    currentLogLevel = newLevel;
  },
};
