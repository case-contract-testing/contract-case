---
sidebar_label: 'Comparison with other approaches'
title: 'Alternatives to contract testing'
sidebar_position: 10
---

The three main alternatives to contract testing are end-to-end tests, schema
tests, and mocking. Here we discuss the advantages and disadvantages that
contract testing has over those approaches.

- End-to-end integration tests. If you want to do end-to-end tests for
  confidence that you can safely deploy service X, then, you need to do an
  end-to-end test with exactly what will be in production at the time that
  service X will deploy. Most teams doing this at scale keep a copy of the
  production environment, which is usually not the same as what will be in
  production at deployment time (because of other deployments and race
  conditions in the pipeline). For more on this, read [contract testing vs end to end tests](./contract-testing-vs-e2e.md).
- Schema tests. In some frameworks (eg [gRPC](https://grpc.io/) or
  [GraphQL](https://graphql.org/), or certain uses of [OpenAPI
  Specification](https://spec.openapis.org/oas/latest.html)) a schema is used to
  keep the communications compatible. This approach has two problems - firstly,
  you still need a way to keep track of what is deployed to make sure that
  compatible versions of the schema are used on each side, and secondly a
  message might be schema compatible but not have any meaning (for example, when
  a schema can't be used to express inter-dependent fields, optional fields are
  often used instead. This results in syntactically valid but incorrect
  messages). For more on this, please see [contract testing vs schema tests](./contract-testing-vs-schema.md).
- Mocking your service's dependencies. With a mock (sometimes called a test
  double), you define the expected behaviour of your service's dependencies.
  However, the real service may not actually behave this way. If your team
  defines this mock behaviour, then you are marking your own exam.

> This [excellent and comprehensive article](https://martinfowler.com/articles/consumerDrivenContracts.html) by Ian
> Robinson is a great write-up of the different types of tests for ensuring services are able to communicate with each other.

### Contract testing may not be for you

While we think that contract testing is the best way to provide deployment confidence, it's not the only way, and it is not a silver bullet.

If you don't experience any downtime because of breaking API changes, and you
are confident that your existing test strategies prevent API breaking changes or
other communication issues from reaching production, then you might not need
contract testing. Similarly, if you have a way of using one of the three
alternatives that mitigates the disadvantages discussed above, then you probably
don't need contract testing.

### Contract testing may be for you

If you want:

- Confidence that the service you are about to deploy can communicate with its dependants and dependencies
- Fast feedback about API compatibility
- Asynchronous tests that don't require syncing calendars to organise your automated testing

It also enables:

- No need for deep end-to-end tests, meaning that your end-to-end tests can
  focus on light-touch feature tests, and manual tests can focus on looking for issues that
  can't be automated
