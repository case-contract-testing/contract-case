import {
  LogLevelContext,
  locationString,
  CaseError,
  DataContext,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_RAW_MATCH,
  actualToString,
  ERROR_TYPE_CONFIGURATION,
  ERROR_TYPE_TRIGGER,
  ERROR_TYPE_TEST_RESPONSE,
  ConfigurationError,
  ResultFormatter,
  CaseExample,
} from '@contract-case/case-plugin-base';
import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
  ResultPrinter,
} from './types';
import { resultStringer } from './resultStringer';
import { exampleToNames } from '..';

/**
 * Like the regular ResultPrinter, but returns a string.
 * This is an internal interface to this module- the
 * exposed interface is {@link ResultFormatter}, which has
 * a higher level abstraction.
 */
interface StringingResultPrinter {
  printMatchError(
    MatchErrorDescription: PrintableMatchError,
    context: DataContext,
  ): string;
  printMessageError(
    messageErrorDetails: PrintableMessageError,
    context: DataContext,
  ): string;
  printTestTitle(
    titleDetails: PrintableTestTitle,
    context: DataContext,
  ): string;
}

const locationTitleLine = (
  location: Array<string>,
  context: LogLevelContext,
) =>
  Array.isArray(location) && location.length > 3
    ? ` (at ${locationString({
        ...context,
        '_case:currentRun:context:location': location.slice(2),
      })}) `
    : ' ';

const camelToCapital = (camel: string) =>
  camel.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleUpperCase();

/**
 * This function wraps a result printer so that it still delegates to the
 * original {@link ResultPrinter}, but then returns the result of calling
 * {@link resultStringer} with the same argument.
 *
 * @param printer - the {@link ResultPrinter} to wrap
 * @returns a ResultPrinter that returns strings as described above
 */
const wrapResultPrinter = (printer: ResultPrinter): StringingResultPrinter => ({
  printMatchError: (
    matchErrorDescription: PrintableMatchError,
    context: DataContext,
  ): string => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printMatchError(matchErrorDescription);
    }
    return resultStringer.stringMatchError(matchErrorDescription);
  },
  printMessageError: (
    messageErrorDetails: PrintableMessageError,
    context: DataContext,
  ): string => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printMessageError(messageErrorDetails);
    }

    return resultStringer.stringMessageError(messageErrorDetails);
  },
  printTestTitle: (
    titleDetails: PrintableTestTitle,
    context: DataContext,
  ): string => {
    if (context['_case:currentRun:context:printResults']) {
      printer.printTestTitle(titleDetails);
    }
    return resultStringer.stringTestTitle(titleDetails);
  },
});

const wrapWithAnnotation = (message: string, preamble?: string) =>
  preamble ? `${preamble}:\n${message}` : message;

const makePrintError =
  (unwrappedPrinter: ResultPrinter) =>
  (error: CaseError, context: DataContext): string => {
    const printer = wrapResultPrinter(unwrappedPrinter);
    const locationTag =
      'userFacingStackTrace' in error &&
      typeof error.userFacingStackTrace === 'string' &&
      error.userFacingStackTrace !== ''
        ? error.userFacingStackTrace
        : locationString({
            ...context,
            '_case:currentRun:context:location': Array.isArray(error.location)
              ? error.location
              : [],
          });

    const errorTypeTag =
      'matcher' in error ? error.matcher['_case:matcher:type'] : error.code;

    switch (error.type) {
      case ERROR_TYPE_MATCHING:
      case ERROR_TYPE_RAW_MATCH:
        return printer.printMatchError(
          {
            kind: 'MATCHING ERROR',
            message: error.message,
            location: locationTitleLine(error.location, context),
            expected: wrapWithAnnotation(
              actualToString(error.expected, 10),
              error.annotations?.expected,
            ),
            actual: wrapWithAnnotation(
              actualToString(error.actual, 10),
              error.annotations?.actual,
            ),
            locationTag,
            errorTypeTag,
          },
          context,
        );
      case ERROR_TYPE_CONFIGURATION:
      case ERROR_TYPE_TRIGGER:
        return printer.printMessageError(
          {
            kind: camelToCapital(error.code),
            message: error.message,
            location: locationTitleLine(error.location, context),
            locationTag,
            errorTypeTag,
          },
          context,
        );
      case ERROR_TYPE_TEST_RESPONSE:
        return printer.printMessageError(
          {
            kind: 'ERROR VERIFYING RETURNED OBJECT',
            message: error.message,
            location: locationTitleLine(error.location, context),
            locationTag,
            errorTypeTag,
          },
          context,
        );
      default:
        return printer.printMessageError(
          {
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
          },
          context,
        );
    }
  };

const makePrintFailureTitle = (unwrappedPrinter: ResultPrinter) => {
  const printer = wrapResultPrinter(unwrappedPrinter);
  return (example: CaseExample, index: string, context: DataContext): string =>
    printer.printTestTitle(
      {
        kind: 'failure',
        icon: `✘`,
        title: exampleToNames(example, index).mockName,
        additionalText: '   Error details follow:\n',
      },
      context,
    );
};

const makePrintSuccessTitle = (unwrappedPrinter: ResultPrinter) => {
  const printer = wrapResultPrinter(unwrappedPrinter);
  return (example: CaseExample, index: string, context: DataContext): string =>
    printer.printTestTitle(
      {
        kind: 'success',
        icon: `✅`,
        title: exampleToNames(example, index).mockName,
        additionalText: '',
      },
      context,
    );
};

const makePrintDownloadedContract = (unwrappedPrinter: ResultPrinter) => {
  const printer = wrapResultPrinter(unwrappedPrinter);
  return (filename: string, context: DataContext): string =>
    printer.printTestTitle(
      {
        kind: 'success',
        icon: `📥`,
        title: `Downloaded contract ${filename}`,
        additionalText: '',
      },
      context,
    );
};

export const makeResultFormatter: (p: ResultPrinter) => ResultFormatter = (
  printer,
) => ({
  printError: makePrintError(printer),
  printFailureTitle: makePrintFailureTitle(printer),
  printSuccessTitle: makePrintSuccessTitle(printer),
  printDownloadedContract: makePrintDownloadedContract(printer),
});
