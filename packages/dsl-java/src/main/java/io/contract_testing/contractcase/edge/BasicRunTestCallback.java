package io.contract_testing.contractcase.edge;


import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.client.MaintainerLog;
import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

/**
 * Provides a no-frills test runner that has no knowledge of a test framwork.
 */
public class BasicRunTestCallback implements RunTestCallback {
  private final List<ConnectorFailure> failures = new ArrayList<>();


  @Override
  public @NotNull ConnectorResult runTest(@NotNull String testName,
      @NotNull InvokeCoreTest invoker) {
    // TODO replace this with something that knows about JUnit
    try {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Invoking verifier for: " + testName);
      var result = invoker.verify();

      // TODO: Replace this with something that knows what to do with these results
      if (result.getResultType().equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[SUCCESS] " + testName);
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");

      } else {
        var failure = ((ConnectorFailure) result);
        failures.add(failure);
        var kind = failure.getKind();
        if (kind.equals(ConnectorFailureKindConstants.CASE_CORE_ERROR)) {
          System.err.println(
              BoundaryCrashReporter.CRASH_MESSAGE_START
                  + "\n\n"
                  + failure.getMessage()
                  + "\n"
                  + failure.getLocation()
                  + "\n\n"
                  + BoundaryCrashReporter.CRASH_MESSAGE_END);
        } else if (kind.equals(ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR)) {
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
          MaintainerLog.log(
              LogLevel.MAINTAINER_DEBUG,
              "[CONFIGURATION ERROR] " + failure.getMessage()
          );
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
        } else {
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[OTHER ERROR] " + failure.getMessage());
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
        }
      }
      return result;
    } catch (Exception e) {
      return ConnectorExceptionMapper.map(e);
    }
  }

  @Override
  public @NotNull List<ConnectorFailure> getFailures() {
    return List.copyOf(this.failures);
  }

}
