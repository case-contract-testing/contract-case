/*!
 * ContractCase Connector JS - Internal connector code for ContractCase test framework bindings
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

// Internal boundary mappers
export {
  mapSuccess,
  mapSuccessWithAny,
  mapFailureToJsError,
} from './connectors/case-boundary/mappers/boundaryResultToJs.js';
export { makeBoundaryFailure } from './connectors/case-boundary/mappers/jsErrorToBoundary.js';
export { mapInvokeableFunction } from './connectors/case-boundary/mappers/invokeableFunction.js';
export { mapContractVerificationHandles } from './connectors/case-boundary/mappers/verificationHandles.js';
export {
  mapConfig,
  mapSuccessConfig,
  mapFailingConfig,
} from './connectors/case-boundary/mappers/config/config.js';

// Internal printer and error handler
export {
  defaultPrinter,
  crashPrinter,
} from './connectors/defaultTestPrinter.js';
export { errorHandler, errorReporter } from './connectors/handler.js';

// Entity types (shared between internal and user-facing code)
export * from './entities/index.js';
