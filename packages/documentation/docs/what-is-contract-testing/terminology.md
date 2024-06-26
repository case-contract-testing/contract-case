# Consumers and providers

ContractCase is a consumer-driven contract testing framework. This means that
you define contracts at the consumer side, and verify the contract on the provider side.

:::tip
If you are coming from other contract testing frameworks like Pact, be
aware that a Consumer in ContractCase is not always a synonym for "client", and
provider is not always a synonym for "server".
:::

## Consumer

The _Consumer_ is the side of the communication that wants the data that is
transferred. It is the side of the communication that the data is _for_.

### Message consumers

For testing messages (eg SQS, SNS, etc), it is clear that the receiver of the message is the consumer,
and the producer of the message is the provider. Note: ContractCase currently
only supports message contract tests via custom plugins.

### Request / response pairs

However, with request / response pairs (eg HTTP, gRPC, etc), it's less clear
which side is the consumer. For example, an HTTP client _consumes_ a response -
but similarly, an HTTP server _consumes_ a request. Both sides could be considered provider or consumer.

### Client as consumer

The best practice (and our recommendation) is to almost always consider the
client the consumer. This is the most common way to write contract tests.

A client that is a consumer produces requests and consumes responses.
If your consumer is an HTTP client, contract definition means:

- You define a series of request and response pairs, for different server
  states (for example, the same `getUser` request might result in different
  responses depending on whether or not the server exists)
- Ensure that your client can actually send those defined requests
- Ensure that your client can understand the responses you defined

In most use cases (eg frontend/mobile clients, most microservice RPC calls,
database calls, etc), it is appropriate to consider the client as the consumer.
If you are unsure, or you are new to contract testing, start with the client as
your consumer.

### Server as consumer

In rare cases it is more appropriate or more convenient to consider the server as the consumer.

A server that is a consumer will consume requests, and produces responses.
If your consumer is an HTTP server, contract definition means:

- You define a series of request and response pairs, for different server
  states (for example, the same `getUser` request might result in different
  responses depending on whether or not the server exists).
- You also need to define handlers that set up those states.
- Ensure that your server can actually understand those requests
- Ensure that your service will actually send the responses you defined

Cases where this is appropriate include fire-and-forget requests (eg remote
logging frameworks), or where
a contract for a public API is published to many consumers.

:::caution
For teams that usually define their API surfaces at the server, we still recommend that you
default to considering the client as the consumer.
:::

## Provider

The _Provider_ is the side of the communication that the makes the data available.

Contract verification ensures that the provider meets the expectations of the consumer(s) that rely on it.

### Message providers

With message-based systems, the side that produces the messages is the _provider_. Note: ContractCase currently only supports messages via custom plugins.

### Request / response pairs

### Verifying a client's contract on the server

The common case in request / response pairs is for the provider to be the server.

If you are verifying a contract from a client, then you verify that you can consume
the requests the client sends, and can produce the responses the client expects.

- You define handlers that set up the provider states
- ContractCase takes the contract file from all of your consumers. Then, for each request / response pair in the contract, it:
  - Calls the state setup handler
  - Sends the request
  - Confirms that the response matches the expectation in the contract

This ensures that the server can understand the requests the client really sends, and that it can respond with what the client really needs.

### Verifying a server's contract on the client

In the rare cases where the client is the provider, verification confirms that
you can produce the requests expected by the server.

- You define triggers that contract case can call to generate the requests
- You define test response functions that ensure that the responses were understood.
- ContractCase then takes the contract file from all of your consumers. Then, for each request / response pair in the contract, it:
  - Calls the trigger to send the request
  - Confirms that the request matches the expectation in the contract
  - Sends the response
  - Calls the test response function to check that the returned object was understood by your client.
