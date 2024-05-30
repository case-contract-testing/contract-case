package io.contract_testing.contractcase.edge;

/**
 * This is a copy of BoundaryFailureKindConstants in the connector package. It must be kept up to
 * date manually
 */
public class ConnectorFailureKindConstants {

  /**
   * The user has configured ContractCase incorrectly
   */
  public static final String CASE_CONFIGURATION_ERROR = "CaseConfigurationError";

  /**
   * Something went wrong in ContractCase internals. Almost certainly a bug.
   */
  public static final String CASE_CORE_ERROR = "CaseCoreError";

  /**
   * The test's expectations were not met
   */
  public static final String CASE_FAILED_ASSERTION_ERROR = "CaseFailedAssertionError";

  /**
   * The user-provided trigger failed when it was not expected to do so
   */
  public static final String CASE_TRIGGER_ERROR = "CaseTriggerError";

  /**
   * The user-provided verification function (testResponse or testErrorResponse) failed
   */
  public static final String CASE_VERIFY_RETURN_ERROR =
      "VerifyTriggerReturnObjectError";

  /**
   * An error while contacting a contract broker
   */
  public static final String CASE_BROKER_ERROR = "BrokerError";
}
