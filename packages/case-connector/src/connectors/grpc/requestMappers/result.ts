import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithMap,
} from '../../../entities/types';
import { BoundaryResult as WireBoundaryResult } from '../proto/contract_case_stream_pb';
import { ConnectorError } from '../../../domain/errors';
import { UnreachableError } from '../UnreachableError';
import { mapJson, mapJsonMap } from './json';
import { unbox } from './values';

export const mapResult = (
  wireBoundaryResult: WireBoundaryResult | undefined,
): BoundaryResult => {
  if (wireBoundaryResult == null) {
    throw new ConnectorError('There was an undefined wireBoundaryResult');
  }
  const resultType = wireBoundaryResult.getValueCase();
  switch (resultType) {
    case WireBoundaryResult.ValueCase.VALUE_NOT_SET:
      throw new ConnectorError('There was an an unset wireBoundaryResult');
    case WireBoundaryResult.ValueCase.SUCCESS:
      return new BoundarySuccess();

    case WireBoundaryResult.ValueCase.SUCCESS_HAS_MAP: {
      const wireWithMap = wireBoundaryResult.getSuccessHasMap();
      if (wireWithMap == null) {
        throw new ConnectorError(
          'undefined wire with map in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      return new BoundarySuccessWithMap(mapJsonMap(wireWithMap.getMap()));
    }
    case WireBoundaryResult.ValueCase.SUCCESS_HAS_ANY: {
      const wireWithAny = wireBoundaryResult.getSuccessHasAny();
      if (wireWithAny == null) {
        throw new ConnectorError(
          'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      return new BoundarySuccessWithMap(mapJson(wireWithAny.getPayload()));
    }
    case WireBoundaryResult.ValueCase.FAILURE: {
      const wireFailure = wireBoundaryResult.getFailure();
      if (wireFailure == null) {
        throw new ConnectorError(
          'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      return new BoundaryFailure(
        unbox(wireFailure.getKind()),
        unbox(wireFailure.getMessage()),
        unbox(wireFailure.getLocation()),
      );
    }
    default:
      throw new UnreachableError(resultType);
  }
};
