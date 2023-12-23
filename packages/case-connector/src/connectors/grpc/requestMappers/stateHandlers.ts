import { BoundaryResult } from '@contract-case/case-boundary';

import { StateHandlerHandle as WireStateHandlerHandle } from '../proto/contract_case_stream_pb';

import { ConnectorStateHandler } from '../../../domain/types';

const makeStateHandlerCall =
  (_handle: WireStateHandlerHandle): (() => Promise<BoundaryResult>) =>
  () =>
    // TODO: Implement this
    Promise.reject(new Error(`Not implemented: ${_handle}`));

export const mapStateHandlers = (
  stateHandlers: WireStateHandlerHandle[],
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [handler.getHandle()]: {
        ...(acc[handler.getHandle()] ? acc[handler.getHandle()] : {}),
        ...(handler.getStage() ===
        WireStateHandlerHandle.Stage.STAGE_SETUP_UNSPECIFIED
          ? { setup: makeStateHandlerCall(handler) }
          : {
              setup: makeStateHandlerCall(handler),
              teardown: makeStateHandlerCall(handler),
            }),
      },
    }),
    {} as Record<string, ConnectorStateHandler>,
  );
