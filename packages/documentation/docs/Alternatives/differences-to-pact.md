# For Pact users

ContractCase has a very similar philosophy to Pact.

- Both Pact and ContractCase write contracts as a series of independent examples.
- Like Pact, in ContractCase, a failing consumer test will fail to write the contract and will fail
  the test suite.
- Like Pact, ContractCase requires a broker to operate. To maximise Pact compatibility, ContractCase works with the Pact broker. We recommend either:

  - The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
  - The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

    ContractCase plans to always be compatible with both of these brokers.

However, there are some key
differences. These differences are motivated by a desire to improve the developer experience.

## Advantages over Pact

ContractCase provides several advantages over Pact:

## A failing verification doesn't fail the build

In ContractCase, the default setup is failing provider verification does not fail
the test suite. **This means provider teams don't have their builds broken by new contracts written by consumer teams.**

Errors are still printed, and the verification
results are published to the broker in CI.

This fully separates the verification and use can-i-deploy. See the section on
[gating deploys](/docs/deployment-checks) for more information.

If you want to change this behaviour, you need the test suite to fail if the verification fails, set `throwOnFailure: true` in the verifier options.

## CI is assumed

By default, contract files are published in CI, and not published locally.

## Better errors and debugging

ContractCase has a clear, consistent logging policy. **Setting your log-level to
debug will only print information you can use to find out why your tests aren't
working**. No internal implementation details are logged during a debug log.

Configuration error messages are developer-first, clearly describe what the problem is, and provide information about what you can do to fix it.

## Use matchers everywhere

Matchers are recursive, which means that you can much more easily combine
matchers. **No more remembering which matchers were valid outside the body and
which aren't**. Additionally, many new matchers can be created by simply
combining existing matchers without writing new implementations.

## Granular feedback in verification

Contract verification is an individual test in your test suite per interaction, rather than one test for all interactions. This provides much more granular feedback and better integration with your testing suite.

## A client is not always a consumer

ContractCase is consumer driven. However, it doesn't require the consumer to be the client - **you can write contracts on the server too**.

This is a terminology change from Pact. In Pact `consumer` is
a synonym for client, and `provider` a synonym
for server.

In ContractCase, the `consumer` always writes the contract, but it might be
a client (ie, it consumes HTTP responses), or it might be a server (ie, it
consumes HTTP responses).

Generally, you want to still have the consumer be the client, but being able to define the contract at the server is useful in some rare cases. One example is remote
logging, where writing consumer expectations at the client doesn't really make sense.

- Example [client-driven contract definition](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.client.define.spec.ts)
- Example [client-driven contract verification](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.client.spec.verify.ts)
- Example [server-driven contract definition](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.server.define.spec.ts)
- Example [server-driven contract verification](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/src/index.http.server.spec.verify.ts).

## Plugin-first

ContractCase was built with extensions in mind. In fact, all the core matchers and interaction types are built as plugins.

This means that extending ContractCase is significantly easier - to add new mock
types, implement one function and one DSL object. To add new matcher type, there
are three functions, and one DSL object to implement.

See the documentation on [extending ContractCase](/docs/reference/plugin-framework) for details.

# Unsupported things

There are some things that Pact supports that ContractCase doesn't. If you need one of these, ContractCase might not yet be for you.

## Things Pact supports that ContractCase doesn't yet support

- Currently ContractCase only supports Javascript / Typescript, with Jest, and Java.
- ContractCase does not yet support any message types (although, the Function Mock type provides the same functionality as Pact-Message)
- ContractCase does not yet have date convenience matchers
- ContractCase does not yet have XML support
- There's no regular expression matcher. Usually, this was used to get around the lack of easily extensible matching, so we're hoping this could be used to

If you need any of these prioritised, please [open an issue](https://github.com/case-contract-testing/contract-case/issues).

It is our hope that Pact users will find using ContractCase a breath of fresh air.
