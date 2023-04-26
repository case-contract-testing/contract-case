# Changelog

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/test-equivalence-matchers bumped from 0.0.3 to 0.0.4

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
