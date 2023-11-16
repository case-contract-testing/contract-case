---
sidebar_position: 1
---

# Creating a contract

Here's the contract testing lifecycle:

1. You are here `--->` Define a contract `<---` You are here

   1. Define examples
   1. Run tests to confirm the examples are correct
   1. Upload contracts to a broker

1. Verify the contract:
   1. Download contract from the broker
   1. Verify the contract
   1. Publish verification result to the broker

## To create a contract

In ContractCase, a contract starts with a `defineContract` call. This can be configured with a
`ContractCaseConfig` object (see [the configuration options reference
here](/docs/reference/configuring)).

For example, in Jest, defining a contract might look like:

```ts
defineContract(
  {
    consumerName /* The name of the service writing the contract */,
    providerName /* The name of the service that will verify the contract */,

    /* Any additional ContractCaseConfig */
  },
  (contract: ContractDefiner) => {
    describe('some API method', () => {
      describe('with a valid access token', () => {
        it('behaves as expected', async () => {
          await contract.runExample(/* described later in this chapter */);
        });
      });

      describe('with no access token', () => {
        it('throws an error', async () => {
          await contract.runRejectingExample(/* described later in this chapter */);
        });
      });
    });
    /* arbitrary other contract examples */
  },
);
```

In a contract, you can have as many `runExample` and `runRejectingExample`
calls as you like. When all the tests are over, ContractCase will write the contract to
disk (this is handle automatically by the `defineContract` DSL).

:::tip
If you are coming from other contract testing frameworks like Pact, be
aware that a Consumer is ContractCase is not always a synonym for "client", and
provider is not always a synonym for "server". For example, you
might be writing the contract on the server side, which means you are defining
the consumer of HTTP requests, not the consumer of responses.
:::

Next, we will discuss the [ContractCase Example Lifecycle](./lifecycle).
