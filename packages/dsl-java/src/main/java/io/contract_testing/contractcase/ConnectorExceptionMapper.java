package io.contract_testing.contractcase;

import io.contract_testing.contractcase.edge.ConnectorFailure;
import io.contract_testing.contractcase.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.edge.ConnectorResult;
import java.util.Arrays;
import java.util.stream.Collectors;

class ConnectorExceptionMapper {

  static String stackTraceToString(Throwable e) {
    return Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).collect(
        Collectors.joining("\n"));
  }

  static ConnectorFailure map(Throwable e) {
    var failure = new ConnectorFailure(
        e.getClass().getName(),
        e.getMessage(),
        stackTraceToString(e)
    );
    if (failure.getResultType() == null) {
      throw new ContractCaseCoreError(
          "Missing a result type - this is almost certainly a threading issue in the Java DSL (both grpc and jsii are not thread safe)");
    }
    return failure;
  }

  static ConnectorFailure mapAsTriggerFailure(Throwable e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_TRIGGER_ERROR,
        "Trigger function failed: " + e.getMessage(),
        stackTraceToString(e)
    );
  }

  static ConnectorFailure mapAsVerifyFailure(Throwable e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_VERIFY_RETURN_ERROR,
        "Verification failed: " + e.getMessage(),
        stackTraceToString(e)
    );
  }

  static ConnectorResult mapAsStateFailure(Throwable e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
        "State handler failed: " + e.getMessage(),
        stackTraceToString(e)
    );
  }
}
