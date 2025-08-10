import { v4 as uuid4 } from 'uuid';
import {
  BoundaryContractVerifier,
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryFailure,
  BoundaryInvokableFunction,
} from './internals/index.js';
import {
  makeCoreError,
  makeConfigurationError,
} from '../../domain/errors/errors.js';

const ENDED_VERIFIER = 'CLOSED' as const;

export type VerificationHandle = {
  id: string;
  verifier: BoundaryContractVerifier;
  invokeableFunctions: Record<string, BoundaryInvokableFunction>;
};

type VerificationContainer = VerificationHandle | typeof ENDED_VERIFIER;

type VerifierId = string;

const VERIFYING_CONTRACTS: Record<string, VerificationContainer> = {};

export const createVerifier = (
  config: Omit<ContractCaseBoundaryConfig, 'testRunId'>,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
): VerifierId => {
  const id = uuid4();
  const verifier = {
    id,
    verifier: new BoundaryContractVerifier(
      { ...config, testRunId: id },
      callbackPrinter,
      resultPrinter,
      callerVersions,
    ),
    invokeableFunctions: {},
  };
  VERIFYING_CONTRACTS[id] = verifier;
  return id;
};

export const getVerifier = (
  verifierId: VerifierId,
  methodName: string,
): VerificationHandle | BoundaryFailure => {
  const verifierHandle = VERIFYING_CONTRACTS[verifierId];
  if (verifierHandle === undefined) {
    return makeCoreError(
      `The verifierId '${verifierId}' doesn't have an associated handle.\n\nThis might happen if the case-connector methods are called out of order, or the wrong connector is contacted`,
      `case-connector::${methodName}`,
    );
  }
  if (verifierHandle === ENDED_VERIFIER) {
    return makeConfigurationError(
      `${methodName} was called after the verifier was closed`,
      `case-connector::${methodName}`,
      'INVALID_LIFECYCLE',
    );
  }
  return verifierHandle;
};

export const closeVerifier = (verifierId: VerifierId): void => {
  VERIFYING_CONTRACTS[verifierId] = ENDED_VERIFIER;
};
