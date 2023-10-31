import { exampleToNames } from '../../entities/contract';
import { actualToString } from '../../entities/results';
import {
  type CaseError,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_CONFIGURATION,
  ERROR_TYPE_TEST_RESPONSE,
  type CaseExample,
  type ResultFormatter,
  ERROR_TYPE_RAW_MATCH,
  LogLevelContext,
  DataContext,
  ERROR_TYPE_TRIGGER,
  ConfigurationError,
} from '../../entities/types';
import { locationString } from '../../entities/context';
import { ResultPrinter } from './types';

const locationTitleLine = (
  location: Array<string>,
  context: LogLevelContext,
) =>
  Array.isArray(location) && location.length > 3
    ? ` ${locationString({
        ...context,
        '_case:currentRun:context:location': location.slice(2),
      })}: `
    : '';

const camelToCapital = (camel: string) =>
  camel.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleUpperCase();

const makePrintError =
  (printer: ResultPrinter) =>
  (error: CaseError, context: DataContext): void => {
    const locationTag = locationString({
      ...context,
      '_case:currentRun:context:location': Array.isArray(error.location)
        ? error.location
        : [],
    });

    const errorTypeTag =
      'matcher' in error ? error.matcher['_case:matcher:type'] : error.code;

    if (context['_case:currentRun:context:printResults']) {
      switch (error.type) {
        case ERROR_TYPE_MATCHING:
        case ERROR_TYPE_RAW_MATCH:
          printer.printMatchError({
            kind: 'MATCHING ERROR',
            message: error.message,
            location: locationTitleLine(error.location, context),
            expected: actualToString(error.expected, 10),
            actual: actualToString(error.actual, 10),
            locationTag,
            errorTypeTag,
          });

          break;
        case ERROR_TYPE_CONFIGURATION:
        case ERROR_TYPE_TRIGGER:
          printer.printMessageError({
            kind: camelToCapital(error.code),
            message: error.message,
            location: locationTitleLine(error.location, context),
            locationTag,
            errorTypeTag,
          });
          break;
        case ERROR_TYPE_TEST_RESPONSE:
          printer.printMessageError({
            kind: 'ERROR VERIFYING RETURNED OBJECT',
            message: error.message,
            location: locationTitleLine(error.location, context),
            locationTag,
            errorTypeTag,
          });
          break;
        default:
          printer.printMessageError({
            kind: 'ERROR',
            message: (error as Error).message,
            location:
              'location' in error &&
              Array.isArray((error as ConfigurationError).location)
                ? locationTitleLine(
                    (error as ConfigurationError).location,
                    context,
                  )
                : locationTitleLine([], context),
            locationTag,
            errorTypeTag,
          });
      }
    }
  };

const makePrintFailureTitle =
  (printer: ResultPrinter) =>
  (example: CaseExample, index: string, context: DataContext): void => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printTestTitle({
        kind: 'failure',
        icon: `✘`,
        title: exampleToNames(example, index).mockName,
        additionalText: '   Error details follow:\n',
      });
    }
  };

const makePrintSuccessTitle =
  (printer: ResultPrinter) =>
  (example: CaseExample, index: string, context: DataContext): void => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printTestTitle({
        kind: 'success',
        icon: `✅`,
        title: exampleToNames(example, index).mockName,
        additionalText: '',
      });
    }
  };

const makePrintDownloadedContract =
  (printer: ResultPrinter) =>
  (filename: string, context: DataContext): void => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printTestTitle({
        kind: 'success',
        icon: `📥`,
        title: `Downloaded contract ${filename}`,
        additionalText: '',
      });
    }
  };

export const makeResultFormatter: (p: ResultPrinter) => ResultFormatter = (
  printer,
) => ({
  printError: makePrintError(printer),
  printFailureTitle: makePrintFailureTitle(printer),
  printSuccessTitle: makePrintSuccessTitle(printer),
  printDownloadedContract: makePrintDownloadedContract(printer),
});
