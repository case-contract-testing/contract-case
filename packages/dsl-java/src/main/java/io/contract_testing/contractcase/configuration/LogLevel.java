package io.contract_testing.contractcase.configuration;

/**
 * Enum for the log level configuration option
 */
public enum LogLevel {

  /**
   * Print no logs (note, results may still be printed - see the configuration options for
   * printResults
   */
  NONE("none"),

  /**
   * Logs when something has gone wrong during the execution of the test framework
   */
  ERROR("error"),

  /**
   * Logs when it seems likely that there is a misconfiguration
   */
  WARN("warn"),

  /**
   * Logs information to help users find out what is happening during their tests
   */
  DEBUG("debug"),

  /**
   * Logs debugging information for ContractCase maintainers. Take care publishing this publicly, as
   * this level may print your secrets.
   */
  MAINTAINER_DEBUG("maintainerDebug"),

  /**
   * Logs very detailed debugging information for ContractCase maintainers. Take care publishing
   * this publicly, as this level may print your secrets.
   */
  DEEP_MAINTAINER_DEBUG("deepMaintainerDebug");

  private final String level;

  LogLevel(String level) {
    this.level = level;
  }

  public String toString() {
    return this.level;
  }
}
