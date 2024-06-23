/**
 * The log levels available
 * @public
 */
export type LogLevel =
  | 'none'
  | 'error'
  | 'warn'
  | 'debug'
  | 'maintainerDebug'
  | 'deepMaintainerDebug';

/**
 * Describes the logger object
 * @public
 */
export interface Logger {
  /**
   * Something has gone wrong during the execution of the test framework
   */
  error: (message: string, ...additional: unknown[]) => Promise<void>;
  /**
   * It seems likely that there is a misconfiguration
   */
  warn: (message: string, ...additional: unknown[]) => Promise<void>;
  /**
   * Information to help users find out what is happening during their tests
   */
  debug: (message: string, ...additional: unknown[]) => Promise<void>;
  /**
   * Information to help maintainers debug what is happening in the test framework
   */
  maintainerDebug: (message: string, ...additional: unknown[]) => Promise<void>;
  /**
   * Like maintainerDebug, but much deeper - including eg detailled matching docs, etc.
   */
  deepMaintainerDebug: (
    message: string,
    ...additional: unknown[]
  ) => Promise<void>;
}
