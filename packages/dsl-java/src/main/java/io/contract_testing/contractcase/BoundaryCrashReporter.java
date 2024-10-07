package io.contract_testing.contractcase;

public class BoundaryCrashReporter {

  static final String CRASH_MESSAGE_START = """
      ---------------------------------------------------
      !!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
      ---------------------------------------------------
              
      The ContractCase core has failed in an unexpected
      way. This is almost certainly a bug in ContractCase.
              
      The details are:
      """;

  static final String CRASH_MESSAGE_END = """
        
      Please open a bug report here:
      https://github.com/case-contract-testing/case/issues/new
        
      It would be great if you could include:
        
      * What you were doing when it failed
      * The results of re-running with logLevel: "maintainerDebug"
        
      For bonus points and internet karma, a reproducible\s
      code sample would be very helpful.
        
      Sorry about this.
        
      ---------------------------------------------------
      !!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
      ---------------------------------------------------
      """;

  public static void handleAndRethrow(Throwable e) {
    // This method should not call BoundaryResultMapper
    if (e instanceof ContractCaseConfigurationError) {
      throw (ContractCaseConfigurationError) e;
    } else if (e instanceof ContractCaseExpectationsNotMet) {
      throw (ContractCaseExpectationsNotMet) e;
    }
    printCrashMessage(e);

    throw new ContractCaseCoreError(e);
  }

  public static void printCrashMessage(Throwable e) {
    if (e instanceof ContractCaseCoreError) {
      System.err.println(
          CRASH_MESSAGE_START
              + "\n\n"
              + e
              + "\n"
              + ((ContractCaseCoreError) e).getLocation()
              + "\n\n"
              + CRASH_MESSAGE_END);
    } else {
      System.err.println(
          CRASH_MESSAGE_START
              + "\n\n"
              + e.toString()
              + "\n"
              + ConnectorExceptionMapper.stackTraceToString(e)
              + (e.getCause() != null ? "Caused by: " + e.getCause().toString() + "\n"
              + ConnectorExceptionMapper.stackTraceToString(e.getCause()) : "")
              + "\n\n"
              + CRASH_MESSAGE_END);
    }
  }

}
