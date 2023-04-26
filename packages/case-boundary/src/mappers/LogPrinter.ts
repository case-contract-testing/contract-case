import { TestPrinter } from '@contract-case/case-core';
import { ILogPrinter, IResultPrinter } from '../boundary';
import { handleVoidResult } from './Result';

export const wrapLogPrinter = (
  externalLogger: ILogPrinter,
  externalPrinter: IResultPrinter
): TestPrinter => ({
  log: (
    level: string,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ) =>
    handleVoidResult(
      externalLogger.log(
        level,
        timestamp,
        version,
        typeString,
        location,
        message,
        additional
      ),
      'CaseCoreError'
    ),

  printMatchError: (details) =>
    handleVoidResult(externalPrinter.printMatchError(details), 'CaseCoreError'),
  printMessageError: (details) =>
    handleVoidResult(
      externalPrinter.printMessageError(details),
      'CaseCoreError'
    ),
  printTestTitle: (details) =>
    handleVoidResult(externalPrinter.printTestTitle(details), 'CaseCoreError'),
});
