package io.contract_testing.contractcase.client;

import io.contract_testing.contractcase.LogPrinter;
import io.contract_testing.contractcase.edge.ConnectorResult;
import io.contract_testing.contractcase.edge.ContractCaseConnectorConfig;
import io.contract_testing.contractcase.edge.RunTestCallback;
import io.contract_testing.contractcase.grpc.ContractCaseStream.AvailableContractDefinitions;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BeginVerificationRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractCaseConfig;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RunVerification;
import io.contract_testing.contractcase.grpc.ContractCaseStream.VerificationRequest;
import java.util.List;
import org.jetbrains.annotations.NotNull;

public class InternalVerifierClient implements AutoCloseable {

  private final List<String> parentVersions;
  private final RpcForVerification rpcConnector;
  private final ConfigHandle configHandle;

  private static final int VERIFY_TIMEOUT_SECONDS = 60 * 30;

  public InternalVerifierClient(
      ContractCaseConnectorConfig boundaryConfig,
      @NotNull RunTestCallback callback,
      @NotNull LogPrinter logPrinter,
      @NotNull List<String> parentVersions) {

    this.parentVersions = parentVersions;
    this.configHandle = new ConfigHandle(boundaryConfig);
    this.rpcConnector = new RpcForVerification(
        logPrinter,
        configHandle,
        callback
    );

    // this is only here because we have to be able to map errors into exceptions
    // probably we should call begin outside the constructor to avoid this issue
    RpcConnectorResultMapper.map(begin(ConnectorOutgoingMapper.mapConfig(boundaryConfig)));
  }

  public @NotNull ConnectorResult availableContractDescriptions() {
    return rpcConnector.executeCallAndWait(
        VerificationRequest.newBuilder()
            .setAvailableContractDefinitions(AvailableContractDefinitions.newBuilder()),
        "availableContractDescriptions"
    );
  }

  public @NotNull ConnectorResult runVerification(ContractCaseConnectorConfig configOverrides) {
    MaintainerLog.log("Verification run");
    configHandle.setConnectorConfig(configOverrides);
    var response = rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
        .setRunVerification(
            RunVerification.newBuilder()
                .setConfig(
                    ConnectorOutgoingMapper.mapConfig(configOverrides)
                )
        ), "runVerification", VERIFY_TIMEOUT_SECONDS
    );
    MaintainerLog.log("Response from verification was: " + response.getResultType());
    return response;
  }

  private ConnectorResult begin(ContractCaseConfig wireConfig) {
    MaintainerLog.log("Beginning verification setup");
    return rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
        .setBeginVerification(BeginVerificationRequest.newBuilder()
            .addAllCallerVersions(
                parentVersions.stream()
                    .map(ConnectorOutgoingMapper::map)
                    .toList())
            .setConfig(wireConfig)
            .build()), "begin");
  }

  @Override
  public void close() {
    rpcConnector.close();
  }
}
