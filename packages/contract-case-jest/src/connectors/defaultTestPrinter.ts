import chalk from 'chalk';

import {
  BoundaryResult,
  BoundarySuccess,
  ILogPrinter,
  IResultPrinter,
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
} from '@contract-case/case-boundary';

import { Console } from 'node:console';
import { makeBoundaryFailure } from './case-boundary/mappers/jsErrorToBoundary';

const stdout = new Console({ stdout: process.stdout });

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

const printMatchError = ({
  kind,
  message,
  location,
  expected,
  actual,
  locationTag,
  errorTypeTag,
}: PrintableMatchError): BoundaryResult => {
  try {
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      `${spaces(
        6,
        `${chalk.bgRed.white(` ${kind} `)} ${chalk.whiteBright(
          location
        )} ${chalk.whiteBright(message)}`
      )}\n${spaces(
        9,
        `Expected something like:\n${spaces(3, chalk.green(expected))}`
      )}\n${spaces(
        9,
        `Actual:\n${spaces(3, chalk.red(actual))}\n\n${spaces(
          12,
          `${chalk.gray(` - ${locationTag} [${errorTypeTag}]`)}`
        )}`
      )}\n\n`
    );
  } catch (e) {
    return makeBoundaryFailure(e as Error);
  }
  return new BoundarySuccess();
};

const printMessageError = ({
  kind,
  location,
  message,
  locationTag,
  errorTypeTag,
}: PrintableMessageError): BoundaryResult => {
  try {
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      `${spaces(
        6,
        `${chalk.bgRed.white(` ${kind} `)} ${chalk.whiteBright(
          location
        )} ${chalk.whiteBright(message)}`
      )}\n\n${spaces(
        12,
        `${chalk.gray(` - ${locationTag} [${errorTypeTag}]`)}`
      )}\n\n`
    );
  } catch (e) {
    return makeBoundaryFailure(e as Error);
  }
  return new BoundarySuccess();
};

const printTestTitle = ({
  kind,
  icon,
  title,
  additionalText,
}: PrintableTestTitle): BoundaryResult => {
  try {
    const colourIcon = kind === 'success' ? chalk.greenBright : chalk.red;
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      spaces(
        3,
        `\n${colourIcon(icon)} ${chalk.whiteBright(title)}\n${additionalText}`
      )
    );
    return new BoundarySuccess();
  } catch (e) {
    return makeBoundaryFailure(e as Error);
  }
};

const defaultResultPrinter: IResultPrinter = {
  printMatchError,
  printMessageError,
  printTestTitle,
};

const defaultLogPrinter: ILogPrinter = {
  log: (
    level: string,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) => {
    try {
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
        typeColour = chalk.bgMagentaBright.black;
        messageColour = chalk.magentaBright;
      }

      if (level === 'deepMaintainerDebug') {
        typeColour = chalk.bgBlueBright.black;
        messageColour = chalk.blueBright;
      }

      stdout.log(
        `${timestamp} ${chalk.whiteBright(version)} ${typeColour(
          typeString
        )} ${chalk.blueBright(location)}: ${messageColour(message)}${
          additional !== '' ? `\n${messageColour(additional)}` : ''
        }`
      );
    } catch (e) {
      return makeBoundaryFailure(e as Error);
    }
    return new BoundarySuccess();
  },
};

export const defaultPrinter = {
  ...defaultResultPrinter,
  ...defaultLogPrinter,
};

export const crashPrinter = (start: string, e: Error, end: string): void => {
  stdout.log(chalk.red(`${start}${e.stack}${end}`));
};
