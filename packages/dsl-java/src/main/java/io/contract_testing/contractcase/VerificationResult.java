package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.ContractDescription;
import java.util.Map;

/**
 * Represents the result of a Contract Verification, returned when closing a
 * verification.
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
 * 
 * @param contractPath The path to the contract file
 * @param description  The description of the contract
 * @param consumerSlug The consumer slug (ie, the consumer part of the
 *                     filename), normalised by the ContractCase core
 * @param providerSlug The provider slug (ie, the provider part of the
 *                     filepath), normalised by the ContractCase core
 * @param metadata     The metadata associated with the contract, flattened
 *                     using the approach described in the class description.
 */
public record VerificationResult(

        String contractPath,
        ContractDescription description,
        String consumerSlug,
        String providerSlug,
        Map<String, String> metadata) {

  public VerificationResult {
    metadata = Map.copyOf(metadata);
  }

}
