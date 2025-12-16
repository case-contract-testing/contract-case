package io.contract_testing.contractcase;

import java.util.List;
import lombok.Builder;
import lombok.Singular;

/***
 * A contract verification handle holds metadata about a contract that's being verified,
 * and the test handles that can be used to call back via {@link ContractVerifier#runPreparedTest(VerificationTestHandle)}
 *
 * It's opaque and read only, but can be used for logging during a verification run.
 *
 * @param filePath The path to the contract
 * @param contractIndex The index of the contract within this overall verification run.
 */
@Builder
public record ContractHandle(

    String filePath,

    Integer contractIndex,
    @Singular
    List<VerificationTestHandle> testHandles) {
    public ContractHandle {
        // Enforce immutability
        testHandles = testHandles != null ? List.copyOf(testHandles) : List.of();
    }
}
