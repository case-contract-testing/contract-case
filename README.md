# Case Contract Testing Framework

[![Build and test](https://github.com/TimothyJones/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/TimothyJones/case/actions/workflows/build-and-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/TimothyJones/case/badge.svg?branch=main)](https://coveralls.io/github/TimothyJones/case?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/TimothyJones/case/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TimothyJones/case?targetFile=package.json)

Work in progress, use at your own risk. Expected ready for beta testing: Feb 2023.

<span align="center">

![Case](/docs/suitcase.png)

<sub>[Briefcase sticker created by Gohsantosadrive on Flaticon](https://www.flaticon.com/free-stickers/law)</sub>

</span>

Case is a next-generation consumer-driven contract testing framework, building
on many of the lessons from maintaining the excellent [Pact](pact.io) contract testing
framework. It is our belief that contract testing is the best way to get
deployment confidence for your applications and services.

Documentation and beta release coming soon

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
-

## Roadmap

1. Pact Parity (in progress, close to complete)
2. "Provider" driven contracts (done)
3. Documentation (in progress)
4. RELEASE BETA
5. Support Python, C# and Go
6. Arbitrary combinations of req/resp pairs, incidentally including native SQS support
7. Passthrough APIs
8. Plugins and arbitrary extensions

For the gory details, you can see the implementation notebook / todo list [here](docs/maintainers/todo.md)
