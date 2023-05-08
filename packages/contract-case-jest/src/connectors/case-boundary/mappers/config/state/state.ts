import {
  BoundaryStateHandler,
  BoundaryStateHandlerWithTeardown,
} from '@contract-case/case-boundary';
import { StateHandler, StateHandlers } from '../../../../../entities/types';
import { MappedStateHandler } from './MappedStateHandler';
import { MappedStateHandlerWithTeardown } from './MappedStateHandlerWithTeardown';
import { ContractCaseConfigurationError } from '../../../../../entities';

const mapStateHandler = (
  name: string,
  stateHandler: StateHandler
): BoundaryStateHandler | BoundaryStateHandlerWithTeardown => {
  if (typeof stateHandler === 'function') {
    return new MappedStateHandler(stateHandler);
  }
  if (typeof stateHandler.teardown === 'function') {
    return new MappedStateHandlerWithTeardown(
      stateHandler.setup,
      stateHandler.teardown
    );
  }
  if (typeof stateHandler.setup === 'function') {
    return new MappedStateHandler(stateHandler.setup);
  }
  throw new ContractCaseConfigurationError(
    `The stateHandler '${name}' wasn't a function, or didn't have a setup / teardown property. Please check that it is the correct type.`
  );
};

export const mapStateHandlers = (
  stateHandlers: StateHandlers
): Record<string, BoundaryStateHandler> =>
  Object.entries(stateHandlers)
    .map(([key, value]) => ({
      [`${key}`]: mapStateHandler(key, value),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
