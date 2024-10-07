import {
  ResultSuccessHasMapPayload as WireResultSuccessHasMapPayload,
  BoundaryResult as WireBoundaryResult,
  ResultFailure as WireResultFailure,
  ResultSuccess as WireResultSuccess,
  ResultSuccessHasAnyPayload as WireResultSuccessHasAnyPayload,
  ContractResponse as WireContractResponse,
  ResultResponse as WireResultResponse,
} from '@contract-case/case-connector-proto';
import { UnreachableError } from '../UnreachableError.js';
import { makeGrpcString, makeGrpcStruct } from './json.js';
import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccessWithAny,
  BoundarySuccessWithMap,
} from '../../../entities/types.js';

const makeResult = (result: BoundaryResult): WireBoundaryResult => {
  switch (result.resultType) {
    case 'Success':
      return new WireBoundaryResult().setSuccess(new WireResultSuccess());
    case 'SuccessMap': {
      const successWithMap = result as BoundarySuccessWithMap;
      return new WireBoundaryResult().setSuccessHasMap(
        new WireResultSuccessHasMapPayload().setMap(
          makeGrpcStruct(successWithMap.payload),
        ),
      );
    }
    case 'SuccessAny': {
      const successWithAny = result as BoundarySuccessWithAny;
      return new WireBoundaryResult().setSuccessHasAny(
        new WireResultSuccessHasAnyPayload().setPayload(
          makeGrpcString(successWithAny.payload),
        ),
      );
    }
    case 'Failure': {
      const failure = result as BoundaryFailure;
      return new WireBoundaryResult().setFailure(
        new WireResultFailure()
          .setKind(makeGrpcString(failure.kind))
          .setLocation(makeGrpcString(failure.location))
          .setMessage(makeGrpcString(failure.message)),
      );
    }
    default:
      throw new UnreachableError(result.resultType);
  }
};

export const makeResultResponse = (
  result: BoundaryResult,
): WireContractResponse =>
  new WireContractResponse().setResultResponse(
    new WireResultResponse().setResult(makeResult(result)),
  );
