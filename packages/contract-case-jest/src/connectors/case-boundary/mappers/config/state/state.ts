import { BoundaryStateHandler } from '@contract-case/case-connector/cjs';
import { StateHandler, StateHandlers } from '../../../../../entities/types.js';
import { MappedStateHandler } from './MappedStateHandler.js';
import { ContractCaseConfigurationError } from '../../../../../entities/index.js';

const NO_OP_HANDLER = () => {};

const mapStateHandler = (
  name: string,
  stateHandler: StateHandler,
): BoundaryStateHandler => {
  if (typeof stateHandler === 'function') {
    return new MappedStateHandler(stateHandler, NO_OP_HANDLER);
  }
  if (
    typeof stateHandler.teardown === 'function' &&
    typeof stateHandler.setup === 'function'
  ) {
    return new MappedStateHandler(stateHandler.setup, stateHandler.teardown);
  }
  if (typeof stateHandler.setup === 'function') {
    return new MappedStateHandler(stateHandler.setup, NO_OP_HANDLER);
  }
  if (typeof stateHandler.teardown === 'function') {
    return new MappedStateHandler(NO_OP_HANDLER, stateHandler.setup);
  }
  throw new ContractCaseConfigurationError(
    `The stateHandler '${name}' wasn't a function, or didn't have a setup / teardown property. Please check that it is the correct type.`,
    undefined,
    'BAD_CONFIG',
  );
};

export const mapStateHandlers = (
  stateHandlers: StateHandlers,
): Record<string, BoundaryStateHandler> =>
  Object.entries(stateHandlers)
    .map(([key, value]) => ({
      [`${key}`]: mapStateHandler(key, value),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
