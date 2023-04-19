# Changelog

## [0.8.0](https://github.com/case-contract-testing/case/compare/case-core-v0.7.0...case-core-v0.8.0) (2023-04-19)


### ⚠ BREAKING CHANGES

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))


### Bug Fixes

* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-entities-internal bumped from * to 0.8.0
