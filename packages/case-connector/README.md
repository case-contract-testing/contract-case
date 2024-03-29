# Case-Connector

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-boundary/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-boundary/package.json)

This is the server connector (alternative to the case-boundary) to allow ContractCase to be run as a server.

If you're wanting to learn about ContractCase, [start here instead](https://case.contract-testing.io/docs/intro)

Don't depend on this directly unless you are writing a custom wrapper for ContractCase.

This package exists to work around [this JSii](https://github.com/aws/jsii/issues/4133)
bug, by exposing the communication layer as a gRPC service.

See the proto file [here in the proto directory](./proto/contract_case_stream.proto).
