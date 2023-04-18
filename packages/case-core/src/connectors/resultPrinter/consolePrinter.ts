import chalk from 'chalk';

import { Console } from 'node:console';
import { exampleToNames } from '../../entities/contract';
import { actualToString } from '../../entities/results';
import {
  type MatchingError,
  type CaseError,
  type MatchContext,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_EXECUTION,
  ERROR_TYPE_TEST_RESPONSE,
  type CaseExample,
  type ResultPrinter,
  ERROR_TYPE_RAW_MATCH,
  RawMatchError,
  LogLevelContext,
  DataContext,
} from '../../entities/types';
import { locationString as formatLocationString } from '../../entities/context';

const stdout = new Console({ stdout: process.stdout });

const locationString = (context: LogLevelContext) =>
  `${formatLocationString(context)}`;

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

const locationTitleLine = (location: Array<string>, context: LogLevelContext) =>
  Array.isArray(location) && location.length > 3
    ? ` ${locationString({
        ...context,
        '_case:currentRun:context:location': location.slice(2),
      })}: `
    : '';

const errorTitleLine = (
  title: string,
  error: CaseError,
  context: LogLevelContext
) =>
  spaces(
    6,
    `${chalk.bgRed.white(` ${title} `)} ${chalk.whiteBright(
      locationTitleLine(error.location, context)
    )} ${chalk.whiteBright(error.message)}`
  );

const secondMatchErrorLine = (error: MatchingError | RawMatchError) =>
  spaces(
    9,
    `Expected something like:\n${spaces(
      3,
      chalk.green(actualToString(error.expected, 10))
    )}`
  );

const thirdMatchErrorLine = (error: MatchingError | RawMatchError) =>
  spaces(
    9,
    `Actual:\n${spaces(3, chalk.red(actualToString(error.actual, 10)))}`
  );

const camelToCapital = (camel: string) =>
  camel.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleUpperCase();

const printError = (error: CaseError, context: MatchContext): void => {
  const locationTagLine = () =>
    spaces(
      12,
      `${chalk.gray(
        ` - ${locationString({
          ...context,
          '_case:currentRun:context:location': Array.isArray(error.location)
            ? error.location
            : [],
        })} [${
          'matcher' in error ? error.matcher['_case:matcher:type'] : error.code
        }]`
      )}`
    );

  if (context['_case:currentRun:context:printResults']) {
    switch (error.type) {
      // This is done as one line to prevent it splitting when multiple tests are running
      case ERROR_TYPE_MATCHING:
        stdout.log(
          `${errorTitleLine(
            'MATCHING ERROR',
            error,
            context
          )}\n${secondMatchErrorLine(error)}\n${thirdMatchErrorLine(
            error
          )}\n\n${locationTagLine()}\n\n`
        );
        break;
      case ERROR_TYPE_RAW_MATCH:
        stdout.log(
          `${errorTitleLine(
            'MATCHING ERROR',
            error,
            context
          )}\n${secondMatchErrorLine(error)}\n${thirdMatchErrorLine(
            error
          )}\n\n${locationTagLine()}\n\n`
        );
        break;
      case ERROR_TYPE_EXECUTION:
        stdout.log(
          `${errorTitleLine(
            camelToCapital(error.code),
            error,
            context
          )}\n\n${locationTagLine()}\n\n`
        );
        break;
      case ERROR_TYPE_TEST_RESPONSE:
        stdout.log(
          `${errorTitleLine(
            'ERROR VERIFYING RETURNED OBJECT',
            error,
            context
          )}\n\n${locationTagLine()}\n\n`
        );
        break;
      default:
        stdout.log(
          `${errorTitleLine(
            'ERROR',
            error,
            context
          )}\n\n${locationTagLine()}\n\n`
        );
    }
  }
};

const printFailureTitle = (
  example: CaseExample,
  index: string,
  context: MatchContext
): void => {
  if (context['_case:currentRun:context:printResults']) {
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      spaces(
        3,
        `\n${chalk.red(`✘`)} ${chalk.whiteBright(
          exampleToNames(example, index).mockName
        )}\n   Error details follow:\n`
      )
    );
  }
};

const printSuccessTitle = (
  example: CaseExample,
  index: string,
  context: MatchContext
): void => {
  if (context['_case:currentRun:context:printResults']) {
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      spaces(
        3,
        `\n${chalk.greenBright(`✅`)} ${chalk.whiteBright(
          exampleToNames(example, index).mockName
        )}\n`
      )
    );
  }
};

const printDownloadedContract = (
  filename: string,
  context: DataContext
): void => {
  if (context['_case:currentRun:context:printResults']) {
    // This is done as one line to prevent it splitting when multiple tests are running
    stdout.log(
      spaces(
        3,
        `\n${chalk.greenBright(`📥`)} ${chalk.whiteBright(
          `Downloaded contract ${filename}`
        )}\n`
      )
    );
  }
};

export const resultPrinter: ResultPrinter = {
  printError,
  printFailureTitle,
  printSuccessTitle,
  printDownloadedContract,
};
