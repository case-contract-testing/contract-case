import { BoundaryResult } from '@contract-case/case-boundary';

import {
  DefinitionResponse as WireDefinitionResponse,
  RunStateHandlerRequest as WireRunStateHandlerRequest,
  StateHandlerHandle as WireStateHandlerHandle,
} from '../../proto/contract_case_stream_pb';

import { ConnectorStateHandler } from '../../../../domain/types';
import { ExecuteCall } from '../../executeCall';

import {
  waitForResolution,
  makeResolvableId,
} from '../../promiseHandler/promiseHandler';

const makeStateHandlerCall =
  (
    handle: WireStateHandlerHandle,
    executeCall: ExecuteCall,
  ): (() => Promise<BoundaryResult>) =>
  () =>
    waitForResolution(
      makeResolvableId((id: string) =>
        executeCall(
          id,
          new WireDefinitionResponse().setRunStateHandler(
            new WireRunStateHandlerRequest().setStateHandlerHandle(handle),
          ),
        ),
      ),
    );

export const mapStateHandlers = (
  stateHandlers: WireStateHandlerHandle[],
  executeCall: ExecuteCall,
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [handler.getHandle()]: {
        ...(acc[handler.getHandle()] ? acc[handler.getHandle()] : {}),
        ...(handler.getStage() ===
        WireStateHandlerHandle.Stage.STAGE_SETUP_UNSPECIFIED
          ? { setup: makeStateHandlerCall(handler, executeCall) }
          : {
              setup: makeStateHandlerCall(handler, executeCall),
              teardown: makeStateHandlerCall(handler, executeCall),
            }),
      },
    }),
    {} as Record<string, ConnectorStateHandler>,
  );
