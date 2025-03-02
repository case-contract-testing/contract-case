---
sidebar_position: 2
---

# Lifecycle for Interactions

The overall lifecycle of a contract test is:

1. Define a contract

   1. Define the interactions
   1. Run tests to confirm the interactions are correct
   1. Upload contracts to a broker

1. Verify the contract:
   1. Download contract from the broker
   1. Verify the contract
   1. Publish verification result to the broker

## Zooming in on the run tests step

In order to define interactions, it's useful to understand how the interactions will be run. The general lifecycle for all ContractCase interactions is:

1. Define interaction
2. Set up mock
   1. Call state setup handlers (if any)
3. Invoke `trigger` to call mock
   1. Compare mock expectations
   2. Return appropriate response
4. Invoke `testResponse` or `testErrorResponse` function
5. If everything was successful, record successful interaction in contract.
   If any of the steps or comparisons failed, the whole contract is failed.
   1. Call state teardown handlers (if any)
6. (Later, at the provider side, during verification) re-run steps 2-5.

ContractCase handles most of the lifecycle for you. Not all ContractCase interaction types need to have all
lifecycle steps defined by the user - for example, ContractCase defines and invokes its
own triggers when testing HTTP servers. For information on which lifecycle you
should define for each ContractCase interaction type, see the relevant [contract definition](../defining-contracts/) or [contract verification](../verifying-contracts/) guides.
