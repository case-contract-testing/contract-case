import chalk from 'chalk';

import { Console } from 'node:console';

interface MatchErrorDescription {
  kind: string;
  message: string;
  location: string;
  expected: string;
  actual: string;
  locationTag: string;
  errorTypeTag: string;
}

interface MessageError {
  kind: string;
  message: string;
  location: string;
  locationTag: string;
  errorTypeTag: string;
}

interface TestTitle {
  kind: string;
  icon: string;
  title: string;
  additionalText: string;
}

const stdout = new Console({ stdout: process.stdout });

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

export const printMatchError = ({
  kind,
  message,
  location,
  expected,
  actual,
  locationTag,
  errorTypeTag,
}: MatchErrorDescription): void => {
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
};

export const printMessageError = ({
  kind,
  location,
  message,
  locationTag,
  errorTypeTag,
}: MessageError): void => {
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
};

export const printTestTitle = ({
  kind,
  icon,
  title,
  additionalText,
}: TestTitle): void => {
  const colourIcon = kind === 'success' ? chalk.greenBright : chalk.red;
  stdout.log(
    spaces(
      3,
      `\n${colourIcon(icon)} ${chalk.whiteBright(title)}\n${additionalText}`
    )
  );
};
