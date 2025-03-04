import {
  RunStateHandlerRequest as WireRunStateHandlerRequest,
  StateHandlerHandle as WireStateHandlerHandle,
  ContractResponse as WireContractResponse,
} from '@contract-case/case-connector-proto';
import { BoundaryResult } from '../../../../entities/types.js';

import { ConnectorStateHandler } from '../../../../domain/types.js';

import {
  waitForResolution,
  makeResolvableId,
} from '../../promiseHandler/promiseHandler.js';
import { unbox } from '../values.js';
import { SendContractResponse } from '../../sendContractResponse.js';

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
): Record<string, ConnectorStateHandler> =>
  stateHandlers.reduce<Record<string, ConnectorStateHandler>>(
    (acc: Record<string, ConnectorStateHandler>, handler) => ({
      ...acc,
      [unbox(handler.getHandle())]: {
        // We set both initially
        setup: makeStateHandlerCall(handler, executeCall),
        teardown: makeStateHandlerCall(handler, executeCall),
        // but the existing one should clobber it if it's already set
        ...(acc[unbox(handler.getHandle())]
          ? acc[unbox(handler.getHandle())]
          : {}),
      },
    }),
    {} as Record<string, ConnectorStateHandler>,
  );
