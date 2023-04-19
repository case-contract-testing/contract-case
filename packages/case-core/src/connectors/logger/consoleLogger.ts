import chalk from 'chalk';
import { format } from 'pretty-format';

import { Console } from 'node:console';
import { caseVersion } from '../../entities/caseVersion';
import { shouldLog } from '../../entities/logger/shouldLog';
import { locationString } from '../../entities/context';
import type { LogLevel, LogLevelContext, Logger } from '../../entities/types';

const stdoutLogger = new Console({ stdout: process.stdout });

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

const defaultPrinter: Printer = {
  log: (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) => {
    let typeColour = chalk.redBright;
    let messageColour = chalk.white;
    if (level === 'warn') {
      typeColour = chalk.yellowBright;
      messageColour = chalk.yellowBright;
    }
    if (level === 'error') {
      typeColour = chalk.redBright;
      messageColour = chalk.redBright;
    }
    if (level === 'debug') {
      typeColour = chalk.cyan;
      messageColour = chalk.cyan;
    }

    if (level === 'maintainerDebug') {
      typeColour = chalk.bgBlueBright.black;
      messageColour = chalk.blueBright;
    }

    if (level === 'deepMaintainerDebug') {
      typeColour = chalk.bgMagentaBright.black;
      messageColour = chalk.magentaBright;
    }

    stdoutLogger.log(
      `${timestamp} ${chalk.whiteBright(version)} ${typeColour(
        typeString
      )} ${chalk.blueBright(location)}: ${messageColour(message)}${
        additional !== '' ? `\n${messageColour(additional)}` : ''
      }`
    );
  },
};

interface Printer {
  log: (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) => void;
}

const mapAdditional = (additional: unknown[]) =>
  additional
    .map((value) => format(value, { indent: 2, printBasicPrototype: false }))
    .join('\n');

export const makeLogger: (
  context: LogLevelContext,
  printer?: Printer
) => Logger = (matchContext: LogLevelContext, printer = defaultPrinter) => ({
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
