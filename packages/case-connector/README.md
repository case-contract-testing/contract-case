# Case-Connector

[![Build and test](https://github.com/case-contract-testing/contract-case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/contract-case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contract-case/badge.svg?targetFile=packages/case-connector/package.json)](https://snyk.io/test/github/case-contract-testing/contract-case?targetFile=packages/case-connector/package.json)

This is the server connector (formerly case-boundary) to allow ContractCase to be run as a server.

If you're wanting to learn about ContractCase, [start here instead](https://case.contract-testing.io/docs/intro)

Don't depend on this directly unless you are writing a custom wrapper for ContractCase.

This package exists to work around [this JSii](https://github.com/aws/jsii/issues/4133)
bug, by exposing the communication layer as a gRPC service.

Additionally, it exposes the boundary layer as `@contract-case/case-connector` for ESM imports, and `@contract-case/case-connector/cjs` for CJS imports.

For details of the protocol schema, see the case-connector-proto package.

## Authentication

The connector binds to the loopback interface only, on a free port that it
announces on stdout in the form:

```
[SERVER] Started on port: <PORT>
```

To prevent other local processes from connecting to it, wrappers must
generate an unguessable random token and pass it to the connector process via
the `CASE_CONNECTOR_TOKEN` environment variable. The connector rejects (with
`UNAUTHENTICATED`) any call that doesn't present the same token in the
`authorization` metadata of the gRPC call.

If `CASE_CONNECTOR_TOKEN` is not set, the connector refuses to start. This
means the connector always requires a compatible wrapper (any wrapper released
after the token was introduced).
