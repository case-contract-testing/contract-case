/**
 * Convenience class to hold the values for LogLevel so that DSL layers don't need to know the actual value
 */
export class ConfigLogLevelConstants {
  /**
   * Print no logs (note, results may still be printed - see `printResults`)
   */
  static readonly NONE = 'none';

  /**
   * Log when something has gone wrong during the execution of the test framework
   */
  static readonly ERROR = 'error';

  /**
   * Log when it seems likely that there is a misconfiguration, or an error
   */
  static readonly WARN = 'warn';

  /**
   * Log information to help users find out what is happening during their tests (and warnings, and errors)
   */
  static readonly DEBUG = 'debug';

  /**
   * Log debugging information for ContractCase maintainers (and debug, warn and errors)
   */
  static readonly MAINTAINER_DEBUG = 'maintainerDebug';

  /**
   * Log detailed debugging information for ContractCase maintainers (and debug, warn and errors)
   */
  static readonly DEEP_MAINTAINER_DEBUG = 'deepMaintainerDebug';
}
