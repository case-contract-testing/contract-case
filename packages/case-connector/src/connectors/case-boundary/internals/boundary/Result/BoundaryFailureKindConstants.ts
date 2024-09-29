import {
  BrokerError,
  CaseConfigurationError,
  CaseCoreError,
  CaseFailedAssertionError,
  CaseTriggerError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-core';

/**
 * Constants to use for determining what kind of failure you have
 *
 * @public
 */
export class BoundaryFailureKindConstants {
  /**
   * Something went wrong in ContractCase internals. Almost certainly a bug.
   */
  static readonly CASE_CORE_ERROR = 'CaseCoreError';

  /**
   * The user has configured ContractCase incorrectly
   */
  static readonly CASE_CONFIGURATION_ERROR = 'CaseConfigurationError';

  /**
   * The test's expectations were not met
   */
  static readonly CASE_FAILED_ASSERTION_ERROR = 'CaseFailedAssertionError';

  /**
   * The user-provided trigger failed when it was not expected to do so
   */
  static readonly CASE_TRIGGER_ERROR = 'CaseTriggerError';

  /**
   * The user-provided verification function (testResponse or testErrorResponse) failed
   */
  static readonly CASE_VERIFY_RETURN_ERROR = 'VerifyTriggerReturnObjectError';

  /**
   * An error while contacting a contract broker
   */
  static readonly CASE_BROKER_ERROR = 'BrokerError';

  /**
   * A mapping from error names to communication constants.
   * This is maintained because when the JS is minified, the names aren't predictable.
   */
  static jsNameToConstant = {
    [CaseCoreError.name]: this.CASE_CORE_ERROR,
    [CaseConfigurationError.name]: this.CASE_CONFIGURATION_ERROR,
    [CaseFailedAssertionError.name]: this.CASE_FAILED_ASSERTION_ERROR,
    [CaseTriggerError.name]: this.CASE_TRIGGER_ERROR,
    [VerifyTriggerReturnObjectError.name]: this.CASE_VERIFY_RETURN_ERROR,
    [BrokerError.name]: this.CASE_BROKER_ERROR,
  };
}
