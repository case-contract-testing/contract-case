package io.contract_testing.contractcase.client;

public class MaintainerLog {

  private MaintainerLog() {
  }

  public static final String CONTRACT_CASE_JAVA_WRAPPER = "ContractCase Java DSL";

  public static boolean shouldDebug() {
    final String caseConnectorDebug = System.getenv("CASE_CONNECTOR_DEBUG");
    return caseConnectorDebug != null && !caseConnectorDebug.equals("0")
        && !caseConnectorDebug.equalsIgnoreCase("false") && !caseConnectorDebug.equals("");
  }

  public static void log(String s) {
    if (shouldDebug()) {
      System.err.println(Thread.currentThread() + ": " + s);
    }
  }
}
