# ContractCase Contract Testing Framework

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/case-contract-testing/case/badge.svg?branch=main)](https://coveralls.io/github/case-contract-testing/case?branch=main)

DSL (these are the packages you want to install):

[![npm](https://img.shields.io/npm/v/@contract-case/contract-case-jest.svg)](https://www.npmjs.com/package/@contract-case/contract-case-jest)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/contract-case-jest/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/contract-case-jest//package.json)

<span align="center">

![Case](https://github.com/case-contract-testing/case/raw/main/docs/suitcase.png)

<sub>[Briefcase sticker created by Gohsantosadrive on Flaticon](https://www.flaticon.com/free-stickers/law)</sub>

</span>

Boundary Packages:

![Maven Central](https://img.shields.io/maven-central/v/io.contract-testing.contractcase/case_boundary)
[![npm](https://img.shields.io/npm/v/@contract-case/case-boundary.svg)](https://www.npmjs.com/package/@contract-case/case-boundary)

Core Package:

[![npm](https://img.shields.io/npm/v/@contract-case/case-core.svg)](https://www.npmjs.com/package/@contract-case/case-core)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-core/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-core/package.json)

Read the [documentation here](https://case.contract-testing.io/docs/intro/). Documentation is currently in-progress. Feedback welcome!

ContractCase is a next-generation consumer-driven contract testing framework, building
on many of the lessons from maintaining the excellent [Pact](pact.io) contract testing
framework. It is our belief that contract testing is the best way to get
deployment confidence for your applications and services.

ContractCase releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, ContractContractCase is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Patch versions will always be backwards compatible.

Breaking changes will always be detailed in the [changelog](./CHANGELOG.md).

Incomplete [documentation is here](https://case.contract-testing.io/docs/intro/). By way of apology for the unstable API, at least one new page of documentation will be added every time a breaking change is released during the beta period.

## Caveats and limitations

**WARNING: THE API IS UNSTABLE AND MAY CHANGE BETWEEN MINOR VERSIONS**

ContractCase is now available and should work for both client and server driven http/https
contracts. Feedback on the ContractCase API / DSL and (especially) naming
conventions very welcome. However, the following caveats should be kept in mind:

1. ContractCase is currently only available in Javascript / Typescript. At a later date, support for Python, Java, C# and Go will be added, using [JSii](https://aws.github.io/jsii/). There are no plans to add other languages at this time.
1. ContractCase doesn't yet support merging of contracts. This means that your whole contract must be defined in one test file.
1. ContractCase currently is only compatible with Jest. At a later date, the jest support will be extracted, and the peer-dependency removed.
1. ContractCase currently only has rudimentary broker support - it works but it's not very configurable.

Although the test coverage is high, and great care has been taken to ensure that the results are correct, there may still be bugs. Please open an issue if you experience any problems.

If you want to get started immediately, we recommend starting with either the [client-driven end-to-end test](src/index.http.requestingCDC.spec.ts), or the [server-driven end-to-end test](src/index.http.respondingPDC.spec.ts). Make sure you remove `printResults: false`.

You can follow the detailed progress by reading the [maintainer todo list](./docs/maintainers/todo.md). These caveats will be updated as progress is made.

### I'm fine with all the caveats, how do I get started?

```
npm install --save-dev @contract-case/contract-case-jest
```

You may also need the peer dependencies:

```
npm install --save-dev jest@^29.4.3
```

## For Pact users

> _TODO: Pull this section out and expand into detailed documentation_

ContractCase is intended to solve some of the pain points when using Pact - if
you are not hitting those pain points, there is no need to switch to using ContractCase (unless
you want to or something).

ContractCase has a very similar philosophy to Pact. You write your pacts as a contract, which is a series of examples.

Like Pact, ContractCase requires a broker to operate. To maximise Pact compatibility, ContractCase works with the Pact broker. We
recommend either:

- The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
- The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

We plan for ContractCase to always be compatible with both of these brokers.

## Feature differences from Pact

- Drive contracts from the client or the server. ContractCase is always consumer-driven, but what you are consuming might be a request, instead of a response.
  - Example [client-driven end-to-end test](src/index.http.requestingCDC.spec.ts)
  - Example [server-driven end-to-end test](src/index.http.respondingPDC.spec.ts)
- Contract verification is an individual test in your test suite per interaction, rather than one test for all interactions. This provides much more granular feedback
- All matchers are valid in all contexts
- Currently it only supports Javascript / Typescript, with Jest

## Planned differences

- Native message formats - actually invoke SQS queues / kafka messages etc during verification
- Easy user extensions - write extensions for ContractCase just by extending a class in JS, Python, Go or Java

## Roadmap

1. Pact Parity (in progress, close to complete)
2. "Provider" driven contracts (done)
3. Documentation (in progress)
4. RELEASE BETA (done)
5. Support Python, C# and Go
6. Arbitrary combinations of request/response pairs, incidentally including native SQS support
7. Pass-through APIs
8. Plugins and arbitrary extensions

For the gory details, you can see the implementation notebook / todo list [here](docs/maintainers/todo.md)

<!--- cspell:dictionaries !html --->
