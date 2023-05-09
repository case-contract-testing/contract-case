import {
  BrokerError,
  CaseConfigurationError,
  CaseCoreError,
  CaseFailedAssertionError,
  CaseTriggerError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-core';

export class BoundaryFailureKindConstants {
  /**
   * Something went wrong in ContractCase internals. Almost certainly a bug.
   */
  static readonly CASE_CORE_ERROR = CaseCoreError.name;

  /**
   * The user has configured ContractCase incorrectly
   */
  static readonly CASE_CONFIGURATION_ERROR = CaseConfigurationError.name;

  /**
   * The test's expectations were not met
   */
  static readonly CASE_FAILED_ASSERTION_ERROR = CaseFailedAssertionError.name;

  /**
   * The user-provided trigger failed when it was not expected to do so
   */
  static readonly CASE_TRIGGER_ERROR = CaseTriggerError.name;

  /**
   * The user-provided verification function (testResponse or testErrorResponse) failed
   */
  static readonly CASE_VERIFY_RETURN_ERROR =
    VerifyTriggerReturnObjectError.name;

  /**
   * An error while contacting a contract broker
   */
  static readonly CASE_BROKER_ERROR = BrokerError.name;
}
