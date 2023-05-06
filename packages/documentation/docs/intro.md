---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# ContractCase Contract Testing Suite

ContractCase is a next-generation consumer-driven contract testing framework, building
on many of the lessons from maintaining the excellent [Pact](https://pact.io) contract testing
framework. Contract testing an effective way to get
deployment confidence for your applications and services, giving much faster and more actionable feedback than any of the [other approaches](./Alternatives).

<div style={{textAlign: 'center'}}>
    <div>

![Briefcase image](./suitcase.png)

</div>
    <div style={{fontSize: 'small'}}>Briefcase sticker created by <a href="https://www.flaticon.com/free-stickers/law">Gohsantosadrive on Flaticon</a></div>
</div>

## First time here?

New to contract testing? Have a read of [what is contract testing](./what-is-contract-testing), then follow on with [defining contracts](./defining-contracts).

If you're already familiar with Pact, you might be interested in the section written [for users coming from Pact](./Alternatives/differences-to-pact).

## Versioning

ContractCase releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, ContractCase is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Patch versions will always be backwards compatible.

Breaking changes will always be detailed in the [changelog](https://github.com/case-contract-testing/case/blob/main/CHANGELOG.md).

Incomplete documentation is in the sidebar on your left (or at the bottom on
mobile). By way of apology for any breaking changes, at least one new page of
documentation will be added every time a breaking change is released during the
beta period.

## Caveats and limitations

ContractCase is now available and should work for both client and server driven http/https
contracts. Feedback on the ContractCase API / DSL and (especially) naming
conventions very welcome. However, the following caveats should be kept in mind:

1. ContractCase doesn't yet support merging of contracts. This means that your whole contract must be defined in one test file.
1. ContractCase currently only has rudimentary support for the contract broker. It works, but it's not very configurable yet - if you have a use case that isn't yet supported and you'd like it prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new).
1. ContractCase currently is only compatible with Jest. At a later date, the jest support will be extracted, and the peer-dependency removed.

Although the test coverage is high, and great care has been taken to ensure that the results are correct, there may still be bugs. Please open an issue if you experience any problems.

ContractCase is currently only available in Javascript / Typescript. At a later date, support for Python, Java, C# and Go will be added, using [JSii](https://aws.github.io/jsii/). There are no plans to add other languages at this time.

These caveats will be updated as progress is made. You can follow the detailed
progress by reading the [maintainer todo
list](https://github.com/case-contract-testing/case/blob/main/docs/maintainers/todo.md).

:::danger
**THE API IS UNSTABLE AND BREAKING CHANGES WILL HAPPEN IN MINOR VERSIONS BEFORE 1.0.0 IS RELEASED**
:::

### I'm fine with all the caveats, how do I get started?

```
npm install --save-dev @contract-case/contract-case-jest
```

You may also need the peer dependencies:

```
npm install --save-dev jest@^29.4.3
```

If you just want to jump in to some examples, you can have a read of:

- The [client-driven contract definition](https://github.com/case-contract-testing/case/blob/main/packages/case-core/src/index.http.client.define.spec.ts)
- The [client-driven contract verification](https://github.com/case-contract-testing/case/blob/main//packages/case-core/src/index.http.client.verify.spec.ts)
- The [server-driven contract definition](https://github.com/case-contract-testing/case/blob/main/packages/case-core/src/index.http.server.define.ts)
- The [server-driven contract verification](https://github.com/case-contract-testing/case/blob/main/packages/case-core/src/index.http.server.verify.spec.ts).

If you build on those examples, make sure you remove `printResults: false` and `logLevel: none`.

You will probably have a better time if you read the documentation on [what is contract testing](./what-is-contract-testing) and [defining contracts](./defining-contracts) first, though.
