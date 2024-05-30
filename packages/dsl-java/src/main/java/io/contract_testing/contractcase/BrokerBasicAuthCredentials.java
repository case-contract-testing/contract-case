package io.contract_testing.contractcase;

/**
 * Defines credentials for brokers secured with HTTP basic auth
 *
 * @param username The basic auth username
 * @param password The basic auth password
 */
public record BrokerBasicAuthCredentials(String username, String password) {

}
