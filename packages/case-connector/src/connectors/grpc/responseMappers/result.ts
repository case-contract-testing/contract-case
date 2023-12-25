import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccessWithMap,
} from '@contract-case/case-boundary';
import {
  ResultSuccessHasMapPayload as WireResultSuccessHasMapPayload,
  BoundaryResult as WireBoundaryResult,
  ResultFailure as WireResultFailure,
  ResultSuccess as WireResultSuccess,
  ResultSuccessHasAnyPayload as WireResultSuccessHasAnyPayload,
} from '../proto/contract_case_stream_pb';
import { UnreachableError } from '../UnreachableError';
import { makeGrpcStruct, makeGrpcValue } from './json';

export const makeResult = (result: BoundaryResult): WireBoundaryResult => {
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
      const successWithAny = result as BoundarySuccessWithMap;
      return new WireBoundaryResult().setSuccessHasAny(
        new WireResultSuccessHasAnyPayload().setPayload(
          makeGrpcValue(successWithAny.payload),
        ),
      );
    }
    case 'Failure': {
      const failure = result as BoundaryFailure;
      return new WireBoundaryResult().setFailure(
        new WireResultFailure()
          .setKind(failure.kind)
          .setLocation(failure.location)
          .setMessage(failure.message),
      );
    }
    default:
      throw new UnreachableError(result.resultType);
  }
};
