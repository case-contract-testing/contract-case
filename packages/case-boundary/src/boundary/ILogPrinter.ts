import { BoundaryResult } from './Result';

/**
 * Data class to hold data to print a message error during matching
 */
export interface PrintableMatchError {
  /**
   * The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR". Could be any string.
   */
  readonly kind: string;
  /**
   * A summary of the error. Could be any string.
   */
  readonly message: string;
  /**
   * The location the error happened, for printing at the top of the error message
   */
  readonly location: string;
  /**
   * The tag line for the location the error happened, for printing after the error message. This might have more information than the `location` above.
   */
  readonly locationTag: string;
  /**
   * The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for.
   */
  readonly errorTypeTag: string;
  /**
   * A string representation of the expected data (may contain newlines)
   */
  readonly expected: string;
  /**
   * A string representation of the actual data received (may contain newlines)
   */
  readonly actual: string;
}

/**
 * Data class to hold data to print a message error
 */
export interface PrintableMessageError {
  /**
   * The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR". Could be any string.
   */
  readonly kind: string;
  /**
   * A summary of the error. Could be any string.
   */
  readonly message: string;
  /**
   * The location the error happened, for printing at the top of the error message
   */
  readonly location: string;
  /**
   * The tag line for the location the error happened, for printing after the error message. This might have more information than the `location` above.
   */
  readonly locationTag: string;
  /**
   * The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for.
   */
  readonly errorTypeTag: string;
}

/**
 * Data class to hold data for a test title print line
 */
export interface PrintableTestTitle {
  /**
   * Either 'success' to indicate success, or 'failure' to indicate failure
   */
  readonly kind: string;
  /**
   * An icon for the start of the line (usually a single character emoji, but could be any string)
   */
  readonly icon: string;
  /**
   * The title to print (will not include newlines)
   */
  readonly title: string;
  /**
   * Any additional text to print after the title (may include newlines)
   */
  readonly additionalText: string;
}

export interface IResultPrinter {
  /**
   * Called by ContractCase to ask the DSL to print an individual match error line.
   */
  printMatchError(MatchErrorDescription: PrintableMatchError): BoundaryResult;

  /**
   * Called by ContractCase to ask the DSL to print an error during testing that doesn't have an expected / actual value
   */
  printMessageError(messageErrorDetails: PrintableMessageError): BoundaryResult;

  /**
   * Called by ContractCase to ask the DSL to print a test title or main execution details (eg for contract downloading).
   */
  printTestTitle(titleDetails: PrintableTestTitle): BoundaryResult;
}

/**
 * Implement this interface to give ContractCase a way to print logs in your
 * target language. Most platforms will want to print to standard out, but some
 * might need to log to a file or otherwise collate the logs.
 */
export interface ILogPrinter {
  /**
   * Called by ContractCase to ask the DSL to print a log line. You do not need
   * to filter calls to this interface, it will only be called when it is
   * appropriate to print.
   *
   * @param level - A `LogLevel` string, either `error`, `warn`, `debug`,
   * `maintainerDebug` or `deepMaintainerDebug` Use this to programmatically
   * decide any colour formatting.. (although `none` is a possible log level,
   * this function will never be called with `none`).
   * @param timestamp - The timestamp generated by ContractCase
   * @param version - The version string for ContractCase core
   * @param typeString - A rendered version of the LogLevel. Do not rely on this value programmatically, use the `level` parameter instead.
   * @param location - A string that represents the location that this log came from
   * @param message - The main message of this log line
   * @param additional - Any additional output to print on extra lines (you may want to indent this when printing)
   *
   * @returns A `BoundaryResult` type indicating whether there were errors
   * during printing. Either a BoundarySuccess for no errors, or BoundaryFailure
   * (with error details) in the event of a failure.
   */
  log(
    level: string,
    timestamp: string,
    version: string,
    typeString: string,
    location: string,
    message: string,
    additional: string
  ): BoundaryResult;
}

export interface ICombinedPrinter extends IResultPrinter, ILogPrinter {}
