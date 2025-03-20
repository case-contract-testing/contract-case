# Changelog

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
