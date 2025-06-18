# Changelog

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.24.2...@contract-case/dsl-java-v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.24.2 to 0.25.0
    * @contract-case/case-definition-dsl bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.24.1...@contract-case/dsl-java-v0.24.2) (2025-06-11)


### Features

* Add ability to override some configuration advice via adviceOverrides ([ef171e2](https://github.com/case-contract-testing/contract-case/commit/ef171e27225a6db1fd32e9c99c6d8b1ed3bd1a17))


### Bug Fixes

* **boundary:** Fix an issue where state handlers set in the verifier constructor wouldn't be respected ([e5c0528](https://github.com/case-contract-testing/contract-case/commit/e5c05281f52264e7a9e584978ac2e374e4c33306))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.24.1 to 0.24.2
    * @contract-case/case-definition-dsl bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.24.0...@contract-case/dsl-java-v0.24.1) (2025-06-09)


### Bug Fixes

* **java-dsl:** Add a no-argument version of runVerification(). This is a convenience function that implies no overridden configuration. ([8a68081](https://github.com/case-contract-testing/contract-case/commit/8a6808127050f0bdaed4cf292db7f16527a94e65))
* **java-dsl:** Expose RunTestCallback - it was supposed to be exposed before, but was missed. This allows easy customisation of individual verification results ([db82fc3](https://github.com/case-contract-testing/contract-case/commit/db82fc3144ed47875e812bf392e24b077ec56eb9))
* **java-dsl:** Now triggers can throw AssertionErrors if they wish to fail the test, regardless of whether an Exception is expected from the trigger or not ([36d4cfa](https://github.com/case-contract-testing/contract-case/commit/36d4cfa34e14b32f8272fd2ee3edfad5f26a5d97))
* **java-dsl:** Print warning if the verifier hasn't been closed at the time the shutdown hook for the core process is triggered ([00ebe83](https://github.com/case-contract-testing/contract-case/commit/00ebe830a6ed04b67d952158d436728bd62d06b8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.24.0 to 0.24.1
    * @contract-case/case-definition-dsl bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.23.1...@contract-case/dsl-java-v0.24.0) (2025-05-26)


### ⚠ BREAKING CHANGES

* Drop support for node 18, as it is at end-of-life

### Features

* **core,java:** Add user-facing stack traces so that the source of errors is clear ([c8234ad](https://github.com/case-contract-testing/contract-case/commit/c8234adeebfa9bcf764009f5c4cc6c22562eebf6))


### Bug Fixes

* **java-dsl:** Add `throws Exception` to the signature of the response test methods, so you don't need to re-throw exceptions as `RuntimeException` ([4c49cce](https://github.com/case-contract-testing/contract-case/commit/4c49cce3c31b9943c58621b9c17b2324baeb73fa))
* **java-dsl:** Correct the double-wrapping of exceptions, where a failure would be reported twice ([4b8999a](https://github.com/case-contract-testing/contract-case/commit/4b8999a1cb80bad5a6822d2b66d56ce824888556))
* **java-dsl:** Drop unnecessary proto compilation dependencies from the pacakge ([11a0f5e](https://github.com/case-contract-testing/contract-case/commit/11a0f5e980eb2f93df7f9ed4f824feb70bb8a466))
* **java-dsl:** Ensure that JUnit assertions are caught correctly ([27362a0](https://github.com/case-contract-testing/contract-case/commit/27362a0f6675622d7c85ad9147e466a345804a8c))
* **java-dsl:** If an interaction that is supposed to error instead returns successfully, now the object returned is toString()ed in the error message ([3dbc2fe](https://github.com/case-contract-testing/contract-case/commit/3dbc2feab3ea9ea83205f94582a0c0e606d8b7d5))


### Miscellaneous Chores

* Drop support for node 18, as it is at end-of-life ([8cb3160](https://github.com/case-contract-testing/contract-case/commit/8cb3160912b50539b5c76d9e2dbd963f4ce4ade0))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.23.1 to 0.24.0
    * @contract-case/case-definition-dsl bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.23.0...@contract-case/dsl-java-v0.23.1) (2025-05-04)


### Bug Fixes

* **java-dsl:** Fix problem where exceptions thrown in triggers would cause the test to hang ([0e6f686](https://github.com/case-contract-testing/contract-case/commit/0e6f68637445c6d7129bbda19ef40a823111e691))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.23.0 to 0.23.1
    * @contract-case/case-definition-dsl bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.22.0...@contract-case/dsl-java-v0.23.0) (2025-04-28)


### Features

* CaseConnectorErrors now come with an error code that can be used to programatically react to them. See the reference documentation for details. ([dee6d4d](https://github.com/case-contract-testing/contract-case/commit/dee6d4d36219edfad5dfa9f913b1f852666db289))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.22.0 to 0.23.0
    * @contract-case/case-definition-dsl bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.21.0...@contract-case/dsl-java-v0.22.0) (2025-04-14)


### ⚠ BREAKING CHANGES

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change.

### Features

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change. ([b8dcd1f](https://github.com/case-contract-testing/contract-case/commit/b8dcd1f7ed16cfdeda22728da794a66e95f2870c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.21.0 to 0.22.0
    * @contract-case/case-definition-dsl bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.20.1...@contract-case/dsl-java-v0.21.0) (2025-03-25)


### ⚠ BREAKING CHANGES

* **dsl-java:** Move configuration and error classes out to their own packages; you will need to update your imports

### Features

* **dsl-java:** Allow custom log printers to be passed in ([69647d0](https://github.com/case-contract-testing/contract-case/commit/69647d090648a165b111a884424ff0a84c7e8a07))


### Code Refactoring

* **dsl-java:** Move configuration and error classes out to their own packages; you will need to update your imports ([0528878](https://github.com/case-contract-testing/contract-case/commit/0528878c6b611a9b1e6083a9ca5f2073e01f6203))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.20.1 to 0.21.0
    * @contract-case/case-definition-dsl bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.20.0...@contract-case/dsl-java-v0.20.1) (2025-03-22)


### Bug Fixes

* **dsl-java:** Always flush standard error when doing maintenance logs ([85dc3ed](https://github.com/case-contract-testing/contract-case/commit/85dc3eda230a904cf8f9c36493a82ebf24e40740))
* **dsl-java:** Fail fast rather than timing out if the core connection fails ([fcec040](https://github.com/case-contract-testing/contract-case/commit/fcec040699bae850894c530fa60e8e9bedfce1ea))
* **dsl-java:** Fix configuration that caused the retry introduced in the previous version not to be applied ([78ae904](https://github.com/case-contract-testing/contract-case/commit/78ae904ffcf7e5cd4707efd928bf99802ed41f65))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.20.0 to 0.20.1
    * @contract-case/case-definition-dsl bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.19.2...@contract-case/dsl-java-v0.20.0) (2025-03-20)


### Bug Fixes

* **dsl-java:** Retry connection in the event of a failure ([6f4e027](https://github.com/case-contract-testing/contract-case/commit/6f4e0279d90f4aefac48016a4d41756c781db326))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.19.2 to 0.20.0
    * @contract-case/case-definition-dsl bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.19.1...@contract-case/dsl-java-v0.19.2) (2025-03-19)


### Bug Fixes

* **dsl-java:** Add pom to distributed jar, improving behaviour on some build systems ([934ddc9](https://github.com/case-contract-testing/contract-case/commit/934ddc9cb3ba9e7117f91babdf3c0ee115190628))
* **dsl-java:** Improve error messages when the core connection fails ([dec7792](https://github.com/case-contract-testing/contract-case/commit/dec7792e7028e43a7eb850e85033d6d7b9b486d7))
* **dsl-java:** Wait for the Core to be available before trying to call it; fixing flakiness on faster machines ([b388612](https://github.com/case-contract-testing/contract-case/commit/b3886123637d5267db019653bd3ee3f4004ba72e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.19.1 to 0.19.2
    * @contract-case/case-definition-dsl bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.19.0...@contract-case/dsl-java-v0.19.1) (2025-03-18)


### Bug Fixes

* Downgrade protobuf version to avoid NoClassDefFoundError ([828ed4b](https://github.com/case-contract-testing/contract-case/commit/828ed4be99cc4081fa97c12243c9b730a5af4d5e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.19.0 to 0.19.1
    * @contract-case/case-definition-dsl bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.3.0...@contract-case/dsl-java-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* Replaced `stateHandlers(Map)` with `stateHandler(stateName, StateHandler)` in config builders, for a more idomatic experience
* `ExampleDefinition` has been renamed `InteractionDefinition`. You will need to update your tests
* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction
* Rename SetupInfo to InteractionSetup for consistency

### Features

* Add ability for the current version to be generated from the git sha ([dd70365](https://github.com/case-contract-testing/contract-case/commit/dd703650fd058d34f6d772011b74faec10b93074))
* Add ability to register function calls to the ContractVerifier ([1de3d31](https://github.com/case-contract-testing/contract-case/commit/1de3d31647ed14ad0fe8c37701064ca836d653d0))
* Add convenience method for state handlers with void returns to StateHandler ([5aaab4e](https://github.com/case-contract-testing/contract-case/commit/5aaab4ed8d17f1344090b022f6fe869cdac66700))


### Bug Fixes

* Allow triggers to throw exceptions, avoiding boilerplate in tests ([e9f5f04](https://github.com/case-contract-testing/contract-case/commit/e9f5f04276f372b16048979648a2a94d887c4515))


### Code Refactoring

* `ExampleDefinition` has been renamed `InteractionDefinition`. You will need to update your tests ([7739fe5](https://github.com/case-contract-testing/contract-case/commit/7739fe53bf5c412f945c84ad1571f2e13f431f43))
* Rename SetupInfo to InteractionSetup for consistency ([ea8ba95](https://github.com/case-contract-testing/contract-case/commit/ea8ba9537b91bc99cb8a3927fd21e495f57d41a7))
* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction ([a37e0e8](https://github.com/case-contract-testing/contract-case/commit/a37e0e8258672894e702aebdb5d9cddce90923b4))
* Replaced `stateHandlers(Map)` with `stateHandler(stateName, StateHandler)` in config builders, for a more idomatic experience ([1358b76](https://github.com/case-contract-testing/contract-case/commit/1358b76f36316f5245ab4b998bd1b1ae8f1bad36))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.10.0 to 0.19.0
    * @contract-case/case-definition-dsl bumped from 0.18.0 to 0.19.0

## [0.3.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.2.3...@contract-case/dsl-java-v0.3.0) (2024-10-17)

### ⚠ BREAKING CHANGES

- Now supports function implmentation mocks, supplied on the SetupInfo object. Breaking change as getInfo has been renamed to getMockSetup for consistency with other languages

### Features

- Now supports function implmentation mocks, supplied on the SetupInfo object. Breaking change as getInfo has been renamed to getMockSetup for consistency with other languages ([426ee0b](https://github.com/case-contract-testing/contract-case/commit/426ee0b322fcc1306256ee851d629f7c809cca63))

### Bug Fixes

- Correct issue where plugin module names weren't passed to the core ([149ede1](https://github.com/case-contract-testing/contract-case/commit/149ede1f23baedcc9ee2032c7b0cfe96692872b7))
- Fix hang if the provided trigger function needed to call back to ContractCase's core ([6fefba5](https://github.com/case-contract-testing/contract-case/commit/6fefba5416d0f867de6595dffb2ea888c97bdd1f))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.9.0 to 0.10.0

## [0.2.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.2.2...@contract-case/dsl-java-v0.2.3) (2024-10-08)

### Features

- Support function invocation contracts ([2c1eac8](https://github.com/case-contract-testing/contract-case/commit/2c1eac89fb5da099d5353702551e2f26dbb996a2))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.8.4 to 0.9.0

## [0.2.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.2.1...@contract-case/dsl-java-v0.2.2) (2024-10-02)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.8.3 to 0.8.4

## [0.2.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.2.0...@contract-case/dsl-java-v0.2.1) (2024-10-02)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.8.2 to 0.8.3

## [0.2.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.1.2...@contract-case/dsl-java-v0.2.0) (2024-10-02)

### ⚠ BREAKING CHANGES

- Use the combined DSL package io.contract-testing.contractcase:definitions instead of the separate matchers and mocks packages. Please update your imports

### Code Refactoring

- Use the combined DSL package io.contract-testing.contractcase:definitions instead of the separate matchers and mocks packages. Please update your imports ([c569c6a](https://github.com/case-contract-testing/contract-case/commit/c569c6a7127a5c47663f18e0518ddba321740b59))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.8.1 to 0.8.2

## [0.1.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.1.1...@contract-case/dsl-java-v0.1.2) (2024-10-01)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.8.0 to 0.8.1

## [0.1.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.1.0...@contract-case/dsl-java-v0.1.1) (2024-10-01)

### Features

- Add loadPlugin message to both contract definition and verification grpc streams ([5845808](https://github.com/case-contract-testing/contract-case/commit/584580849cc48eaf990a2b559ab85f29f0b571b6))
- Add mockConfig configuration property ([f82a394](https://github.com/case-contract-testing/contract-case/commit/f82a394f4e048721f5399928a83f19ed044ac13c))
- Add plugin loader methods to ContractDefiner and ContractVerifier ([1112f40](https://github.com/case-contract-testing/contract-case/commit/1112f40de01e53dd4dc5f60d9562a30a4fe090d4))

### Bug Fixes

- Avoid channel unavailable messages during normal shutdown ([0ccdbf7](https://github.com/case-contract-testing/contract-case/commit/0ccdbf7a5e2dfd10deb92a68b0b6a552ccef10d3))
- Extract sourcemap for better stack traces ([e465b96](https://github.com/case-contract-testing/contract-case/commit/e465b962296ae0c661c5c0a0dd7e230218e6aca7))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @contract-case/case-connector bumped from 0.7.5 to 0.8.0

## [0.1.0](https://github.com/case-contract-testing/java-dsl/compare/contractcase-v0.0.1...contractcase-v0.1.0) (2024-05-16)

### ⚠ BREAKING CHANGES

- Change config map for a more convenient SetupInfo object

### Features

- Add builders for config objects ([a01ff31](https://github.com/case-contract-testing/java-dsl/commit/a01ff31ba0aa5d4500692e9fd126496f7414c2cc))
- Add ContractCaseCore crash handler ([087bc05](https://github.com/case-contract-testing/java-dsl/commit/087bc053ca94fc2eb2e6464c50eb1815f83ab472))
- Add ContractDefiner interface ([66332ac](https://github.com/case-contract-testing/java-dsl/commit/66332ac0421e372643110246fdc9934e51f766de))
- Add ContractVerifier ([d1a9dde](https://github.com/case-contract-testing/java-dsl/commit/d1a9ddef2fce847727a68467b3fd3519316d1a2c))
- Add methods that take config builders, so you don't need to call build() as often ([21e6c84](https://github.com/case-contract-testing/java-dsl/commit/21e6c84f5c42445f84291464bf37a0d14f24b134))
- Add no-config versions of runExample and runThrowingInteraction ([a62b4f6](https://github.com/case-contract-testing/java-dsl/commit/a62b4f6b7d41c45790921b23f0e6f7bc5d1c29d1))
- Add ResultPrinter implementation ([50ef39c](https://github.com/case-contract-testing/java-dsl/commit/50ef39c637624740355123ffd35b4c3630096ee2))
- Add verifier using the new connector style ([aaef35d](https://github.com/case-contract-testing/java-dsl/commit/aaef35d129d2a12bd6304a182f5375ba1986eb5f))
- Bundle ContractCase core runtime ([86cb5f2](https://github.com/case-contract-testing/java-dsl/commit/86cb5f24d4410f73881f9bf2f8e65a245e93c000))
- Change config map for a more convenient SetupInfo object ([42137a0](https://github.com/case-contract-testing/java-dsl/commit/42137a009d01d6565793f07676cf4e7c7e805c8c))
- Expose matchers and mocks in API ([4b2a683](https://github.com/case-contract-testing/java-dsl/commit/4b2a683a1244c2a11d7d9d517e5e905755a74222))
- Get runExample working ([f2d16f6](https://github.com/case-contract-testing/java-dsl/commit/f2d16f68ebad693fe00623deceafc5706d2628aa))
- Get verification working ([fa9d179](https://github.com/case-contract-testing/java-dsl/commit/fa9d179cc291e380742633586bfad7f9ce03d3d2))
- Implement state handler calls ([f595d88](https://github.com/case-contract-testing/java-dsl/commit/f595d88244fcfa8345730d5124d480186cbc44b1))
- Replace boundary connector with one that connects to case-connector instead, working around JSii issue ([e902547](https://github.com/case-contract-testing/java-dsl/commit/e902547921c28bc575a4de6e5a5c4090655e4a82))

### Bug Fixes

- Embed @contract-case/case-connector@0.7.5 ([d232ea2](https://github.com/case-contract-testing/java-dsl/commit/d232ea2280c0a9ad8fab95f30893b4f4d33bbc03))
- Gracefully shutdown grpc channel on shutdown ([208dcdb](https://github.com/case-contract-testing/java-dsl/commit/208dcdb28a2a4dcfeb77454e0432a0071f1259f7))
