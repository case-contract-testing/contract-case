import { BoundaryFailure, BoundaryResult } from '@contract-case/case-boundary';
import {
  BoundaryResult as WireBoundaryResult,
  ResultFailure,
  ResultSuccess,
} from '../proto/contract_case_stream_pb';
import { ConnectorError } from '../../../domain/errors';
import { UnreachableError } from '../UnreachableError';

export const makeResult = (result: BoundaryResult): WireBoundaryResult => {
  switch (result.resultType) {
    case 'Success':
      return new WireBoundaryResult().setSuccess(new ResultSuccess());
    case 'SuccessMap':
      // TODO implement this
      throw new ConnectorError('Not implemented');
    case 'SuccessAny':
      // TODO implement this
      throw new ConnectorError('Not implemented');
    case 'Failure': {
      const failure = result as BoundaryFailure;
      return new WireBoundaryResult().setFailure(
        new ResultFailure()
          .setKind(failure.kind)
          .setLocation(failure.location)
          .setMessage(failure.message),
      );
    }
    default:
      throw new UnreachableError(result.resultType);
  }
};
