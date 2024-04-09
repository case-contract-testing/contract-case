import { v4 as uuid4 } from 'uuid';
import {
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  BoundaryContractDefiner,
  BoundaryFailure,
} from './internals';
import {
  makeCoreError,
  makeConfigurationError,
} from '../../domain/errors/errors';
import { DefinitionId } from '../../domain/types';
import { maintainerLog } from '../../domain/maintainerLog';

const ENDED_DEFINER = 'CLOSED' as const;

export type DefinitionHandle = { id: string; definer: BoundaryContractDefiner };

type DefinitionContainer = DefinitionHandle | typeof ENDED_DEFINER;

const DEFINING_CONTRACTS: Record<string, DefinitionContainer> = {};

export const createDefiner = (
  config: Omit<ContractCaseBoundaryConfig, 'testRunId'>,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
): DefinitionId => {
  const id = uuid4();
  const definer = {
    id,
    definer: new BoundaryContractDefiner(
      { ...config, testRunId: id },
      callbackPrinter,
      resultPrinter,
      callerVersions,
    ),
  };
  DEFINING_CONTRACTS[id] = definer;

  maintainerLog('  ---  storage', `Storing a definer (${id})`);
  return id;
};

export const getDefiner = (
  defineId: DefinitionId,
  methodName: string,
): DefinitionHandle | BoundaryFailure => {
  const definerHandle = DEFINING_CONTRACTS[defineId];
  if (definerHandle === undefined) {
    return makeCoreError(
      `The defineId '${defineId}' doesn't have an associated handle.\n\nThis might happen if the case-connector methods are called out of order, or the wrong connector is contacted`,
      `case-connector::${methodName}`,
    );
  }
  if (definerHandle === ENDED_DEFINER) {
    return makeConfigurationError(
      `${methodName} was called after the definer was closed, presumably by endRecord`,
      `case-connector::${methodName}`,
    );
  }
  return definerHandle;
};

export const closeDefiner = (defineId: DefinitionId): void => {
  DEFINING_CONTRACTS[defineId] = ENDED_DEFINER;
};
