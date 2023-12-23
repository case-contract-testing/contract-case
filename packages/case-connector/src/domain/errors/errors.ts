import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
} from '@contract-case/case-boundary';

export const makeCoreError = (
  message: string,
  location: string,
): BoundaryFailure =>
  new BoundaryFailure(
    BoundaryFailureKindConstants.CASE_CORE_ERROR,
    message,
    location,
  );

export const makeConfigurationError = (
  message: string,
  location: string,
): BoundaryFailure =>
  new BoundaryFailure(
    BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR,
    message,
    location,
  );
