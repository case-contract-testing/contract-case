import {
  RunStateHandlerRequest as WireRunStateHandlerRequest,
  StateHandlerHandle as WireStateHandlerHandle,
  ContractResponse as WireContractResponse,
  StateHandlerHandle,
} from '@contract-case/case-connector-proto';
import {
  BoundaryResult,
  BoundaryStateHandler,
} from '../../../../entities/types.js';

import { ConnectorStateHandler } from '../../../../domain/types.js';

import {
  waitForResolution,
  makeResolvableId,
} from '../../promiseHandler/promiseHandler.js';
import { unbox } from '../values.js';
import { SendContractResponse } from '../../sendContractResponse.js';
import { maintainerLog } from '../../../../domain/maintainerLog.js';

const makeStateHandlerCall =
  (
    handle: WireStateHandlerHandle,
    executeCall: SendContractResponse,
  ): (() => Promise<BoundaryResult>) =>
  () =>
    waitForResolution(
      makeResolvableId((id: string) =>
        executeCall(
          'maintainerDebug',
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
): Record<string, ConnectorStateHandler> => {
  maintainerLog(
    'The state handlers are:',
    stateHandlers.map(
      (handler) => `${unbox(handler.getHandle())} (${handler.getStage()})`,
    ),
  );
  return stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [unbox(handler.getHandle())]: {
        ...(handler.getStage() ===
        StateHandlerHandle.Stage.STAGE_SETUP_UNSPECIFIED
          ? { setup: makeStateHandlerCall(handler, executeCall) }
          : { teardown: makeStateHandlerCall(handler, executeCall) }),
        ...(acc[unbox(handler.getHandle())]
          ? acc[unbox(handler.getHandle())]
          : {}),
      } as BoundaryStateHandler,
    }),
    {} as Record<string, ConnectorStateHandler>,
  );
};
