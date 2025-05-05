package io.contract_testing.contractcase.internal.client;

import static io.contract_testing.contractcase.internal.client.rpc.ConnectorOutgoingMapper.mapRunInteractionRequest;
import static io.contract_testing.contractcase.internal.client.rpc.ConnectorOutgoingMapper.mapRunRejectingInteractionRequest;

import com.fasterxml.jackson.databind.JsonNode;
import io.contract_testing.contractcase.definitions.matchers.base.AnyMatcher;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BeginDefinitionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractCaseConfig;
import io.contract_testing.contractcase.grpc.ContractCaseStream.DefinitionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.EndDefinitionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.LoadPluginRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.RegisterFunction;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.client.rpc.ConfigHandle;
import io.contract_testing.contractcase.internal.client.rpc.ConnectorOutgoingMapper;
import io.contract_testing.contractcase.internal.client.rpc.RpcForDefinition;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import io.contract_testing.contractcase.logs.LogPrinter;
import java.util.Arrays;
import java.util.List;
import org.jetbrains.annotations.NotNull;

public class InternalDefinerClient {

  private final List<String> parentVersions;

  private final RpcForDefinition rpcConnector;

  private final ConfigHandle configHandle;


  public InternalDefinerClient(final @NotNull ContractCaseConnectorConfig boundaryConfig,
      final @NotNull LogPrinter logPrinter,
      final @NotNull List<String> parentVersions) {
    this.parentVersions = List.copyOf(parentVersions);
    this.configHandle = new ConfigHandle(boundaryConfig);
    this.rpcConnector = new RpcForDefinition(logPrinter, configHandle);

    // this is only here because we have to be able to map errors into exceptions
    // probably we should call begin outside the constructor to avoid this issue
    ConnectorResultMapper.map(begin(ConnectorOutgoingMapper.mapConfig(boundaryConfig)));
  }

  public @NotNull ConnectorResult endRecord() {
    var result = rpcConnector.executeCallAndWait(DefinitionRequest.newBuilder()
        .setEndDefinition(EndDefinitionRequest.newBuilder().build()), "endRecord");
    rpcConnector.close();

    return result;
  }

  public @NotNull ConnectorResult runInteraction(final @NotNull JsonNode definition,
      final ContractCaseConnectorConfig runConfig) {
    configHandle.setConnectorConfig(runConfig);
    return rpcConnector.executeCallAndWait(mapRunInteractionRequest(
        definition,
        runConfig
    ), "runInteraction");
  }

  public @NotNull ConnectorResult runRejectingInteraction(final @NotNull JsonNode definition,
      ContractCaseConnectorConfig runConfig) {
    configHandle.setConnectorConfig(runConfig);
    return rpcConnector.executeCallAndWait(
        mapRunRejectingInteractionRequest(
            definition,
            runConfig
        ), "runRejectingInteraction");
  }

  public @NotNull ConnectorResult stripMatchers(final @NotNull AnyMatcher matcherOrData) {
    // TODO: Implement this
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_CORE_ERROR,
        "stripMatchers not implemented", // TODO
        MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER,
        "UNDOCUMENTED",
        ""
    );
  }

  private ConnectorResult begin(final ContractCaseConfig wireConfig) {
    return rpcConnector.executeCallAndWait(DefinitionRequest.newBuilder()
        .setBeginDefinition(BeginDefinitionRequest.newBuilder()
            .addAllCallerVersions(parentVersions.stream()
                .map(ConnectorOutgoingMapper::map)
                .toList())
            .setConfig(wireConfig)
            .build()), "begin");
  }

  public ConnectorResult loadPlugins(ContractCaseConnectorConfig configOverrides,
      String[] pluginNames) {
    var loadPluginsRequest = LoadPluginRequest.newBuilder()
        .setConfig(ConnectorOutgoingMapper.mapConfig(configOverrides));
    loadPluginsRequest.getModuleNamesList()
        .addAll(Arrays.stream(pluginNames).map(ConnectorOutgoingMapper::map).toList());
    return rpcConnector.executeCallAndWait(DefinitionRequest.newBuilder()
            .setLoadPlugin(loadPluginsRequest)
        , "loadPlugins");
  }

  public ConnectorResult registerFunction(String functionName,
      ConnectorInvokableFunction function) {
    rpcConnector.registerFunction(functionName, function);
    return rpcConnector.executeCallAndWait(DefinitionRequest.newBuilder()
        .setRegisterFunction(RegisterFunction.newBuilder()
            .setHandle(ConnectorOutgoingMapper.map(functionName))), "registerFunction");
  }
}
