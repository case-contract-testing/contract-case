import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccessWithAny,
  ResultTypeConstants,
} from '@contract-case/case-boundary';

export const mapFailureToJsError = (failure: BoundaryFailure): Error =>
  new Error(failure.message);

export const mapSuccess = (result: BoundaryResult): void => {
  switch (result.resultType) {
    case ResultTypeConstants.RESULT_FAILURE:
      throw mapFailureToJsError(result as BoundaryFailure);
    case ResultTypeConstants.RESULT_SUCCESS:
      return;
    case ResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
    case ResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD:
      throw new Error("TODO: This shouldn't happen");
    default:
      throw new Error(`TODO: unexpected result type ${result.resultType}`);
  }
};

export const mapSuccessWithAny = <T>(result: BoundaryResult): T => {
  switch (result.resultType) {
    case ResultTypeConstants.RESULT_FAILURE:
      throw mapFailureToJsError(result as BoundaryFailure);
    case ResultTypeConstants.RESULT_SUCCESS:
    case ResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD:
      throw new Error("TODO: This shouldn't happen");
    case ResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD:
      return (result as BoundarySuccessWithAny).payload as T;
    default:
      throw new Error(`TODO: unexpected result type ${result.resultType}`);
  }
};
