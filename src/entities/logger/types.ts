export type LogLevel = keyof Logger;

export interface Logger {
  /**
   * Something has gone wrong during the execution of the test framework
   */
  error: (message: string, ...additional: unknown[]) => void;
  /**
   * It seems likely that there is a misconfiguration
   */
  warn: (message: string, ...additional: unknown[]) => void;
  /**
   * Information about failed tests and overall test run statistics
   */
  info: (message: string, ...additional: unknown[]) => void;
  /**
   * Information to help users find out what is happening during their tests
   */
  debug: (message: string, ...additional: unknown[]) => void;
  /**
   * Information to help maintainers debug what is happening in the test framework
   */
  maintainerDebug: (message: string, ...additional: unknown[]) => void;

  /**
   * Sets the current log level
   */
  setLevel: (newLevel: LogLevel) => void;
}
