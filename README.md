# Case Contract Testing Framework

[![Build and test](https://github.com/TimothyJones/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/TimothyJones/case/actions/workflows/build-and-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/TimothyJones/case/badge.svg?branch=main)](https://coveralls.io/github/TimothyJones/case?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/TimothyJones/case/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TimothyJones/case?targetFile=package.json)

[![npm](https://img.shields.io/npm/v/@case-contract-testing/case.svg)](https://www.npmjs.com/package/@case-contract-testing/case)

<span align="center">

![Case](https://github.com/TimothyJones/case/raw/main/docs/suitcase.png)

<sub>[Briefcase sticker created by Gohsantosadrive on Flaticon](https://www.flaticon.com/free-stickers/law)</sub>

</span>

Read the [documentation here](https://github.com/TimothyJones/case/blob/main/docs/users/what-is-contract-testing.md).

Case is a next-generation consumer-driven contract testing framework, building
on many of the lessons from maintaining the excellent [Pact](pact.io) contract testing
framework. It is our belief that contract testing is the best way to get
deployment confidence for your applications and services.

Case releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, Case is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Patch versions will always be backwards compatible.

## Caveats and limitations

Breaking changes will always be detailed in the [changelog](./CHANGELOG.md)

**WARNING: THE API IS UNSTABLE AND MAY CHANGE BETWEEN MINOR VERSIONS**

Work in progress, use at your own risk.

The API is considered unstable because we'd like to ensure that it's ergonomic
and intuitive for users. Feedback on the Case API / DSL and (especially) naming
conventions very welcome.

Case is now available and should work for both client and server driven http/https
contracts. However, the following caveats should be kept in mind:

1. Case is currently only available in Javascript / Typescript. At a later date, support for Python, Java, C# and Go will be added, using [JSii](https://aws.github.io/jsii/). There are no plans to add other languages at this time.
1. Case doesn't yet support merging of contracts. This means that your whole contract must be defined in one test file.
1. Case currently is only compatible with Jest. At a later date, the jest support will be extracted, and the peer-dependency removed.
1. Case is currently only compatible with the Pactflow broker, and not the Pact Open Source broker. This is because it only supports bearer authentication.
1. Case currently doesn't support reporting your results to a broker.
1. Case currently doesn't support retrieving your contracts from a broker.
1. Although the test coverage is high, and great care has been taken to ensure that the results are correct, there may still be bugs. Please open an issue if you experience any problems.
1. Incomplete [documentation is here](https://github.com/TimothyJones/case/blob/main/docs/users/what-is-contract-testing.md). At least one new page will be added every time a breaking change is released during the beta period.
1. If you want to get started immediately, we recommend starting with either the [client-driven end-to-end test](src/index.http.requestingCDC.spec.ts), or the [server-driven end-to-end test](src/index.http.respondingPDC.spec.ts). Make sure you remove `printResults: false`.

You can follow the detailed progress by reading the [maintainer todo list](./docs/maintainers/todo.md). These caveats will be updated as progress is made.

### I'm fine with all the caveats, how do I get started?

```
npm install --save-dev @case-contract-testing/case
```

You may also need the peer dependencies:

```
npm install --save-dev jest@^29.4.3
```

## For Pact users

> _TODO: Pull this section out and expand into detailled documentation_

Case is intended to solve some of the pain points when using Pact - if
you are not hitting those pain points, there is no need to switch to using Case (unless
you want to or something).

Case has a very similar philosophy to Pact. You write your pacts as a contract, which is a series of examples.

Like Pact, Case requires a broker to operate. To maximise Pact compatibility, Case works with the Pact broker. We
recommend either:

- The [Pact Broker](https://github.com/pact-foundation/pact_broker) for users wanting to host their own broke
- The excellent [Pactflow Broker](https://pactflow.io) for those needing SaaS and enterprise features

We plan for Case to always be compatible with both of these brokers.

## Feature differences from Pact

- Drive contracts from the client or the server. Case is always consumer-driven, but what you are consuming might be a request, instead of a response.
  - Example [client-driven end-to-end test](src/index.http.requestingCDC.spec.ts)
  - Example [server-driven end-to-end test](src/index.http.respondingPDC.spec.ts)
- Contract verification is an individual test in your test suite per interaction, rather than one test for all interactions. This provides much more granular feedback
- All matchers are valid in all contexts
- Currently it only supports Javascript / Typescript, with Jest

## Planned differences

- Native message formats - actually invoke SQS queues / kafka messages etc during verification
- Easy user extensions - write extensions for Case just by extending a class in JS, Python, Go or Java

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
