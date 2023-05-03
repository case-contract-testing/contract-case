# Changelog

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/test-equivalence-matchers bumped from 0.0.3 to 0.0.4

## [0.3.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-boundary-v0.2.0...@contract-case/case-boundary-v0.3.0) (2023-05-03)


### ⚠ BREAKING CHANGES

* Prefix Result Success/Failure etc classes with Boundary
* Rename ContractDefiner -> BoundaryContractDefiner
* Rename StateHandler -> BoundaryStateHandler and StateHandlerWithTeardown -> BoundaryStateHandlerWithTeardown
* Rename ContractCaseConfig -> ContractCaseBoundaryConfig

### Features

* Add classes for ContractVerifier boundary ([b2a48e5](https://github.com/case-contract-testing/case/commit/b2a48e51b4b7424e351ad15d3eb1870f686000af))
* Rename exposed types to better reflect their purpose. See the documentation for details. ([6198a77](https://github.com/case-contract-testing/case/commit/6198a77b681ca3aa579037d10ea788dd342a4e98))


### Bug Fixes

* Correct issue where triggers wouldn't get the configuration information ([d5e789c](https://github.com/case-contract-testing/case/commit/d5e789cbc1f7d8e5dba8468152bf19bb57a3f1ba))
* Correct problem where logLevel: undefined would be passed down if none was specified ([42cd0e2](https://github.com/case-contract-testing/case/commit/42cd0e2d1a558b6ce2f1c0439df8da3d523dfacc))
* Temporarily poke through the server under test baseURL in config. Later on this will be a generic mock config path ([84d8ad0](https://github.com/case-contract-testing/case/commit/84d8ad017cbdd251fc506530125e5fc73eb7eebc))


### Code Refactoring

* Prefix Result Success/Failure etc classes with Boundary ([4610bb6](https://github.com/case-contract-testing/case/commit/4610bb6fc600e5350f4d365d2ea0063ae4658157))
* Rename ContractCaseConfig -&gt; ContractCaseBoundaryConfig ([b334ab0](https://github.com/case-contract-testing/case/commit/b334ab0812b5bfabe104dcb991f43d5ad50063ba))
* Rename ContractDefiner -&gt; BoundaryContractDefiner ([a04d74e](https://github.com/case-contract-testing/case/commit/a04d74e5e63d0035af9522b2eee64b9e2a0bbf5e))
* Rename StateHandler -&gt; BoundaryStateHandler and StateHandlerWithTeardown -> BoundaryStateHandlerWithTeardown ([e888fc6](https://github.com/case-contract-testing/case/commit/e888fc6e2828dea261c73385acbc5888b29fc649))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.9.0 to 0.9.1
    * @contract-case/case-entities-internal bumped from 0.9.0 to 0.9.1
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.9.0 to 0.9.1

## [0.2.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-boundary-v0.1.2...@contract-case/case-boundary-v0.2.0) (2023-04-26)


### ⚠ BREAKING CHANGES

* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner
* Change return type of ILogPrinter to Result

### Features

* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner ([f5583d2](https://github.com/case-contract-testing/case/commit/f5583d240df98849eb1e55e4655b789afa600e5e))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add SuccessWithAny result type ([d566a7f](https://github.com/case-contract-testing/case/commit/d566a7fb7c33451214f2159588c86b2b11a232b2))
* Add types for triggerAndTest ([3609024](https://github.com/case-contract-testing/case/commit/360902447e6dcc7e0cd4bd200d27d35d1e56223a))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Change return type of ILogPrinter to Result ([43b3d9c](https://github.com/case-contract-testing/case/commit/43b3d9c3a1e2baa5971b01b9064df790368b087a))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))


### Bug Fixes

* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.8.0 to 0.9.0
    * @contract-case/case-entities-internal bumped from 0.8.0 to 0.9.0
    * @contract-case/test-equivalence-matchers bumped from 0.0.4 to 0.9.0

## [0.1.1](https://github.com/case-contract-testing/case/compare/case-boundary-v0.1.0...case-boundary-v0.1.1) (2023-04-19)


### Bug Fixes

* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/test-equivalence-matchers bumped from 0.0.2 to 0.0.3

## [0.1.0](https://github.com/case-contract-testing/case/compare/case-boundary-v0.0.1...case-boundary-v0.1.0) (2023-04-19)


### ⚠ BREAKING CHANGES

* Change return type of ILogPrinter to Result

### Features

* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add SuccessWithAny result type ([d566a7f](https://github.com/case-contract-testing/case/commit/d566a7fb7c33451214f2159588c86b2b11a232b2))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Change return type of ILogPrinter to Result ([43b3d9c](https://github.com/case-contract-testing/case/commit/43b3d9c3a1e2baa5971b01b9064df790368b087a))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from * to 0.8.0
    * @contract-case/case-entities-internal bumped from * to 0.8.0
    * @contract-case/test-equivalence-matchers bumped from * to 0.0.2
