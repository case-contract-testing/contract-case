package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.ContractDescription;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Singular;

/***
 * A contract verification handle holds metadata about a contract that's being verified,
 * and the test handles that can be used to call back via {@link ContractVerifier#runPreparedTest(VerificationTestHandle)}
 * <p>
 * Note that the metadata might be a complex object, but for convenience in Java
 * it is flattened. So the following metadata object:
 *
 * <pre>
 * {
 *   "_case": {
 *       "version": "1.2.3",
 *       "hash": "abc12"
 *   },
 *   "author": "Steve",
 *   "build": {
 *      "location": "CI",
 *      "language": "Java"
 *   }
 * }
 * </pre>
 *
 * would become a map like so:
 *
 * <pre>
 * Map.ofEntries(
 *         Map.entry("_case.version", "1.2.3"),
 *         Map.entry("_case.hash", "abc12"),
 *         Map.entry("author", "Steve"),
 *         Map.entry("build.location", "CI"),
 *         Map.entry("build.language", "Java"));
 * </pre>
 *
 *
 * @param filePath The path to the contract
 * @param contractIndex The index of the contract within this overall verification run.
 */
@Builder
public record VerificationHandle(

    String filePath,

    Integer contractIndex,

    ContractDescription description,

    Map<String, String> metadata,
    @Singular
    List<VerificationTestHandle> testHandles) {
    public VerificationHandle {
        // Enforce immutability
        testHandles = testHandles != null ? List.copyOf(testHandles) : List.of();
        metadata = metadata != null ? Map.copyOf(metadata) : Map.of();
    }
}
