import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
} from '../../entities/types.js';

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
