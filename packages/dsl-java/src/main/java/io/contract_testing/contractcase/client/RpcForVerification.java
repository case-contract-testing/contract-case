package io.contract_testing.contractcase.client;

import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.LogPrinter;
import io.contract_testing.contractcase.edge.RunTestCallback;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc.ContractCaseStub;
import io.contract_testing.contractcase.grpc.ContractCaseStream.InvokeTest;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.grpc.ContractCaseStream.VerificationRequest;
import io.grpc.stub.StreamObserver;
import org.jetbrains.annotations.NotNull;


class RpcForVerification extends AbstractRpcConnector<VerificationRequest, VerificationRequest.Builder> {

  public RpcForVerification(
      @NotNull LogPrinter logPrinter,
      @NotNull ConfigHandle configHandle,
      @NotNull RunTestCallback callback) {
    super(logPrinter, configHandle, callback);
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


}

