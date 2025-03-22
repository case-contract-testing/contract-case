package io.contract_testing.contractcase.client;

import io.contract_testing.contractcase.LogLevel;


/**
 * Rough internal logger, in case of needing to debug the Java connector.
 * <p>
 * Only useful for maintainers, and is very noisy, since it logs the connections between the Java
 * wrapper and the core ContractCase server (case-connector).
 * <p>
 * It provides unstructured logging to standard out. Logging is controlled by the environment
 * variable <code>CASE_CONNECTOR_DEBUG</code>, which also controls logging of the case-connector
 * (ie, if you set this, both sides of the connection do additional logging).
 * <p>
 * This logging is unrelated to the logLevel configuration property, and exists because the full
 * configuration is either not yet loaded or not accessible in the wrapper and the connector. It
 * only supports MAINTAINER_DEBUG and DEEP_MAINTAINER_DEBUG.
 * <p>
 * Behaviour (string matching ignores case):
 * <ul>
 *   <li>
 *     <code>CASE_CONNECTOR_DEBUG</code> not set,
 *     or set to 0, "", "none", or "false": No logging (default)
 *   </li>
 *   <li>
 *     <code>CASE_CONNECTOR_DEBUG</code> set to "deep", "deepMaintainer",
 *      "deepMaintainerDebug": Logs EVERYTHING. Extremely noisy.</li>
 *   <li>
 *     <code>CASE_CONNECTOR_DEBUG</code> set to any other value:
 *       Regular maintainer debug. Logs main connection requests and response,
 *       but doesn't log all acknowledgements.
 *   </li>
 * </ul>
 */
public class MaintainerLog {

  private MaintainerLog() {
  }

  /**
   * Name of this package - used in a few places to log where an error came from.
   */
  public static final String CONTRACT_CASE_JAVA_WRAPPER = "ContractCase Java DSL";

  /**
   * Monotonically increasing line number for logs, useful for figuring out what order things were
   * logged in if they're printed out of order (this mostly doesn't happen now the core is stable,
   * but I left it in because it doesn't cost anything)
   */
  private static int lineNumber = 0;

  /**
   * Whether we should print something at the given log level
   * <p>
   * See the {@link MaintainerLog} class documentation for behaviour.
   *
   * @param logLevel the {@link LogLevel} of the message
   * @return true if this message should be logged, false otherwise.
   */
  private static boolean shouldDebug(LogLevel logLevel) {
    final String caseConnectorDebug = System.getenv("CASE_CONNECTOR_DEBUG");
    if (logLevel == LogLevel.NONE || caseConnectorDebug == null || caseConnectorDebug.equals("0")
        || caseConnectorDebug.equals("") || caseConnectorDebug.equalsIgnoreCase("false")) {
      return false;
    }
    if (logLevel == LogLevel.DEEP_MAINTAINER_DEBUG) {
      return caseConnectorDebug.equalsIgnoreCase("deep") || caseConnectorDebug.equalsIgnoreCase(
          "deepMaintainerDebug") || caseConnectorDebug.equalsIgnoreCase("deepMaintainer");
    }
    return logLevel == LogLevel.MAINTAINER_DEBUG;
  }

  /**
   * Log a multi-line message all at once, with the first line listing the thread it came from.
   * @param s the string to log
   */
  private synchronized static void syncLog(String s) {
    (Thread.currentThread() + ": " + s).lines().forEach((line) -> {
      System.err.println("java " + lineNumber + ": " + line);
      lineNumber += 1;
    });
    System.err.flush();
  }

  /**
   * Rough internal logger, in case of needing to debug the Java connector. Only for maintainers,
   * provides unstructured logging to standard out. See {@link MaintainerLog} for behaviour.
   *
   * @param logLevel Should be either MAINTAINER_DEBUG or DEEP_MAINTAINER_DEBUG. Passing any other
   *                 value will result in nothing being logged.
   * @param s The string to (potentially) log
   */
  public static void log(LogLevel logLevel, String s) {
    if (shouldDebug(logLevel)) {
      syncLog(s);
    }
  }
}
