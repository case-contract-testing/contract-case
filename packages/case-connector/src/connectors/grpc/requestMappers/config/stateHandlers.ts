import { BoundaryResult } from '@contract-case/case-boundary';

import {
  RunStateHandlerRequest as WireRunStateHandlerRequest,
  StateHandlerHandle as WireStateHandlerHandle,
  ContractResponse as WireContractResponse,
} from '../../proto/contract_case_stream_pb';

import { ConnectorStateHandler } from '../../../../domain/types';

import {
  waitForResolution,
  makeResolvableId,
} from '../../promiseHandler/promiseHandler';
import { unbox } from '../values';
import { SendContractResponse } from '../../sendContractResponse';

const makeStateHandlerCall =
  (
    handle: WireStateHandlerHandle,
    executeCall: SendContractResponse,
  ): (() => Promise<BoundaryResult>) =>
  () =>
    waitForResolution(
      makeResolvableId((id: string) =>
        executeCall(
          id,
          new WireContractResponse().setRunStateHandler(
            new WireRunStateHandlerRequest().setStateHandlerHandle(handle),
          ),
        ),
      ),
    );

export const mapStateHandlers = (
  stateHandlers: WireStateHandlerHandle[],
  executeCall: SendContractResponse,
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [unbox(handler.getHandle())]: {
        ...(acc[unbox(handler.getHandle())]
          ? acc[unbox(handler.getHandle())]
          : {}),
        ...(handler.getStage() ===
        WireStateHandlerHandle.Stage.STAGE_SETUP_UNSPECIFIED
          ? {
              setup: makeStateHandlerCall(handler, executeCall),
              teardown: makeStateHandlerCall(handler, executeCall),
            }
          : {
              setup: makeStateHandlerCall(handler, executeCall),
              teardown: makeStateHandlerCall(handler, executeCall),
            }),
      },
    }),
    {} as Record<string, ConnectorStateHandler>,
  );
