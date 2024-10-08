# ContractCase Contract Testing Framework

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/case-contract-testing/contract-case/badge.svg?branch=main)](https://coveralls.io/github/case-contract-testing/contract-case?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=package.json)](https://snyk.io/test/github/case-contract-testing/contract-case/?targetFile=package.json)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9094/badge)](https://www.bestpractices.dev/projects/9094)

DSL (these are the packages you want to install):

Node:

[![npm](https://img.shields.io/npm/v/@contract-case/contract-case-jest.svg)](https://www.npmjs.com/package/@contract-case/contract-case-jest)

Java:

[![Maven Central](https://img.shields.io/maven-central/v/io.contract-testing.contractcase/contract-case?label=contract-case%3A%20maven)](https://central.sonatype.com/artifact/io.contract-testing.contractcase/contract-case)

<span align="center">

![Case](https://github.com/case-contract-testing/contract-case/raw/main/docs/suitcase.png)

<sub>[Briefcase sticker created by Gohsantosadrive on Flaticon](https://www.flaticon.com/free-stickers/law)</sub>

</span>

Read the [documentation here](https://case.contract-testing.io/docs/intro/). Documentation is currently in-progress. Feedback welcome!

ContractCase is a next-generation consumer-driven contract testing framework, building
on many of the lessons from maintaining the excellent [Pact](pact.io) contract testing
framework. It is our belief that contract testing is the best way to get
deployment confidence for your applications and services.

ContractCase releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, ContractContractCase is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Before 1.0.0, patch versions will always be backwards compatible.

Breaking changes will always be detailed in the [changelog](./CHANGELOG.md).

Incomplete [documentation is here](https://case.contract-testing.io/docs/intro/). By way of apology for the unstable API, at least one new page of documentation will be added every time a breaking change is released during the beta period.

## Caveats and limitations

**WARNING: THE API IS UNSTABLE AND MAY CHANGE BETWEEN MINOR VERSIONS**

ContractCase is now available and should work for both client and server driven http/https
contracts. Feedback on the ContractCase API / DSL and (especially) naming
conventions very welcome. However, the following caveats should be kept in mind:

1. ContractCase is currently only available in Javascript / Typescript and Java. At a later date, support for Python, C# and Go will be added. There are no plans to add other languages at this time.
1. ContractCase doesn't yet support merging of contracts. This means that your whole contract must be defined in one test file.
1. ContractCase currently is only compatible with Jest (js/ts) and JUnit (java).
1. ContractCase currently only has minimal broker support. It supports the Pact
   broker, although the Pact broker isn't able to render ContractCase contracts
   yet.

Although the test coverage is high, and great care has been taken to ensure that the results are correct, there may still be bugs. Please open an issue if you experience any problems.

If you want to get started immediately, we recommend starting with either the [client-driven end-to-end test](src/index.http.requestingCDC.spec.ts), or the [server-driven end-to-end test](src/index.http.respondingPDC.spec.ts). Make sure you remove `printResults: false`.

You can follow the detailed progress by reading the [maintainer todo list](./docs/maintainers/todo.md). These caveats will be updated as progress is made.

## For Pact users

ContractCase has a very similar philosophy to Pact, and to maximise Pact
compatibility, ContractCase works with the Pact broker. We
recommend either:

ContractCase is easier to extend, can express
more complex contracts, doesn't restrict where you can use matchers when
defining request / response pairs, and can define contracts at either the server
side or the client side (although it is always consumer driven - your consumer just might be consuming _requests_). See [for Pact users](https://case.contract-testing.io/docs/Alternatives/differences-to-pact) for more discussion.

- The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
- The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

## Internal package versions:

Command line interface::

[![npm](https://img.shields.io/npm/v/@contract-case/cli.svg?label=cli%3A%20npm)](https://www.npmjs.com/package/@contract-case/cli)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=packages/contract-case-cli/package.json)](https://snyk.io/test/github/case-contract-testing/contract-case/?targetFile=packages/contract-case-cli/package.json)

Definition DSL packages:

[![npm](https://img.shields.io/npm/v/@contract-case/case-definition-dsl.svg?label=case-definition-dsl%3A%20npm)](https://www.npmjs.com/package/@contract-case/case-definition-dsl)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=packages/case-definition-dsl/package.json)](https://snyk.io/test/github/case-contract-testing/contract-case/?targetFile=packages/case-definition-dsl/package.json)
![Maven Central](https://img.shields.io/maven-central/v/io.contract-testing.contractcase/definitions?label=definitions%3A%20maven)

Connector Packages:

[![npm](https://img.shields.io/npm/v/@contract-case/case-connector.svg?label=case-connector%3A%20npm)](https://www.npmjs.com/package/@contract-case/case-connector)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=packages/case-connector/package.json)](https://snyk.io/test/github/case-contract-testing/contract-case?targetFile=packages/case-connector/package.json)

Core Package:

[![npm](https://img.shields.io/npm/v/@contract-case/case-core.svg)](https://www.npmjs.com/package/@contract-case/case-core)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=packages/case-core/package.json)](https://snyk.io/test/github/case-contract-testing/contract-case/?targetFile=packages/case-core/package.json)

## Roadmap

1. Pact Parity (complete)
2. Server driven contracts (complete)
3. Plugins and arbitrary extensions (complete)
4. Documentation (in progress)
5. gRPC matchers
6. Support Python, C# and Go
7. Arbitrary combinations of request/response pairs, incidentally including native SQS support
8. Pass-through APIs

For the gory details, you can see the implementation notebook / todo list [here](docs/maintainers/todo.md)

<!--- cspell:dictionaries !html --->
