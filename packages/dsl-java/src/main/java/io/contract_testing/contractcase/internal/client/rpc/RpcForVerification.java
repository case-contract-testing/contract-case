package io.contract_testing.contractcase.internal.client.rpc;

import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.logs.LogPrinter;
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc.ContractCaseStub;
import io.contract_testing.contractcase.grpc.ContractCaseStream.InvokeFunction;
import io.contract_testing.contractcase.grpc.ContractCaseStream.InvokeTest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.grpc.ContractCaseStream.VerificationRequest;
import io.grpc.stub.StreamObserver;
import java.util.List;
import org.jetbrains.annotations.NotNull;


public class RpcForVerification extends AbstractRpcConnector<VerificationRequest, VerificationRequest.Builder> {

  public RpcForVerification(
      @NotNull LogPrinter logPrinter,
      @NotNull ConfigHandle configHandle
      ) {
    super(logPrinter, configHandle);
  }

  @Override
  StreamObserver<VerificationRequest> createConnection(ContractCaseStub asyncStub,
      ContractResponseStreamObserver<VerificationRequest, VerificationRequest.Builder> contractResponseStreamObserver) {
    return asyncStub.contractVerification(contractResponseStreamObserver);
  }

  @Override
  VerificationRequest setId(VerificationRequest.Builder builder, StringValue id) {
    return builder.setId(id).build();
  }

  @Override
  VerificationRequest.Builder makeResponse(ResultResponse response) {
    return VerificationRequest
        .newBuilder()
        .setResultResponse(response);
  }

  @Override
  VerificationRequest.Builder makeInvokeTest(StringValue invokerId) {
    return VerificationRequest
        .newBuilder()
        .setInvokeTest(
            InvokeTest.newBuilder().setInvokerId(invokerId)
        );
  }
  @Override
  VerificationRequest.Builder makeInvokeFunction(String name, List<String> args) {
    return VerificationRequest.newBuilder()
        .setInvokeFunction(InvokeFunction.newBuilder()
            .addAllArguments(args.stream().map(ConnectorOutgoingMapper::map).toList())
            .setHandle(ConnectorOutgoingMapper.map(name)));
  }

}

