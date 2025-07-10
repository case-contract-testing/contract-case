package io.contract_testing.contractcase;

public record VerificationTestHandle(
    String filePath,
    String testName,
    Integer testIndex,
    Integer contractIndex) {
}
