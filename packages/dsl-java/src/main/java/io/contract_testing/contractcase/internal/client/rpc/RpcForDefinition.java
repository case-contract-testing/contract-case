package io.contract_testing.contractcase.internal.client.rpc;

import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc.ContractCaseStub;
import io.contract_testing.contractcase.grpc.ContractCaseStream.DefinitionRequest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.DefinitionRequest.Builder;
import io.contract_testing.contractcase.grpc.ContractCaseStream.InvokeFunction;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.logs.LogPrinter;
import io.grpc.stub.StreamObserver;
import java.util.List;
import org.jetbrains.annotations.NotNull;

public class RpcForDefinition extends AbstractRpcConnector<DefinitionRequest, Builder> {

  public RpcForDefinition(@NotNull LogPrinter logPrinter,
      ConfigHandle configHandle) {
    super(
        logPrinter,
        configHandle
    );
  }

  @Override
  StreamObserver<DefinitionRequest> createConnection(
      ContractCaseStub asyncStub,
      ContractResponseStreamObserver<DefinitionRequest, DefinitionRequest.Builder> contractResponseStreamObserver
  ) {
    return asyncStub.contractDefinition(contractResponseStreamObserver);
  }

  @Override
  DefinitionRequest setId(Builder builder, StringValue id) {
    return builder.setId(id).build();
  }

  @Override
  DefinitionRequest.Builder makeResponse(ResultResponse response) {
    return DefinitionRequest.newBuilder().setResultResponse(response);
  }

  @Override
  DefinitionRequest.Builder makeInvokeTest(StringValue invokerId) {
    throw new ContractCaseCoreError("makeInvokeTest isn't valid during contract definition");
  }

  @Override
  Builder makeInvokeFunction(String name, List<String> args) {
    return DefinitionRequest.newBuilder()
        .setInvokeFunction(InvokeFunction.newBuilder()
            .addAllArguments(args.stream().map(ConnectorOutgoingMapper::map).toList())
            .setHandle(ConnectorOutgoingMapper.map(name)));
  }
}