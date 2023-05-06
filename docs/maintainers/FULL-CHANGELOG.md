# Changelog

## [0.2.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.1.1...contract-case-v0.2.0) (2023-05-06)


### ⚠ BREAKING CHANGES

* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Correct issue where verifier didn't pass down all invoker properties ([238b42b](https://github.com/case-contract-testing/case/commit/238b42b87a07abb5ceca337fd9c8459167a13092))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.1.1](https://github.com/case-contract-testing/case/compare/contract-case-v0.1.0...contract-case-v0.1.1) (2023-05-03)


### Features

* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))


### Bug Fixes

* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))

## [0.1.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.0.1...contract-case-v0.1.0) (2023-04-26)


### ⚠ BREAKING CHANGES

* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Change return type of ILogPrinter to Result
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner ([f5583d2](https://github.com/case-contract-testing/case/commit/f5583d240df98849eb1e55e4655b789afa600e5e))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add SuccessWithAny result type ([d566a7f](https://github.com/case-contract-testing/case/commit/d566a7fb7c33451214f2159588c86b2b11a232b2))
* Add types for triggerAndTest ([3609024](https://github.com/case-contract-testing/case/commit/360902447e6dcc7e0cd4bd200d27d35d1e56223a))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Change return type of ILogPrinter to Result ([43b3d9c](https://github.com/case-contract-testing/case/commit/43b3d9c3a1e2baa5971b01b9064df790368b087a))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))
