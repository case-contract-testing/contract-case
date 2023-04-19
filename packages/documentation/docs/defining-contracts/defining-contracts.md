---
sidebar_label: Defining Contracts
sidebar_position: 3
---

# Defining contracts

In ContractCase, a contract is a series of examples, not a specification. Each example
is independent. To achieve this independence, any preconditions are handled by
state setup functions. ContractCase contracts are consumer-driven, meaning the service that defines the contract defines what it consumes. Later, that contract is verified against the provider.

:::caution
For users coming from Pact, note that **consumer is not a synonym for client in a ContractCase Contract**. In a ContractCase Contract, the consumer might be an HTTP server (that is,
it consumes requests). Or, the consumer might be an HTTP client, which consumes responses.
:::

ContractCase has two main modes of running tests:

- **Contract Definition** - in which you define a number of case examples, and test
  them against one side of the communication boundary. If your consumer is an HTTP
  client, contract definition means that you write a series of request and
  response pairs, and you ensure that your client can send the defined requests,
  and understand the defined responses. Or, if your consumer is an HTTP
  server, you would still write a series of request and response pairs, but then
  you would instead then confirm that your server can understand those requests, and can
  generate those responses.
- **Contract Verification** - During contract verification, you take a list of
  examples (the contract file) written by a service that your service communicates
  with, and you confirm that it meets the expectations laid out in the contract.


Together, these form two halves of the same test. With an HTTP client
defining the contract, in contract _definition_ you confirm that the client can
generate a specific request, and understand a particular response. In contract
_verification_ you would then confirm that the server can understand the request, and
generate a particular response.

This document describes how to write contracts, and details the lifecycle of an example
during contract definition. If you already have a contract,
and you want to know how to verify
it, you can skip to [contract verification](/docs/verifying-contracts).

### Getting started

Next, read about [creating a contract](./creating-a-contract)