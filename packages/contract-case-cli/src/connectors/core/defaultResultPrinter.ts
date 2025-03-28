import chalk from 'chalk';
import { Console } from 'node:console';

import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
  ResultPrinter,
  LogPrinter,
  LogLevel,
  TestPrinter,
} from '@contract-case/case-core';

const stdout = new Console({ stdout: process.stdout });

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

const printMatchError = async ({
  kind,
  message,
  location,
  expected,
  actual,
  locationTag,
  errorTypeTag,
}: PrintableMatchError): Promise<void> => {
  // This is done as one line to prevent it splitting when multiple tests are running
  stdout.log(
    `${spaces(
      6,
      `${chalk.bgRed.white(` ${kind} `)} ${chalk.whiteBright(
        location,
      )} ${chalk.whiteBright(message)}`,
    )}\n${spaces(
      9,
      `Expected something like:\n${spaces(3, chalk.green(expected))}`,
    )}\n${spaces(
      9,
      `Actual:\n${spaces(3, chalk.red(actual))}\n\n${spaces(
        12,
        `${chalk.gray(` - ${locationTag} [${errorTypeTag}]`)}`,
      )}`,
    )}\n\n`,
  );
};

const printMessageError = async ({
  kind,
  location,
  message,
  locationTag,
  errorTypeTag,
}: PrintableMessageError): Promise<void> => {
  // This is done as one line to prevent it splitting when multiple tests are running
  stdout.log(
    `${spaces(
      6,
      `${chalk.bgRed.white(` ${kind} `)} ${chalk.whiteBright(
        location,
      )} ${chalk.whiteBright(message)}`,
    )}\n\n${spaces(
      12,
      `${chalk.gray(` - ${locationTag} [${errorTypeTag}]`)}`,
    )}\n\n`,
  );
};

const printTestTitle = async ({
  kind,
  icon,
  title,
  additionalText,
}: PrintableTestTitle): Promise<void> => {
  const colourIcon = kind === 'success' ? chalk.greenBright : chalk.red;
  // This is done as one line to prevent it splitting when multiple tests are running
  stdout.log(
    spaces(
      3,
      `\n${colourIcon(icon)} ${chalk.whiteBright(title)}\n${additionalText}`,
    ),
  );
};

const defaultResultPrinter: ResultPrinter = {
  printMatchError,
  printMessageError,
  printTestTitle,
};

const defaultLogPrinter: LogPrinter = {
  log: async (
    level: LogLevel,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string,
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
      typeColour = chalk.bgMagentaBright.black;
      messageColour = chalk.magentaBright;
    }

    if (level === 'deepMaintainerDebug') {
      typeColour = chalk.bgBlueBright.black;
      messageColour = chalk.blueBright;
    }

    stdout.log(
      `${timestamp} ${chalk.whiteBright(version)} ${typeColour(
        typeString,
      )} ${chalk.blueBright(location)}: ${messageColour(message)}${
        additional !== '' ? `\n${messageColour(additional)}` : ''
      }`,
    );
  },
};

export const defaultPrinter: TestPrinter = {
  ...defaultResultPrinter,
  ...defaultLogPrinter,
};
