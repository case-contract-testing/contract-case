package io.contract_testing.contractcase.internal;


import io.contract_testing.contractcase.configuration.ContractDescription;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.exceptions.ContractCaseExpectationsNotMet;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.ConnectorResultTypeConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorSuccessWithAny;
import java.util.List;

public class ConnectorResultMapper {

  public static void map(ConnectorResult result) {
    final var resultType = result.getResultType();

    if (resultType.equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
      return;
    }
    if (resultType.equals(ConnectorResultTypeConstants.RESULT_FAILURE)) {
      mapFailure((ConnectorFailure) result);
    }
  }

  public static void mapVoid(ConnectorResult result) {
    final var resultType = result.getResultType();

    if (resultType.equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
      return;
    }
    if (resultType.equals(ConnectorResultTypeConstants.RESULT_FAILURE)) {
      mapFailure((ConnectorFailure) result);
    }

    throw new ContractCaseCoreError(
        "Unexpected non-void ConnectorResult type '" + resultType + "'",
        "ConnectorResultMapper.mapVoid",
        ""
    );
  }

  private static void mapFailure(ConnectorFailure result) {
    final var kind = result.getKind();

    switch (kind) {
      case ConnectorFailureKindConstants.CASE_BROKER_ERROR,
          ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
          ConnectorFailureKindConstants.CASE_TRIGGER_ERROR ->
          throw new ContractCaseConfigurationError(
              result.getMessage(),
              result.getLocation(),
              result.getErrorCode(),
              result.getUserFacingStackTrace()
          );
      case ConnectorFailureKindConstants.CASE_CORE_ERROR ->
          throw new ContractCaseCoreError(result.getMessage(),
              result.getLocation(),
              result.getUserFacingStackTrace()
          );
      case ConnectorFailureKindConstants.CASE_FAILED_ASSERTION_ERROR,
          ConnectorFailureKindConstants.CASE_VERIFY_RETURN_ERROR ->
          throw new ContractCaseExpectationsNotMet(result.getMessage(), result.getLocation(),
              result.getUserFacingStackTrace()
          );
    }

    throw new ContractCaseCoreError(
        "Unhandled error kind (" + kind + "): " + result.getMessage(),
        result.getLocation(),
        result.getUserFacingStackTrace()

    );
  }

  public static String mapSuccessWithAny(ConnectorResult result) {
    final var resultType = result.getResultType();
    if (resultType.equals(ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD)) {
      return ((ConnectorSuccessWithAny) result).getPayload();
    }
    if (resultType.equals(ConnectorResultTypeConstants.RESULT_FAILURE)) {
      mapFailure((ConnectorFailure) result);
    }
    throw new ContractCaseCoreError(
        "Unexpected non-void ConnectorResult type '" + resultType + "'"
    );
  }

  public static List<ContractDescription> mapListAvailableContracts(ConnectorResult result) {
    final var availableContracts = mapSuccessWithAny(result);
    // TODO UNIMPLEMENTED implement this
    System.out.println(((ConnectorSuccessWithAny) result).getPayload());
    throw new ContractCaseCoreError(
        "The parsing of the available contracts object hasn't yet been implemented. Object was: "
            + availableContracts
            + ((ConnectorSuccessWithAny) result).getPayload());

  }
}
