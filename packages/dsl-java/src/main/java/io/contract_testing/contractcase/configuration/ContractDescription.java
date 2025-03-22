package io.contract_testing.contractcase.configuration;

/**
 * Describes a contract's consumer and provider
 *
 * @param consumerName The consumer name
 * @param providerName The provider name
 */
public record ContractDescription(String consumerName, String providerName) {

}
