import { CaseCoreError, TestPrinter } from '@contract-case/case-core';
import { ILogPrinter, IResultPrinter } from '../boundary';
import { handleVoidResult } from './Result';

export const wrapLogPrinter = (
  externalLogger: ILogPrinter,
  externalPrinter: IResultPrinter,
): TestPrinter => ({
  log: (
    level: string,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string,
  ) =>
    externalLogger
      .log(level, timestamp, version, typeString, location, message, additional)
      .then(
        (result) => handleVoidResult(result, 'CaseCoreError'),
        (error) => {
          throw new CaseCoreError(
            `Error contacting external logger: ${error.message}`,
          );
        },
      ),

  printMatchError: (details) =>
    externalPrinter.printMatchError(details).then(
      (result) => handleVoidResult(result, 'CaseCoreError'),
      (error) => {
        throw new CaseCoreError(
          `Error contacting external match error printer: ${error.message}`,
        );
      },
    ),

  printMessageError: (details) =>
    externalPrinter.printMessageError(details).then(
      (result) => handleVoidResult(result, 'CaseCoreError'),
      (error) => {
        throw new CaseCoreError(
          `Error contacting external message error printer: ${error.message}`,
        );
      },
    ),
  printTestTitle: (details) =>
    externalPrinter.printTestTitle(details).then(
      (result) => handleVoidResult(result, 'CaseCoreError'),
      (error) => {
        throw new CaseCoreError(
          `Error contacting external title printer: ${error.message}`,
        );
      },
    ),
});
