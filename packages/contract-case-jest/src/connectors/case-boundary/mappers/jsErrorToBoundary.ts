import { BoundaryFailure } from '@contract-case/case-connector/cjs';
import { ContractCaseConfigurationError } from '../../../entities';

export const makeBoundaryFailure = (error: Error): BoundaryFailure =>
  new BoundaryFailure(
    error.name,
    error.message,
    error.stack ?? 'no-stack-trace',
    // TODO: Properly propagate stack traces
    error.stack ?? 'no-stack-trace',
    (error as ContractCaseConfigurationError).contractCaseErrorCode
      ? (error as ContractCaseConfigurationError).contractCaseErrorCode
      : 'UNDOCUMENTED',
  );
