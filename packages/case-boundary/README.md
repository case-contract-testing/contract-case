# Case-Boundary-Internal

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-boundary/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-boundary/package.json)

This is the [JSii](https://aws.github.io/jsii/user-guides/lib-author/toolchain/jsii/) layer that is the exported interface for ContractCase.

However, because of [a bug preventing servers from running](https://github.com/aws/jsii/issues/4133), communication with wrapper libraries is provided by @contract-case/case-connector instead.

Don't depend on this directly unless you are writing a _very_ custom wrapper for ContractCase. If you're just writing a regular wrapper for ContractCase, you probably want [@contract-case/case-connector](https://www.npmjs.com/package/@contract-case/case-connector).

Otherwise, if you're looking to use ContractCase for testing, [start here instead](https://case.contract-testing.io/docs/intro)
