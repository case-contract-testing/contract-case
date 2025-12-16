package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.ContractCaseConfig;

/**
 * A handle that can be used to execute a test prepared by {@link ContractVerifier#prepareVerification(ContractCaseConfig)}.
 * <p>
 * Callers can consider it opaque, but the contents are exposed so that they can be logged by test execution frameworks.
 *
 * @param filePath The path to the contract
 * @param testName The name of this test
 * @param testIndex The index of this test within the contract
 * @param contractIndex The index of the contract within this overall verification run.
 */
public record VerificationTestHandle(
    String filePath,
    String testName,
    Integer testIndex,
    Integer contractIndex) {
}
