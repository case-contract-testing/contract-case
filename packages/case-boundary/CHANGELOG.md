# Changelog

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/test-equivalence-matchers bumped from 0.0.3 to 0.0.4

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.12.0 to 0.12.1
    * @contract-case/case-entities-internal bumped from 0.12.0 to 0.12.1
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.12.0 to 0.12.1

## [0.9.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.9.0...@contract-case/case-boundary-v0.9.1) (2024-01-06)


### Bug Fixes

* Bump version of case-core ([d12f086](https://github.com/case-contract-testing/contract-case/commit/d12f0863addd9948c4d08cd6fad9d8f7b25f408e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.15.0 to 0.15.1
    * @contract-case/case-entities-internal bumped from 0.15.0 to 0.15.1

## [0.9.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.8.0...@contract-case/case-boundary-v0.9.0) (2023-12-25)


### ⚠ BREAKING CHANGES

* Now all loggers and printers return promises, to better reflect that there is a boundary crossed
* Tighten boundary types now that this module is no longer translated with jsii

### Bug Fixes

* Slightly improve boundary documentation ([ccf8645](https://github.com/case-contract-testing/contract-case/commit/ccf8645a8442cb21fc167299d45f2623958c5048))


### Code Refactoring

* Now all loggers and printers return promises, to better reflect that there is a boundary crossed ([14a9365](https://github.com/case-contract-testing/contract-case/commit/14a9365d6f873c352dadff539b7d8b67946412d0))
* Tighten boundary types now that this module is no longer translated with jsii ([53ef989](https://github.com/case-contract-testing/contract-case/commit/53ef989e8d8bac1f2acdb1c13a8f88545ff82038))

## [0.8.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.7.0...@contract-case/case-boundary-v0.8.0) (2023-10-11)


### ⚠ BREAKING CHANGES

* Remove JSii from case-boundary since it blocks the node thread, and was causing complle errors

### Features

* Add `ConfigLogLevelConstants` to expose log levels ([71bad6d](https://github.com/case-contract-testing/contract-case/commit/71bad6d936ebbcd0560850783ab2526ca8fcf2f9))
* Add `ConfigPublishConstants` to expose possible values for the publish config option ([3c2953e](https://github.com/case-contract-testing/contract-case/commit/3c2953e3d0cb63c40bd8fe73a1679ba9b55abcfb))
* Add developer documentation ([e855d61](https://github.com/case-contract-testing/contract-case/commit/e855d61f9615ca31f02762e780fe3dfa592b07e3))


### Bug Fixes

* Add documentation for the ContractVerifier class ([3c5bea3](https://github.com/case-contract-testing/contract-case/commit/3c5bea326d890c9619aab595998a813bc921f83f))
* Correct boundary config tsdoc documentation ([8d64490](https://github.com/case-contract-testing/contract-case/commit/8d64490578cd1035dbc9643e0740e5d2a8cd4221))
* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))
* Remove JSii from case-boundary since it blocks the node thread, and was causing complle errors ([a81a5d3](https://github.com/case-contract-testing/contract-case/commit/a81a5d3939b962cb1ef5dd4f98e973b4fc84987a))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.13.1 to 0.14.0
    * @contract-case/case-entities-internal bumped from 0.13.1 to 0.14.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.2 to 0.0.3
    * @contract-case/eslint-config-case-maintainer bumped from 0.0.2 to 0.0.3
    * @contract-case/test-equivalence-matchers bumped from 0.13.1 to 0.14.0

## [0.7.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.6.3...@contract-case/case-boundary-v0.7.0) (2023-10-11)


### ⚠ BREAKING CHANGES

* Remove JSii from case-boundary since it blocks the node thread, and was causing complle errors

### Features

* Add developer documentation ([e855d61](https://github.com/case-contract-testing/contract-case/commit/e855d61f9615ca31f02762e780fe3dfa592b07e3))


### Bug Fixes

* Remove JSii from case-boundary since it blocks the node thread, and was causing complle errors ([a81a5d3](https://github.com/case-contract-testing/contract-case/commit/a81a5d3939b962cb1ef5dd4f98e973b4fc84987a))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.13.0 to 0.13.1
    * @contract-case/case-entities-internal bumped from 0.13.0 to 0.13.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.1 to 0.0.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.0.1 to 0.0.2
    * @contract-case/test-equivalence-matchers bumped from 0.13.0 to 0.13.1

## [0.6.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.6.2...@contract-case/case-boundary-v0.6.3) (2023-06-09)


### Bug Fixes

* Correct boundary config tsdoc documentation ([8d64490](https://github.com/case-contract-testing/contract-case/commit/8d64490578cd1035dbc9643e0740e5d2a8cd4221))
* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.12.2 to 0.13.0
    * @contract-case/case-entities-internal bumped from 0.12.2 to 0.13.0
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.12.2 to 0.13.0

## [0.6.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.6.1...@contract-case/case-boundary-v0.6.2) (2023-06-01)


### Features

* Add `ConfigLogLevelConstants` to expose log levels ([71bad6d](https://github.com/case-contract-testing/contract-case/commit/71bad6d936ebbcd0560850783ab2526ca8fcf2f9))
* Add `ConfigPublishConstants` to expose possible values for the publish config option ([3c2953e](https://github.com/case-contract-testing/contract-case/commit/3c2953e3d0cb63c40bd8fe73a1679ba9b55abcfb))


### Bug Fixes

* Add documentation for the ContractVerifier class ([3c5bea3](https://github.com/case-contract-testing/contract-case/commit/3c5bea326d890c9619aab595998a813bc921f83f))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.12.1 to 0.12.2
    * @contract-case/case-entities-internal bumped from 0.12.1 to 0.12.2
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.12.1 to 0.12.2

## [0.6.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.5.1...@contract-case/case-boundary-v0.6.0) (2023-05-17)


### ⚠ BREAKING CHANGES

* Add parentVersions array to the constructor to allow consuming packages to tell the core what their versions are (useful in logs). Callers will need to be updated to provide this array.

### Features

* Pass version info through to logger ([a6dc4f7](https://github.com/case-contract-testing/contract-case/commit/a6dc4f73a176552d779eabba9273e78f0979b5af))


### Code Refactoring

* Add parentVersions array to the constructor to allow consuming packages to tell the core what their versions are (useful in logs). Callers will need to be updated to provide this array. ([e2875d4](https://github.com/case-contract-testing/contract-case/commit/e2875d47337daaabe63500cc63bee8a15ebeebbd))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.11.0 to 0.12.0
    * @contract-case/case-entities-internal bumped from 0.11.0 to 0.12.0
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.11.0 to 0.12.0

## [0.5.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-boundary-v0.5.0...@contract-case/case-boundary-v0.5.1) (2023-05-09)


### Features

* Expose BrokerError on the BoundaryFailureKindConstants object ([f1869d3](https://github.com/case-contract-testing/contract-case/commit/f1869d38e96182edb912ce6c98b028239e8469cd))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.10.1 to 0.11.0

## [0.5.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-boundary-v0.4.0...@contract-case/case-boundary-v0.5.0) (2023-05-08)


### ⚠ BREAKING CHANGES

* Rename ResultTypeConstants to BoundaryResultTypeConstants for consistency

### Features

* Add crash messages when the core fails ([8147c9d](https://github.com/case-contract-testing/case/commit/8147c9d59183d31c212fbba31f468f2b0b2c4a58))
* Expose FailureKindConstants so consumers can tell the difference between different types of failures that ContractCase emits ([e15507d](https://github.com/case-contract-testing/case/commit/e15507d432fb83de4bf19c7f2738727dcd803767))


### Code Refactoring

* Rename ResultTypeConstants to BoundaryResultTypeConstants for consistency ([29fd4d3](https://github.com/case-contract-testing/case/commit/29fd4d37e54c73256ab9d48e4e4ff5c67955c661))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.10.0 to 0.10.1
    * @contract-case/case-entities-internal bumped from 0.10.0 to 0.11.0
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.10.0 to 0.11.0

## [0.4.0](https://github.com/case-contract-testing/case/compare/@contract-case/case-boundary-v0.3.0...@contract-case/case-boundary-v0.4.0) (2023-05-06)


### ⚠ BREAKING CHANGES

* Prefix Result Success/Failure etc classes with Boundary
* Rename ContractDefiner -> BoundaryContractDefiner
* Rename StateHandler -> BoundaryStateHandler and StateHandlerWithTeardown -> BoundaryStateHandlerWithTeardown
* Rename ContractCaseConfig -> ContractCaseBoundaryConfig
* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner
* Change return type of ILogPrinter to Result

### Features

* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner ([f5583d2](https://github.com/case-contract-testing/case/commit/f5583d240df98849eb1e55e4655b789afa600e5e))
* Add classes for ContractVerifier boundary ([b2a48e5](https://github.com/case-contract-testing/case/commit/b2a48e51b4b7424e351ad15d3eb1870f686000af))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add SuccessWithAny result type ([d566a7f](https://github.com/case-contract-testing/case/commit/d566a7fb7c33451214f2159588c86b2b11a232b2))
* Add types for triggerAndTest ([3609024](https://github.com/case-contract-testing/case/commit/360902447e6dcc7e0cd4bd200d27d35d1e56223a))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Change return type of ILogPrinter to Result ([43b3d9c](https://github.com/case-contract-testing/case/commit/43b3d9c3a1e2baa5971b01b9064df790368b087a))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* Rename exposed types to better reflect their purpose. See the documentation for details. ([6198a77](https://github.com/case-contract-testing/case/commit/6198a77b681ca3aa579037d10ea788dd342a4e98))


### Bug Fixes

* Correct issue where triggers wouldn't get the configuration information ([d5e789c](https://github.com/case-contract-testing/case/commit/d5e789cbc1f7d8e5dba8468152bf19bb57a3f1ba))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Correct problem where logLevel: undefined would be passed down if none was specified ([42cd0e2](https://github.com/case-contract-testing/case/commit/42cd0e2d1a558b6ce2f1c0439df8da3d523dfacc))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Make consumerName optional during verification ([11f4911](https://github.com/case-contract-testing/case/commit/11f4911fdb99168200f47c9c8fcd47f5358b6a02))
* Temporarily poke through the server under test baseURL in config. Later on this will be a generic mock config path ([84d8ad0](https://github.com/case-contract-testing/case/commit/84d8ad017cbdd251fc506530125e5fc73eb7eebc))


### Code Refactoring

* Prefix Result Success/Failure etc classes with Boundary ([4610bb6](https://github.com/case-contract-testing/case/commit/4610bb6fc600e5350f4d365d2ea0063ae4658157))
* Rename ContractCaseConfig -&gt; ContractCaseBoundaryConfig ([b334ab0](https://github.com/case-contract-testing/case/commit/b334ab0812b5bfabe104dcb991f43d5ad50063ba))
* Rename ContractDefiner -&gt; BoundaryContractDefiner ([a04d74e](https://github.com/case-contract-testing/case/commit/a04d74e5e63d0035af9522b2eee64b9e2a0bbf5e))
* Rename StateHandler -&gt; BoundaryStateHandler and StateHandlerWithTeardown -> BoundaryStateHandlerWithTeardown ([e888fc6](https://github.com/case-contract-testing/case/commit/e888fc6e2828dea261c73385acbc5888b29fc649))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.9.1 to 0.10.0
    * @contract-case/case-entities-internal bumped from 0.9.1 to 0.10.0
  * devDependencies
    * @contract-case/test-equivalence-matchers bumped from 0.9.1 to 0.10.0

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
