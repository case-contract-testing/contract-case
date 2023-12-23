import {
  BoundaryFailure,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithMap,
} from '@contract-case/case-boundary';
import { BoundaryResult as WireBoundaryResult } from '../proto/contract_case_stream_pb';
import { ConnectorError } from '../../../domain/errors';
import { UnreachableError } from '../UnreachableError';

export const mapResult = (
  wireBoundaryResult: WireBoundaryResult | undefined,
): BoundaryResult => {
  if (wireBoundaryResult == null) {
    throw new ConnectorError(
      'Log printer response was called with something that returned an undefined wireBoundaryResult',
    );
  }
  const resultType = wireBoundaryResult.getValueCase();
  switch (resultType) {
    case WireBoundaryResult.ValueCase.VALUE_NOT_SET:
      throw new ConnectorError(
        'Log printer response was called with something that returned an unset wireBoundaryResult. This is probably an error in the wrapper library',
      );
    case WireBoundaryResult.ValueCase.SUCCESS:
      return new BoundarySuccess();

    case WireBoundaryResult.ValueCase.SUCCESS_HAS_MAP: {
      const wireWithMap = wireBoundaryResult.getSuccessHasMap();
      if (wireWithMap == null) {
        throw new ConnectorError(
          'undefined wire with map in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      // TOOD: Map this map
      return new BoundarySuccessWithMap(wireWithMap.getMap());
    }
    case WireBoundaryResult.ValueCase.SUCCESS_HAS_ANY: {
      const wireWithAny = wireBoundaryResult.getSuccessHasAny();
      if (wireWithAny == null) {
        throw new ConnectorError(
          'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      // TOOD: Map this object
      return new BoundarySuccessWithMap(wireWithAny.getPayload());
    }
    case WireBoundaryResult.ValueCase.FAILURE: {
      const wireFailure = wireBoundaryResult.getFailure();
      if (wireFailure == null) {
        throw new ConnectorError(
          'undefined wire with any p in a boundary result. This is probably an error in the wrapper library.',
        );
      }
      return new BoundaryFailure(
        wireFailure.getKind(),
        wireFailure.getMessage(),
        wireFailure.getLocation(),
      );
    }
    default:
      throw new UnreachableError(resultType);
  }
};
