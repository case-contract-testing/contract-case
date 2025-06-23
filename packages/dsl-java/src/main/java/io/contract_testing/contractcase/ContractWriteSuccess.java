package io.contract_testing.contractcase;

import java.util.List;


/**
 * The response type used when the contract was written successfully
 *
 * @param contractPaths The path(s) to the contract files written
 * @param consumerSlug  The consumer slug (ie, the consumer part of the filename), normalised however ContractCase chooses to normalise it
 * @param providerSlug The provider slug (ie, the provider part of the filepath), normalised however ContractCase chose to normalise it
 */
public record ContractWriteSuccess(List<String> contractPaths, String consumerSlug, String providerSlug) {
  public ContractWriteSuccess(List<String> contractPaths, String consumerSlug, String providerSlug) {
    this.contractPaths = List.copyOf(contractPaths);
    this.consumerSlug = consumerSlug;
    this.providerSlug = providerSlug;
  }
}
