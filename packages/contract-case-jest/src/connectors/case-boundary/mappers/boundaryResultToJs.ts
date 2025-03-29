import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccessWithAny,
  BoundaryFailureKindConstants,
  BoundaryResultTypeConstants,
} from '@contract-case/case-connector/cjs';
import {
  ContractCaseConfigurationError,
  ContractCaseCoreError,
  ContractCaseExpectationsNotMet,
} from '../../../entities/index.js';

export const mapFailureToJsError = (failure: BoundaryFailure): Error => {
  switch (failure.kind) {
    case BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR:
    case BoundaryFailureKindConstants.CASE_TRIGGER_ERROR:
    case BoundaryFailureKindConstants.CASE_BROKER_ERROR:
      return new ContractCaseConfigurationError(
        failure.message,
        failure.location,
      );
    case BoundaryFailureKindConstants.CASE_FAILED_ASSERTION_ERROR:
    case BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR:
      return new ContractCaseExpectationsNotMet(
        failure.message,
        failure.location,
      );
    case BoundaryFailureKindConstants.CASE_CORE_ERROR:
      return new ContractCaseCoreError(failure.message, failure.location);
    default:
      return new ContractCaseCoreError(
        `Unexpected error(${failure.kind}) : ${failure.message}.`,
        failure.location,
      );
  }
};

export const mapSuccess = (result: BoundaryResult): void => {
  switch (result.resultType) {
    case BoundaryResultTypeConstants.RESULT_FAILURE:
      throw mapFailureToJsError(result as BoundaryFailure);
    case BoundaryResultTypeConstants.RESULT_SUCCESS:
      return;
    case BoundaryResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
    case BoundaryResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD:
      throw new Error("TODO: This shouldn't happen");
    default:
      throw new Error(`TODO: unexpected result type ${result.resultType}`);
  }
};

export const mapSuccessWithAny = <T>(result: BoundaryResult): T => {
  switch (result.resultType) {
    case BoundaryResultTypeConstants.RESULT_FAILURE:
      throw mapFailureToJsError(result as BoundaryFailure);
    case BoundaryResultTypeConstants.RESULT_SUCCESS:
    case BoundaryResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
      throw new Error("TODO: This shouldn't happen");
    case BoundaryResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD: {
      try {
        return JSON.parse((result as BoundarySuccessWithAny).payload) as T;
      } catch (e) {
        throw new ContractCaseCoreError(
          `Parse error in boundary success with any: ${(e as Error).message}`,
          'mapSuccessWithAny',
        );
      }
    }
    default:
      throw new Error(`TODO: unexpected result type ${result.resultType}`);
  }
};
