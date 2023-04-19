import { LogPrinter } from '@contract-case/case-core';
import { ILogPrinter } from '../boundary';
import { handleVoidResult } from './Result';

export const wrapLogPrinter = (printer: ILogPrinter): LogPrinter => ({
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
      printer.log(
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
});
