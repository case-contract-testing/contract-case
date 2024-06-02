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
results are published to the broker in CI. This means that to get deployment safety with ContractCase, you must use can-i-deploy. See the section on [gating deploys](/docs/deployment-checks) for more information. If you need the test suite to fail if the verification fails, set `throwOnFailure: true` in the verifier options.

:::danger
Failing provider verification in ContractCase does not fail the test suite by default - although it will print errors. This means the use of can-i-deploy is required to get the deployment safety benefits with ContractCase. See the [deployment checks](/docs/deployment-checks) section for more details.
:::

Some terminology in case is different from Pact:

- **consumer/provider**: In Pact, consumer is essentially a synonym for client, and provider a synonym for server. In ContractCase, the `consumer` writes the contract, but it might be a client (ie, it consumes HTTP responses), or it might be a server (ie, it consumes HTTP responses)
- **interaction**: Interactions in ContractCase are called examples.

Like Pact, ContractCase requires a broker to operate. To maximise Pact compatibility, ContractCase works with the Pact broker. We recommend either:

- The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
- The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

ContractCase plans to always be compatible with both of these brokers.

## Behavioural differences to Pact

- By default, contract files are published in CI, and not published locally.
- By default, a verification failure does not fail the tests

## Improvements over Pact

- Drive contracts from the client or the server. ContractCase is always consumer-driven, but what you are consuming might be a request, instead of a response.
  - Example [client-driven contract definition](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.client.define.spec.ts)
  - Example [client-driven contract verification](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.client.spec.verify.ts)
  - Example [server-driven contract definition](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.server.define.spec.ts)
  - Example [server-driven contract verification](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.server.spec.verify.ts).
- Contract verification is an individual test in your test suite per interaction, rather than one test for all interactions. This provides much more granular feedback and better integration with your testing suite.
- Matchers are recursive, which means that you can much more easily combine matchers. No more remembering which matchers were valid outside the body and which aren't. Additionally, many new matchers can be created by simply combining existing matchers without writing new implementations.
- Extending case is significantly easier - to add new mock types, implement one function and one DSL object. To add new matcher type, there are three functions, and one DSL object to implement. At the moment, these extensions must be added to the core code. See the documentation on [extending case](/docs/reference/plugin-framework/extending-case) for details.

## Planned improvements

- Native message formats - actually invoke SQS queues / kafka messages etc during verification
- First-class support for pass-through APIs and API gateways
- Support for plugins
- Read Pact files during verification (for easy migration)

## Things Pact supports that ContractCase doesn't yet support

- Currently ContractCase only supports Javascript / Typescript, with Jest, and Jest.
- ContractCase does not yet support any message types
- ContractCase does not yet have date convenience matchers
- ContractCase does not yet have XML or gRPC support

## Things Pact supports that ContractCase will not support

- ContractCase does not have a regular expression matcher. This is by design, as regular expression matchers allow examples that are too broad. Our experience was the that regular expression matcher in Pact was usually used to create optional examples, which is not recommended.
- Because of several differences in how examples are modelled, ContractCase cannot support writing a Pact file (it does write its own format of contract files).
