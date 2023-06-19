# Changelog

## [0.14.0](https://github.com/case-contract-testing/contract-case/compare/v0.13.0...v0.14.0) (2023-06-19)


### ⚠ BREAKING CHANGES

* Only expose types in modules. Root imports will need to be updated to include the module name

### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/case-contract-testing/contract-case/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))
* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))
* Remove unused dependencies ([7e51170](https://github.com/case-contract-testing/contract-case/commit/7e511705f71ecb4697375c13d394ba88701441f0))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))


### Code Refactoring

* Only expose types in modules. Root imports will need to be updated to include the module name ([015dc7a](https://github.com/case-contract-testing/contract-case/commit/015dc7a449805920a5c08cc54ca486ec8bcbc888))

## [0.13.0](https://github.com/case-contract-testing/contract-case/compare/v0.12.2...v0.13.0) (2023-06-09)


### ⚠ BREAKING CHANGES

* Only expose types in modules. Root imports will need to be updated to include the module name

### Bug Fixes

* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))
* Remove unused dependencies ([7e51170](https://github.com/case-contract-testing/contract-case/commit/7e511705f71ecb4697375c13d394ba88701441f0))


### Code Refactoring

* Only expose types in modules. Root imports will need to be updated to include the module name ([015dc7a](https://github.com/case-contract-testing/contract-case/commit/015dc7a449805920a5c08cc54ca486ec8bcbc888))

## [0.12.2](https://github.com/case-contract-testing/contract-case/compare/v0.12.1...v0.12.2) (2023-06-01)


### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/case-contract-testing/contract-case/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))

## [0.12.1](https://github.com/TimothyJones/ContractCaseTest/compare/v0.12.0...v0.12.1) (2023-05-19)


### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/TimothyJones/ContractCaseTest/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))

## [0.12.0](https://github.com/case-contract-testing/contract-case/compare/v0.11.0...v0.12.0) (2023-05-17)


### ⚠ BREAKING CHANGES

* Add new constructor parameter to allow parents to pass in their version number for debugging. Any uses of the Contract* classes will need to be updated to provide an array of parent package version strings

### Features

* Add new constructor parameter to allow parents to pass in their version number for debugging. Any uses of the Contract* classes will need to be updated to provide an array of parent package version strings ([93485eb](https://github.com/case-contract-testing/contract-case/commit/93485eb9c2cd4f83f5119a3283ea8b4ac8dbdf99))
* Pass version info through to logger ([a6dc4f7](https://github.com/case-contract-testing/contract-case/commit/a6dc4f73a176552d779eabba9273e78f0979b5af))

## [0.11.0](https://github.com/case-contract-testing/contract-case/compare/ContractCase-All-Core-Packages-v0.3.0...ContractCase-All-Core-Packages-v0.11.0) (2023-05-09)


### ⚠ BREAKING CHANGES

* Remove ContractDefiner and ContractVerifier boundaries. Please use @contract-case/case-boundary instead.
* Remove jest DSL. Please use @contract-case/contract-case-jest instead.
* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/contract-case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/contract-case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add cli package ([600c429](https://github.com/case-contract-testing/contract-case/commit/600c4298089cfc8bc34a50cd4bf3cacf920b75ad))
* Add crash messages when the core fails ([8147c9d](https://github.com/case-contract-testing/contract-case/commit/8147c9d59183d31c212fbba31f468f2b0b2c4a58))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/contract-case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/contract-case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/contract-case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/contract-case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/contract-case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/contract-case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/contract-case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/contract-case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/contract-case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/contract-case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/contract-case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/contract-case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/contract-case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/contract-case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/contract-case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/contract-case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/contract-case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/contract-case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce BrokerError and expose it ([6fc09ba](https://github.com/case-contract-testing/contract-case/commit/6fc09ba2bd9c2eac360e1f7c47c12fe88f9927cd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/contract-case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))
* Map errors appropriately at the boundary ([c9df9ff](https://github.com/case-contract-testing/contract-case/commit/c9df9ffa16aa68183b8410b25c37e6cc03f36182))
* Remove ContractDefiner and ContractVerifier boundaries. Please use @contract-case/case-boundary instead. ([b560086](https://github.com/case-contract-testing/contract-case/commit/b560086eb1676f357ba4e32d5b734a7a29aa5ea8))
* Remove jest DSL. Please use @contract-case/contract-case-jest instead. ([5ae33bb](https://github.com/case-contract-testing/contract-case/commit/5ae33bbebfbe416331d4ba01e55f613302409e24))
* Substantially improve options parsing for ContractCase CLI ([30085ae](https://github.com/case-contract-testing/contract-case/commit/30085aeb878b84885578f3a5341be1d091d5b984))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/contract-case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/contract-case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/contract-case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/contract-case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/contract-case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Correct issue where verifier didn't pass down all invoker properties ([238b42b](https://github.com/case-contract-testing/contract-case/commit/238b42b87a07abb5ceca337fd9c8459167a13092))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/contract-case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Correct problem where not having a broker CI token would not fail the publish ([b22d956](https://github.com/case-contract-testing/contract-case/commit/b22d9565f60a474890aa9fd7962294e87f88d23d))
* Don't throw configuration errors for missing broker details when publish=NEVER ([4893bc3](https://github.com/case-contract-testing/contract-case/commit/4893bc306fb4d4943d4f7be9b9baab76313b5a2e))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/contract-case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Fix a bug where configuration from environment variables was ignored during contract definition ([2fe5d32](https://github.com/case-contract-testing/contract-case/commit/2fe5d328b2e63e731b7969b63cb1156b668d139c))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/contract-case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/contract-case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/contract-case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/contract-case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/contract-case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/contract-case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/contract-case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/contract-case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/case-contract-testing/contract-case/commit/d6bc4dda780f1836b18640b49882115edee19c42))
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/contract-case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.3.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.2.0...contract-case-v0.3.0) (2023-05-08)


### ⚠ BREAKING CHANGES

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package

### Features

* Add crash messages when the core fails ([8147c9d](https://github.com/case-contract-testing/case/commit/8147c9d59183d31c212fbba31f468f2b0b2c4a58))
* Map errors appropriately at the boundary ([c9df9ff](https://github.com/case-contract-testing/case/commit/c9df9ffa16aa68183b8410b25c37e6cc03f36182))


### Bug Fixes

* Correct problem where not having a broker CI token would not fail the publish ([b22d956](https://github.com/case-contract-testing/case/commit/b22d9565f60a474890aa9fd7962294e87f88d23d))
* Don't throw configuration errors for missing broker details when publish=NEVER ([4893bc3](https://github.com/case-contract-testing/case/commit/4893bc306fb4d4943d4f7be9b9baab76313b5a2e))


### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/case-contract-testing/case/commit/d6bc4dda780f1836b18640b49882115edee19c42))

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
