import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
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
import { makeGrpcStruct, makeGrpcValue } from './json.js';
import {
  BoundaryFailure,
  BoundaryResult,
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
          .setKind(new StringValue().setValue(failure.kind))
          .setLocation(new StringValue().setValue(failure.location))
          .setMessage(new StringValue().setValue(failure.message)),
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
