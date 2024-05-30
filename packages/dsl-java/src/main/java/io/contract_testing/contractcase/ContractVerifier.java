package io.contract_testing.contractcase;

import static io.contract_testing.contractcase.BoundaryCrashReporter.CRASH_MESSAGE_END;
import static io.contract_testing.contractcase.BoundaryCrashReporter.CRASH_MESSAGE_START;

import io.contract_testing.contractcase.client.InternalVerifierClient;
import io.contract_testing.contractcase.client.MaintainerLog;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.edge.ConnectorFailure;
import io.contract_testing.contractcase.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.edge.ConnectorResult;
import io.contract_testing.contractcase.edge.ConnectorResultTypeConstants;
import io.contract_testing.contractcase.edge.InvokeCoreTest;
import io.contract_testing.contractcase.edge.RunTestCallback;
import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

public class ContractVerifier implements AutoCloseable {

  private final InternalVerifierClient verifier;

  private final List<ConnectorFailure> failures = new ArrayList<>();

  public ContractVerifier(ContractCaseConfig config) {
    LogPrinter logPrinter = new LogPrinter();
    ContractCaseProcess.getInstance().start();

    InternalVerifierClient verification = null;
    try {
      verification = new InternalVerifierClient(
          ConnectorConfigMapper.map(config, "VERIFICATION"),
          // TODO: Move the runTestCallback into the internals, maybe?
          new RunTestCallback() {
            @Override
            public @NotNull ConnectorResult runTest(@NotNull String testName,
                @NotNull InvokeCoreTest invoker) {
              // TODO replace this with something that knows about JUnit
              try {
                MaintainerLog.log("Invoking verifier for: " + testName);
                var result = invoker.verify();

                // TODO: Replace this with something that knows what to do with these results
                if (result.getResultType().equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
                  MaintainerLog.log("");
                  MaintainerLog.log("[SUCCESS] " + testName);
                  MaintainerLog.log("");

                } else {
                  var failure = ((ConnectorFailure) result);
                  failures.add(failure);
                  var kind = failure.getKind();
                  if (kind.equals(ConnectorFailureKindConstants.CASE_CORE_ERROR)) {
                    System.err.println(
                        CRASH_MESSAGE_START
                            + "\n\n"
                            + failure.getMessage()
                            + "\n"
                            + failure.getLocation()
                            + "\n\n"
                            + CRASH_MESSAGE_END);
                  } else if (kind.equals(ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR)) {
                    MaintainerLog.log("");
                    MaintainerLog.log("[CONFIGURATION ERROR] " + failure.getMessage());
                    MaintainerLog.log("");
                  } else {
                    MaintainerLog.log("");
                    MaintainerLog.log("[OTHER ERROR] " + failure.getMessage());
                    MaintainerLog.log("");
                  }
                }
                return result;
              } catch (Exception e) {
                return ConnectorExceptionMapper.map(e);
              }
            }

          }, logPrinter, new BoundaryVersionGenerator().getVersions()
      );
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    this.verifier = verification;
  }

  public List<ContractDescription> availableContractDescriptions() {
    try {
      return ConnectorResultMapper.mapListAvailableContracts(this.verifier.availableContractDescriptions());
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
      // This is actually unreachable, since the above method always throws
      return List.of();
    }
  }

  public void runVerification(ContractCaseConfig configOverrides) {
    try {
      ConnectorResultMapper.mapVoid(this.verifier.runVerification(
          ConnectorConfigMapper.map(configOverrides, "VERIFICATION")));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    if (!failures.isEmpty()) {
      try {
        ConnectorResultMapper.mapVoid(ConnectorResult.toConnectorResult(failures.get(0)));
      } catch (Throwable e) {
        BoundaryCrashReporter.handleAndRethrow(e);
      }

    }
  }

  @Override
  public void close() {
    verifier.close();
  }
}
