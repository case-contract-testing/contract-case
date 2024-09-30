package io.contract_testing.contractcase.client;

public class MaintainerLog {

  private MaintainerLog() {
  }

  public static final String CONTRACT_CASE_JAVA_WRAPPER = "ContractCase Java DSL";
  private static int lineNumber = 0;

  public static boolean shouldDebug() {
    final String caseConnectorDebug = System.getenv("CASE_CONNECTOR_DEBUG");
    return caseConnectorDebug != null && !caseConnectorDebug.equals("0")
        && !caseConnectorDebug.equalsIgnoreCase("false") && !caseConnectorDebug.equals("");
   }

   private synchronized static void syncLog(String s) {
     (Thread.currentThread() + ": " + s).lines().forEach((line) -> {
       System.err.println(lineNumber + ": " +line);
       lineNumber += 1;
     });
   }

  public static void log(String s) {
    if (shouldDebug()) {
      syncLog(s);
    }
  }
}
