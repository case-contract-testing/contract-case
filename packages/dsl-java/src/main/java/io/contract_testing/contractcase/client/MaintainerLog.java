package io.contract_testing.contractcase.client;

import io.contract_testing.contractcase.LogLevel;

public class MaintainerLog {

  private MaintainerLog() {
  }

  public static final String CONTRACT_CASE_JAVA_WRAPPER = "ContractCase Java DSL";
  private static int lineNumber = 0;

  public static boolean shouldDebug(LogLevel logLevel) {
    final String caseConnectorDebug = System.getenv("CASE_CONNECTOR_DEBUG");
    if (logLevel == LogLevel.NONE || caseConnectorDebug == null || caseConnectorDebug.equals("0")
        || caseConnectorDebug.equals("") || caseConnectorDebug.equalsIgnoreCase("false")) {
      return false;
    }
    if (logLevel == LogLevel.DEEP_MAINTAINER_DEBUG) {
      return caseConnectorDebug.equalsIgnoreCase("deep") || caseConnectorDebug.equalsIgnoreCase(
          "deepMaintainerDebug") || caseConnectorDebug.equalsIgnoreCase("deepMaintainer");
    }
    return true;
  }
  private synchronized static void syncLog(String s) {
    (Thread.currentThread() + ": " + s).lines().forEach((line) -> {
      System.err.println(lineNumber + ": " + line);
      lineNumber += 1;
    });
    System.err.flush();
  }

  public static void log(LogLevel logLevel, String s) {
    if (shouldDebug(logLevel)) {
      syncLog(s);
    }
  }
}
