package io.contract_testing.contractcase.internal.client;

import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.grpc.ContractCaseStream.AvailableContractDefinitions;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BeginVerificationRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractCaseConfig;
import io.contract_testing.contractcase.grpc.ContractCaseStream.LoadPluginRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.PrepareVerificationTests;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RegisterFunction;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RunVerification;
import io.contract_testing.contractcase.grpc.ContractCaseStream.VerificationRequest;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.client.rpc.ConfigHandle;
import io.contract_testing.contractcase.internal.client.rpc.ConnectorOutgoingMapper;
import io.contract_testing.contractcase.internal.client.rpc.RpcForVerification;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import io.contract_testing.contractcase.logs.LogPrinter;
import java.util.Arrays;
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

    this.parentVersions = List.copyOf(parentVersions);
    this.configHandle = new ConfigHandle(boundaryConfig);
    this.rpcConnector = new RpcForVerification(
        logPrinter,
        configHandle,
        callback
    );

    // this is only here because we have to be able to map errors into exceptions
    // probably we should call begin outside the constructor to avoid this issue
    ConnectorResultMapper.map(begin(ConnectorOutgoingMapper.mapConfig(boundaryConfig)));
  }

  public @NotNull ConnectorResult availableContractDescriptions() {
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Fetching available contract descriptions");
    return rpcConnector.executeCallAndWait(
        VerificationRequest.newBuilder()
            .setAvailableContractDefinitions(AvailableContractDefinitions.newBuilder()),
        "availableContractDescriptions"
    );
  }

  public @NotNull ConnectorResult runVerification(ContractCaseConnectorConfig configOverrides) {
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Verification run");
    configHandle.setConnectorConfig(configOverrides);
    var response = rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
        .setRunVerification(
            RunVerification.newBuilder()
                .setConfig(
                    ConnectorOutgoingMapper.mapConfig(configOverrides)
                )
        ), "runVerification", VERIFY_TIMEOUT_SECONDS
    );
    MaintainerLog.log(
        LogLevel.MAINTAINER_DEBUG,
        "Response from verification was: " + response.getResultType()
    );
    return response;
  }

  private ConnectorResult begin(ContractCaseConfig wireConfig) {
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Beginning verification setup");
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
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Close verification invoked by user");
    rpcConnector.close();
  }

  public ConnectorResult loadPlugins(ContractCaseConnectorConfig configOverrides,
      String[] pluginNames) {
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Beginning loadPlugin");
    return rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
            .setLoadPlugin(LoadPluginRequest.newBuilder()
                .addAllModuleNames(
                    Arrays.stream(pluginNames).map(ConnectorOutgoingMapper::map).toList()
                )
                .setConfig(ConnectorOutgoingMapper.mapConfig(configOverrides)))
        , "loadPlugins");
  }

  public ConnectorResult registerFunction(String functionName,
      ConnectorInvokableFunction<?> function) {
    rpcConnector.registerFunction(functionName, function);
    return rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
        .setRegisterFunction(RegisterFunction.newBuilder()
            .setHandle(ConnectorOutgoingMapper.map(functionName))), "registerFunction");
  }

  public ConnectorResult prepareVerification(ContractCaseConnectorConfig configOverrides) {
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Verification run");
    configHandle.setConnectorConfig(configOverrides);
    var response = rpcConnector.executeCallAndWait(VerificationRequest.newBuilder()
        .setPrepareVerificationTests(
            PrepareVerificationTests.newBuilder()
                .setConfig(
                    ConnectorOutgoingMapper.mapConfig(configOverrides)
                )
        ), "prepareVerification", VERIFY_TIMEOUT_SECONDS
    );
    MaintainerLog.log(
        LogLevel.MAINTAINER_DEBUG,
        "Response from verification was: " + response.getResultType()
    );
    return response;
  }
}
