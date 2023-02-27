import chalk from 'chalk';
import { locationString as formatLocationString } from 'entities/context';
import type { HasLocation } from 'entities/context/types';
import { exampleToNames } from 'entities/contract';
import type { CaseExample } from 'entities/contract/types';
import { actualToString } from 'entities/results/renderActual';
import {
  ERROR_TYPE_MATCHING,
  ExecutionError,
  MatchContext,
  CaseError,
  ResultPrinter,
  MatchingError,
  ERROR_TYPE_EXECUTION,
  ERROR_TYPE_VERIFICATION,
} from 'entities/types';
import { Console } from 'node:console';

const stdout = new Console({ stdout: process.stdout });

const locationString = (context: HasLocation) =>
  `${formatLocationString(context)}`;

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

const errorTitleLine = (title: string, message: string) =>
  spaces(
    6,
    `${chalk.bgRed.white(` ${title} `)}: ${chalk.whiteBright(message)}`
  );

const secondMatchErrorLine = (error: MatchingError) =>
  spaces(
    9,
    `Expected something like:\n${spaces(
      3,
      chalk.green(actualToString(error.expected, 10))
    )}`
  );

const thirdMatchErrorLine = (error: MatchingError) =>
  spaces(
    9,
    `Actual:\n${spaces(3, chalk.red(actualToString(error.actual, 10)))}`
  );

const locationLine = (error: CaseError | ExecutionError) =>
  spaces(
    12,
    `${chalk.gray(
      ` - ${locationString({
        'case:currentRun:context:location': error.location,
      })} [${
        'matcher' in error ? error.matcher['case:matcher:type'] : error.code
      }]`
    )}`
  );

const printError = (error: CaseError, context: MatchContext): void => {
  if (context['case:currentRun:context:printResults']) {
    switch (error.type) {
      case ERROR_TYPE_MATCHING:
        // This is done as one line to prevent it splitting when multiple tests are running
        stdout.log(
          `${errorTitleLine(
            'MATCHING ERROR',
            error.message
          )}\n${secondMatchErrorLine(error)}\n${thirdMatchErrorLine(
            error
          )}\n\n${locationLine(error)}\n\n`
        );
        break;
      case ERROR_TYPE_EXECUTION:
        stdout.log(
          `${errorTitleLine('EXECUTION RROR', error.message)}\n\n${locationLine(
            error
          )}\n\n`
        );
        break;
      case ERROR_TYPE_VERIFICATION:
        stdout.log(
          `${errorTitleLine(
            'ERROR VERIFYING RETURNED OBJECT',
            error.message
          )}\n\n${locationLine(error)}\n\n`
        );
        break;
      default:
        stdout.log(
          `${errorTitleLine(
            'ERROR',
            (error as Error).message
          )}\n\n${locationLine(error)}\n\n`
        );
    }
  }
};

const printFailureTitle = (
  example: CaseExample,
  index: string,
  context: MatchContext
): void => {
  if (context['case:currentRun:context:printResults']) {
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
  if (context['case:currentRun:context:printResults']) {
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

export const resultPrinter: ResultPrinter = {
  printError,
  printFailureTitle,
  printSuccessTitle,
};
