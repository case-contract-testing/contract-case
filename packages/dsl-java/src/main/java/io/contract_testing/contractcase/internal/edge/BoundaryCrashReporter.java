package io.contract_testing.contractcase.internal.edge;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.exceptions.ContractCaseExpectationsNotMet;

/**
 * Used internally to print crash reports. Not part of the exposed interface for users.
 */
public class BoundaryCrashReporter {

  private static final String CRASH_MESSAGE_START = """
      ---------------------------------------------------
      !!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
      ---------------------------------------------------
              
      The ContractCase core has failed in an unexpected
      way. This is almost certainly a bug in ContractCase.
              
      The details are:
      """;

  private volatile static String crashMessageAdvice = """
        
      Please open a bug report here:
      https://github.com/case-contract-testing/case/issues/new
        
      It would be great if you could include:
        
      * What you were doing when it failed
      * The results of re-running with logLevel: "maintainerDebug"
        
      For bonus points and internet karma, a reproducible
      code sample would be very helpful.""";

  private static final String CRASH_MESSAGE_END = """
        
      Sorry about this.
        
      ---------------------------------------------------
      !!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
      ---------------------------------------------------
      """;

  /**
   * Will rethrow the exception, printing a crash report if appropriate
   *
   * @param e the throwable to maybe rethrow
   * @deprecated please use {@link #report(Exception)} instead, and throw the returned result
   */
  @Deprecated()
  public static void handleAndRethrow(Exception e) {
    // This method should not call BoundaryResultMapper
    if (e instanceof ContractCaseConfigurationError) {
      throw (ContractCaseConfigurationError) e;
    } else if (e instanceof ContractCaseExpectationsNotMet) {
      throw (ContractCaseExpectationsNotMet) e;
    }
    printCrashMessage(e);

    throw new ContractCaseCoreError(e);
  }

  /**
   * Returns the exception to throw, printing a crash report if appropriate
   *
   * @param e the throwable to maybe print
   */
  public static RuntimeException report(Exception e) {
    // This method should not call BoundaryResultMapper
    if (e instanceof ContractCaseConfigurationError) {
      return (ContractCaseConfigurationError) e;
    } else if (e instanceof ContractCaseExpectationsNotMet) {
      return (ContractCaseExpectationsNotMet) e;
    }

    printCrashMessage(e);

    if (e instanceof ContractCaseCoreError) {
      return (ContractCaseCoreError) e;
    }
    return new ContractCaseCoreError(e);
  }

  /**
   * Will print a crash report for the given exception.
   *
   * @param e the throwable to print the crash report for
   */
  public static void printCrashMessage(Exception e) {
    if (e instanceof ContractCaseCoreError) {
      System.err.println(
          CRASH_MESSAGE_START
              + "\n\n"
              + e
              + "\n"
              + ((ContractCaseCoreError) e).getLocation()
              + "\n\n"
              + crashMessageAdvice + CRASH_MESSAGE_END);
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
              + crashMessageAdvice + CRASH_MESSAGE_END);
    }
  }

  public static void printFailure(ConnectorFailure failure) {
    System.err.println(
        BoundaryCrashReporter.CRASH_MESSAGE_START
            + "\n\n"
            + failure.getMessage()
            + "\n"
            + failure.getLocation()
            + "\n\n"
            + crashMessageAdvice + BoundaryCrashReporter.CRASH_MESSAGE_END);
  }

  public synchronized static void setAdvice(String caseCrashAdvice) {
    crashMessageAdvice = caseCrashAdvice;
  }
}
