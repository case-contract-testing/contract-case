---
sidebar_position: 2
---

# Lifecycle for examples

The overall lifecycle of a contract test is:

1. Define a contract

   1. You are here --> Define the examples <-- You are here
   1. Run tests to confirm the examples are correct
   1. Upload contracts to a broker

1. Verify the contract:
   1. Download contract from the broker
   1. Verify the contract
   1. Publish verification result to the broker

## Zooming in on the run tests step

In order to define examples, it's useful to understand how the examples will be run. The general lifecycle for all ContractCase Examples is:

1. Define example
2. Set up mock
   1. Call state setup handlers (if any)
3. Invoke `trigger` to call mock
   1. Compare mock expectations
   2. Return appropriate response
4. Invoke `testResponse` or `testErrorResponse` function
5. If everything was successful, record successful example in contract.
   If any of the steps or comparisons failed, the whole contract is failed.
   1. Call state teardown handlers (if any)
6. (Later, at the provider side, during verification) re-run steps 2-5.

ContractCase handles most of the lifecycle for you. Not all ContractCase Example types need to have all
lifecycle steps defined by the user - for example, ContractCase defines and invokes its
own triggers when testing HTTP servers. For information on which lifecycle you
should define for each ContractCase Example type, see the [example types](/docs/reference/example-types) documentation.

Next we will discuss [how to define examples](./defining-example) inside `runExample`.
