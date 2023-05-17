# For Pact users

:::caution INCOMPLETE DOCUMENT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

ContractCase is intended to solve some of the pain points when using Pact - if
you are not hitting those pain points, there is no need to switch to using ContractCase.

ContractCase has a very similar philosophy to Pact. Both Pact and ContractCase write contracts as a series of independent examples.

In ContractCase, a failing consumer test will fail to write the contract and will fail
the test suite. However, in ContractCase, failing provider verification does not fail
the test suite by default. Errors are still printed, and the verification
results are published to the broker in CI. This means that to get deployment safety with ContractCase, you must use can-i-deploy. See the section on [gating deploys](/docs/verifying-contracts/deploy-checks) for more information. If you need the test suite to fail if the verification fails, set `throwOnFailure: true` in the verifier options.

:::danger
Failing provider verification in ContractCase does not fail the test suite by default - although it will print errors. This means the use of can-i-deploy is required to get the deployment safety benefits with ContractCase. See the [deployment checks](/docs/verifying-contracts/deploy-checks) section for more details.
:::

Some terminology in case is different from Pact:

- **consumer/provider**: In Pact, consumer is essentially a synonym for client, and provider a synonym for server. In ContractCase, the `consumer` writes the contract, but it might be a client (ie, it consumes HTTP responses), or it might be a server (ie, it consumes HTTP responses)
- **interaction**: Interactions in ContractCase are called examples.

Like Pact, ContractCase requires a broker to operate. To maximise Pact compatibility, ContractCase works with the Pact broker. We recommend either:

- The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
- The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

ContractCase plans to always be compatible with both of these brokers.

## Improvements over Pact

- Drive contracts from the client or the server. ContractCase is always consumer-driven, but what you are consuming might be a request, instead of a response.
  - Example [client-driven end-to-end test](https://github.com/case-contract-testing/case/blob/main/src/index.http.requestingCDC.spec.ts)
  - Example [server-driven end-to-end test](https://github.com/case-contract-testing/case/blob/main/src/index.http.respondingPDC.spec.ts)
- Contract verification is an individual test in your test suite per interaction, rather than one test for all interactions. This provides much more granular feedback and better integration with your testing suite.
- Matchers are recursive, which means that you can much more easily combine matchers. No more remembering which matchers were valid outside the body and which aren't. Additionally, many new matchers can be created by simply combining
- Extending case is significantly easier - to add new mock types, implement one function and one DSL object. To add new matcher type, there are three functions, and one DSL object to implement. At the moment, these extensions must be added to the core code. See the documentation on [extending case](/docs/advanced-topics//extending-case) for details.

## Planned improvements

- Native message formats - actually invoke SQS queues / kafka messages etc during verification
- First-class support for pass-through APIs and API gateways
- Support for plugins

## Things Pact supports that ContractCase doesn't yet support

- Currently ContractCase only supports Javascript / Typescript, with Jest
- ContractCase does not yet support any message types
- ContractCase does not yet support publishing verification results
- ContractCase does not yet have date convenience matchers
- ContractCase does not yet have XML or gRPC support
- ContractCase cannot yet read Pact files during verification.

## Things Pact supports that ContractCase will not support

- ContractCase does not have a regular expression matcher. This is by design. To
  understand the rationale, see the section on [writing specific
  contracts](/docs/best-practices/write-specific-contracts) in the best practices
  section.
- Because of several differences in how examples are modelled, ContractCase cannot support writing a Pact file
