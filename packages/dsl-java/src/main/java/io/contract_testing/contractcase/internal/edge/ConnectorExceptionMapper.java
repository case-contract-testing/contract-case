package io.contract_testing.contractcase.internal.edge;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * Maps exceptions between the internal {@link ConnectorResult} type and java exceptions (and
 * back).
 */
public class ConnectorExceptionMapper {

  public static String stackTraceToString(Throwable e) {
    return Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).collect(
        Collectors.joining("\n"));
  }

  public static ConnectorFailure map(Exception e) {
    var failure = new ConnectorFailure(
        e instanceof ContractCaseConfigurationError
            ? ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR
            : ConnectorFailureKindConstants.CASE_CORE_ERROR
        ,
        e.getMessage(),
        stackTraceToString(e),
        e instanceof ContractCaseConfigurationError
            ? ((ContractCaseConfigurationError) e).getErrorCode()
            : "UNDOCUMENTED"
    );
    if (failure.getResultType() == null) {
      throw new ContractCaseCoreError(
          "Missing a result type - this is almost certainly a threading issue in the Java DSL (both grpc and jsii are not thread safe)");
    }
    return failure;
  }

  public static ConnectorFailure mapAsTriggerFailure(Exception e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_TRIGGER_ERROR,
        "Trigger function failed: " + e.getMessage(),
        stackTraceToString(e),
        e instanceof ContractCaseConfigurationError
            ? ((ContractCaseConfigurationError) e).getErrorCode()
            : "UNDOCUMENTED"
    );
  }

  public static ConnectorFailure mapAsVerifyFailure(Exception e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_VERIFY_RETURN_ERROR,
        "Verification failed: " + e.getMessage(),
        stackTraceToString(e),
        e instanceof ContractCaseConfigurationError
            ? ((ContractCaseConfigurationError) e).getErrorCode()
            : "UNDOCUMENTED"
    );
  }

  public static ConnectorResult mapAsStateFailure(Exception e) {
    return new ConnectorFailure(
        ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
        "State handler failed: " + e.getMessage(),
        stackTraceToString(e),
        e instanceof ContractCaseConfigurationError
            ? ((ContractCaseConfigurationError) e).getErrorCode()
            : "UNDOCUMENTED"
    );
  }
}
