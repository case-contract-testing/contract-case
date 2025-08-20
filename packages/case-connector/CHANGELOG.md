# Changelog

## [0.27.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.27.0...@contract-case/case-connector-v0.27.1) (2025-08-20)


### Features

* **core:** Control which contracts are written with contractsToWrite. Possible values are 'hash' and 'main', defaulting to both ([e7e18a3](https://github.com/case-contract-testing/contract-case/commit/e7e18a35b81b8150097706cc18c2c52512352ad6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.27.0 to 0.27.1
    * @contract-case/case-core bumped from 0.27.0 to 0.27.1
    * @contract-case/case-entities-internal bumped from 0.27.0 to 0.27.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.0 to 0.27.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.0 to 0.27.1

## [0.27.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.26.1...@contract-case/case-connector-v0.27.0) (2025-07-30)


### ⚠ BREAKING CHANGES

* **jest-dsl:** Change `verifyContract` to use `prepareVerificationTests` and `runPreparedTest`. This changes the behaviour of the verification callback. You no longer need to call `runVerification` in this function

### Bug Fixes

* Deprecate runVerification, as it is now replaced with getTests and runPreparedTest ([24cd85a](https://github.com/case-contract-testing/contract-case/commit/24cd85a1bae6e29cdfa315ae1e122a588d01fdd9))


### Code Refactoring

* **jest-dsl:** Change `verifyContract` to use `prepareVerificationTests` and `runPreparedTest`. This changes the behaviour of the verification callback. You no longer need to call `runVerification` in this function ([2f68f87](https://github.com/case-contract-testing/contract-case/commit/2f68f879768afcf9362f4f968ad037f0ff42dd9b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.26.1 to 0.27.0
    * @contract-case/case-core bumped from 0.26.1 to 0.27.0
    * @contract-case/case-entities-internal bumped from 0.26.1 to 0.27.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.1 to 0.27.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.1 to 0.27.0

## [0.26.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.26.0...@contract-case/case-connector-v0.26.1) (2025-07-13)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.26.0 to 0.26.1
    * @contract-case/case-core bumped from 0.26.0 to 0.26.1
    * @contract-case/case-entities-internal bumped from 0.26.0 to 0.26.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.0 to 0.26.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.0 to 0.26.1

## [0.26.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.25.2...@contract-case/case-connector-v0.26.0) (2025-07-11)


### Features

* **java-dsl:** Now supports the prepareVerificationTests and runPreparedTest lifecycle for better integration with JUnit ([1408d46](https://github.com/case-contract-testing/contract-case/commit/1408d46a159978bec58bb4bb957b6979473534cb))
* Now `definer.endRecord()` returns a `ContractWriteSuccess` object, which contains details of the written contract(s) ([7299895](https://github.com/case-contract-testing/contract-case/commit/7299895f8ec7a9d8b3e351111045f5c7b75eb1e8))


### Bug Fixes

* **connector:** Correct types read when moduleresolution is node ([ff29e62](https://github.com/case-contract-testing/contract-case/commit/ff29e62a8040c97eaa86ed2dcb09bed8cb940036))
* **core:** availableContractDescriptions now respects the configuration and only returns the filtered set of contracts. This was the intended (and documented) behaviour before. If you need to see the ignored contracts, they're visible in a call to this method with a logLevel of DEBUG or lower. ([9c4e5a8](https://github.com/case-contract-testing/contract-case/commit/9c4e5a8639572797bfda6b502c0e28dfc10a0b2f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.25.2 to 0.26.0
    * @contract-case/case-core bumped from 0.25.2 to 0.26.0
    * @contract-case/case-entities-internal bumped from 0.25.2 to 0.26.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.2 to 0.26.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.2 to 0.26.0

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.25.1...@contract-case/case-connector-v0.25.2) (2025-06-22)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.25.1 to 0.25.2
    * @contract-case/case-core bumped from 0.25.1 to 0.25.2
    * @contract-case/case-entities-internal bumped from 0.25.1 to 0.25.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.1 to 0.25.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.1 to 0.25.2

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.25.0...@contract-case/case-connector-v0.25.1) (2025-06-18)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.25.0 to 0.25.1
    * @contract-case/case-core bumped from 0.25.0 to 0.25.1
    * @contract-case/case-entities-internal bumped from 0.25.0 to 0.25.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.0 to 0.25.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.0 to 0.25.1

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.24.2...@contract-case/case-connector-v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **connector:** fix issue where logLevel: none couldn't be set from languages using the gRPC connector ([8beefd6](https://github.com/case-contract-testing/contract-case/commit/8beefd6d556c9f974f71b77bc49b98650bc258e8))
* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.24.2 to 0.25.0
    * @contract-case/case-core bumped from 0.24.2 to 0.25.0
    * @contract-case/case-entities-internal bumped from 0.24.2 to 0.25.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.2 to 0.25.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.24.1...@contract-case/case-connector-v0.24.2) (2025-06-11)


### Features

* Add ability to override some configuration advice via adviceOverrides ([ef171e2](https://github.com/case-contract-testing/contract-case/commit/ef171e27225a6db1fd32e9c99c6d8b1ed3bd1a17))


### Bug Fixes

* **boundary:** Fix an issue where state handlers set in the verifier constructor wouldn't be respected ([e5c0528](https://github.com/case-contract-testing/contract-case/commit/e5c05281f52264e7a9e584978ac2e374e4c33306))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.24.1 to 0.24.2
    * @contract-case/case-core bumped from 0.24.1 to 0.24.2
    * @contract-case/case-entities-internal bumped from 0.24.1 to 0.24.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.1 to 0.24.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.24.0...@contract-case/case-connector-v0.24.1) (2025-06-09)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.24.0 to 0.24.1
    * @contract-case/case-core bumped from 0.24.0 to 0.24.1
    * @contract-case/case-entities-internal bumped from 0.24.0 to 0.24.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.0 to 0.24.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.23.1...@contract-case/case-connector-v0.24.0) (2025-05-26)


### Features

* **core,java:** Add user-facing stack traces so that the source of errors is clear ([c8234ad](https://github.com/case-contract-testing/contract-case/commit/c8234adeebfa9bcf764009f5c4cc6c22562eebf6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.23.1 to 0.24.0
    * @contract-case/case-core bumped from 0.23.1 to 0.24.0
    * @contract-case/case-entities-internal bumped from 0.23.1 to 0.24.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.1 to 0.24.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.23.0...@contract-case/case-connector-v0.23.1) (2025-05-04)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.23.0 to 0.23.1
    * @contract-case/case-core bumped from 0.23.0 to 0.23.1
    * @contract-case/case-entities-internal bumped from 0.23.0 to 0.23.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.0 to 0.23.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.22.0...@contract-case/case-connector-v0.23.0) (2025-04-28)


### Features

* CaseConnectorErrors now come with an error code that can be used to programatically react to them. See the reference documentation for details. ([dee6d4d](https://github.com/case-contract-testing/contract-case/commit/dee6d4d36219edfad5dfa9f913b1f852666db289))


### Bug Fixes

* **core:** Improve the logging of location context ([500cbb7](https://github.com/case-contract-testing/contract-case/commit/500cbb7a1d3f14ee810bde2f3e3b2627acb29e96))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.22.0 to 0.23.0
    * @contract-case/case-core bumped from 0.22.0 to 0.23.0
    * @contract-case/case-entities-internal bumped from 0.22.0 to 0.23.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.22.0 to 0.23.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.21.0...@contract-case/case-connector-v0.22.0) (2025-04-14)


### ⚠ BREAKING CHANGES

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change.

### Features

* **cli:** Add ability to invoke can-i-deploy from the CLI ([b2351ca](https://github.com/case-contract-testing/contract-case/commit/b2351cabd548d6b62b631fd45966cc2263325276))
* **connector:** Expose a CJS version as `@contract-case/case-connector/cjs` ([bbc490d](https://github.com/case-contract-testing/contract-case/commit/bbc490d0f92afb9a936be615e9663a8c27478cc7))
* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change. ([b8dcd1f](https://github.com/case-contract-testing/contract-case/commit/b8dcd1f7ed16cfdeda22728da794a66e95f2870c))


### Bug Fixes

* Improve reporting of stack traces when triggers fail ([deedb53](https://github.com/case-contract-testing/contract-case/commit/deedb532cbd8e62926cb58da3392ce41135a6dd5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector-proto bumped from 0.21.0 to 0.22.0
    * @contract-case/case-core bumped from 0.21.0 to 0.22.0
    * @contract-case/case-entities-internal bumped from 0.21.0 to 0.22.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.21.0 to 0.22.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.20.1...@contract-case/case-connector-v0.21.0) (2025-03-25)


### Bug Fixes

* **connector:** Start the connector on ipv6 ([#925](https://github.com/case-contract-testing/contract-case/issues/925)) ([e502231](https://github.com/case-contract-testing/contract-case/commit/e502231983f094d492dc141d4467f6dbb4d0315f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.20.1 to 0.21.0
    * @contract-case/case-connector-proto bumped from 0.20.1 to 0.21.0
    * @contract-case/case-entities-internal bumped from 0.20.1 to 0.21.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.1 to 0.21.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.20.0...@contract-case/case-connector-v0.20.1) (2025-03-22)


### Bug Fixes

* **case-connector:** Add the service to the server before starting, reducing chance of UNAVAILABLE errors ([39f3194](https://github.com/case-contract-testing/contract-case/commit/39f3194b86b1dd8632d29f3d9bc25d8a75655566))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.20.0 to 0.20.1
    * @contract-case/case-connector-proto bumped from 0.20.0 to 0.20.1
    * @contract-case/case-entities-internal bumped from 0.20.0 to 0.20.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.0 to 0.20.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.19.2...@contract-case/case-connector-v0.20.0) (2025-03-20)


### ⚠ BREAKING CHANGES

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details.

### Features

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details. ([b2a078d](https://github.com/case-contract-testing/contract-case/commit/b2a078d18631c15caf27706a672c49d040a47790))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.19.2 to 0.20.0
    * @contract-case/case-connector-proto bumped from 0.19.2 to 0.20.0
    * @contract-case/case-entities-internal bumped from 0.19.2 to 0.20.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.2 to 0.20.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.19.1...@contract-case/case-connector-v0.19.2) (2025-03-19)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.19.1 to 0.19.2
    * @contract-case/case-connector-proto bumped from 0.19.1 to 0.19.2
    * @contract-case/case-entities-internal bumped from 0.19.1 to 0.19.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.1 to 0.19.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.19.0...@contract-case/case-connector-v0.19.1) (2025-03-18)


### Miscellaneous Chores

* **@contract-case/case-connector:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.19.0 to 0.19.1
    * @contract-case/case-connector-proto bumped from 0.19.0 to 0.19.1
    * @contract-case/case-entities-internal bumped from 0.19.0 to 0.19.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.0 to 0.19.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.10.0...@contract-case/case-connector-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction

### Features

* Add ability for the current version to be generated from the git sha ([dd70365](https://github.com/case-contract-testing/contract-case/commit/dd703650fd058d34f6d772011b74faec10b93074))


### Bug Fixes

* Fixed an issue where state handler setups could incorrectly be registered as teardown ([e2a142c](https://github.com/case-contract-testing/contract-case/commit/e2a142c4b8c78495bf7ed218003cf1e5e139c7d9))


### Code Refactoring

* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction ([a37e0e8](https://github.com/case-contract-testing/contract-case/commit/a37e0e8258672894e702aebdb5d9cddce90923b4))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.18.0 to 0.19.0
    * @contract-case/case-connector-proto bumped from 0.9.0 to 0.19.0
    * @contract-case/case-entities-internal bumped from 0.18.0 to 0.19.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.1.0 to 0.19.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.1 to 0.19.0

## [0.10.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.9.0...@contract-case/case-connector-v0.10.0) (2024-10-17)


### ⚠ BREAKING CHANGES

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings

### Bug Fixes

* Accurately include version numbers at runtime ([cca80e3](https://github.com/case-contract-testing/contract-case/commit/cca80e32f2dd055388e3cadd0239c883d556bb49))


### Code Refactoring

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings ([c9ddd93](https://github.com/case-contract-testing/contract-case/commit/c9ddd93782b5e11cd5925ea76e089e0d779fdc11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.17.1 to 0.18.0
    * @contract-case/case-connector-proto bumped from 0.8.0 to 0.9.0
    * @contract-case/case-entities-internal bumped from 0.17.1 to 0.18.0

## [0.9.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.8.4...@contract-case/case-connector-v0.9.0) (2024-10-08)


### ⚠ BREAKING CHANGES

* The gRRPC SuccessWithAny type now contains a json string instead of a struct, for ease of mapping

### Bug Fixes

* Improve error message if the invokeable function's return value fails to parse ([3634d5d](https://github.com/case-contract-testing/contract-case/commit/3634d5d5fba4ccfc27b479911322fbe2847c0dba))
* Substantially improve maintainer logging ([30a882b](https://github.com/case-contract-testing/contract-case/commit/30a882b69e971b44285ef74e6da76ccef1a8a1ad))


### Code Refactoring

* The gRRPC SuccessWithAny type now contains a json string instead of a struct, for ease of mapping ([adf66dd](https://github.com/case-contract-testing/contract-case/commit/adf66dd6e42eb85b5c5ece2d06405cb677e684e8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.17.0 to 0.17.1
    * @contract-case/case-connector-proto bumped from 0.7.6 to 0.8.0
    * @contract-case/case-entities-internal bumped from 0.17.0 to 0.17.1

## [0.8.4](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.8.3...@contract-case/case-connector-v0.8.4) (2024-10-02)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.16.3 to 0.17.0
    * @contract-case/case-entities-internal bumped from 0.16.3 to 0.17.0

## [0.8.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.8.2...@contract-case/case-connector-v0.8.3) (2024-10-02)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.16.2 to 0.16.3
    * @contract-case/case-entities-internal bumped from 0.16.2 to 0.16.3

## [0.8.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.8.1...@contract-case/case-connector-v0.8.2) (2024-10-02)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.16.1 to 0.16.2
    * @contract-case/case-entities-internal bumped from 0.16.1 to 0.16.2

## [0.8.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.8.0...@contract-case/case-connector-v0.8.1) (2024-10-01)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.16.0 to 0.16.1
    * @contract-case/case-entities-internal bumped from 0.16.0 to 0.16.1

## [0.8.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.5...@contract-case/case-connector-v0.8.0) (2024-10-01)


### ⚠ BREAKING CHANGES

* BoundarySuccessWithAny is now always a json encoded string. Existing mappers will need to be updated.
* Convert package to pure ESM
* Split HTTP mock and matchers to their own packages

### Features

* Add BoundaryPluginLoader to facilitate loading of plugins ([2242e96](https://github.com/case-contract-testing/contract-case/commit/2242e960c93278d9fafdacce79d568b87200345c))
* Add grpc messages for function invokers and responses ([1a45353](https://github.com/case-contract-testing/contract-case/commit/1a453539bc12bda8ccd1ec69f0d485c197eb43e6))
* Add loadPlugin message to both contract definition and verification grpc streams ([5845808](https://github.com/case-contract-testing/contract-case/commit/584580849cc48eaf990a2b559ab85f29f0b571b6))
* Add mockConfig to configuration object, allowing arbitrary configuration of mocks ([a9aa4f7](https://github.com/case-contract-testing/contract-case/commit/a9aa4f717095dde70e98742dd16dd3e20cc63b1d))
* Expose invokeable functions through the javascript boundary ([39a1920](https://github.com/case-contract-testing/contract-case/commit/39a19206157962dc60e2f216fb13500c1f37b94d))


### Bug Fixes

* Fix issue where failures in verfication could cause the server to die ([6415824](https://github.com/case-contract-testing/contract-case/commit/64158247dccefbe40d41cdcbdc643014e0ef6c75))
* Fix issue where failures were incorrectly mapped across core binary ([5ea3a1f](https://github.com/case-contract-testing/contract-case/commit/5ea3a1f028b2d6cc4b7ddb7edcfb92b228f23590))
* Hardcode error names so that they're robust to minification ([3106196](https://github.com/case-contract-testing/contract-case/commit/3106196f909ef703ecb15e0f076933a987e69fc3))
* Now loading plugins over grpc doesn't throw an error ([0137381](https://github.com/case-contract-testing/contract-case/commit/013738163d79d3fac8a27e88c77a6ee6b0e3fc1f))


### Miscellaneous Chores

* Split HTTP mock and matchers to their own packages ([bfc2e4f](https://github.com/case-contract-testing/contract-case/commit/bfc2e4ff2d464899fd8ce63978048e9f1991ff80))


### Code Refactoring

* BoundarySuccessWithAny is now always a json encoded string. Existing mappers will need to be updated. ([5fc4a7a](https://github.com/case-contract-testing/contract-case/commit/5fc4a7afc4b88ecc70e5d1d86f2e6f42a2486ae4))
* Convert package to pure ESM ([64f5788](https://github.com/case-contract-testing/contract-case/commit/64f5788236d25f70092b6d1e5c4d2f4e0e412bc9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.15.7 to 0.16.0
    * @contract-case/case-connector-proto bumped from 0.7.5 to 0.7.6
    * @contract-case/case-entities-internal bumped from 0.15.7 to 0.16.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.4 to 0.1.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.0 to 0.1.1

## [0.7.5](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.4...@contract-case/case-connector-v0.7.5) (2024-05-16)


### Features

* Add case-boundary into the connector package ([072222f](https://github.com/case-contract-testing/contract-case/commit/072222f4b4f1eeddef461b0007bc5f431217fb7b))
* Add internal config parameters to control whether verification is async or not ([6882739](https://github.com/case-contract-testing/contract-case/commit/68827393b0b766e753aeb77dcab123a2a01672fe))
* Implement and expose contract verifier ([ea460cd](https://github.com/case-contract-testing/contract-case/commit/ea460cd5a915975673b2f22d98e05fab3b2b1cba))


### Bug Fixes

* Correct typing issue with trigger handles ([c7c4b47](https://github.com/case-contract-testing/contract-case/commit/c7c4b47b1d43d98235ac188c6444e27913b1b121))
* Ensure that response ID is present in the maintainer logs ([bcda125](https://github.com/case-contract-testing/contract-case/commit/bcda1258520a87a358fb9369fe1a4b9e77356a9c))
* Fix issue where the verification endpoint wasn't exposed ([df36ba3](https://github.com/case-contract-testing/contract-case/commit/df36ba38fcd91fb3b263f88a17d6314fc93a6095))
* Remove call to deprecated function, avoiding warning ([6b7ea08](https://github.com/case-contract-testing/contract-case/commit/6b7ea08dc06776fb3377f1ef9a0dc24dd594a935))
* Start the ContractCase server on a random port ([4c5d431](https://github.com/case-contract-testing/contract-case/commit/4c5d431848cb026701510cf7248f0c48ff5f8b75))
* Use case-connector instead of case-boundary ([ecc1c9a](https://github.com/case-contract-testing/contract-case/commit/ecc1c9a02f1afc7caadaf1844d9b49eb1843a014))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core bumped from 0.15.6 to 0.15.7
    * @contract-case/case-entities-internal bumped from 0.15.6 to 0.15.7
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.0.3 to 0.1.0

## [0.7.4](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.3...@contract-case/case-connector-v0.7.4) (2024-02-11)


### Bug Fixes

* Bump version of case-boundary to 0.10.4 ([a15aac9](https://github.com/case-contract-testing/contract-case/commit/a15aac9a1337b77831c9f0baf425b6e3f4e2fa17))

## [0.7.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.2...@contract-case/case-connector-v0.7.3) (2024-02-11)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-entities-internal bumped from 0.15.5 to 0.15.6

## [0.7.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.1...@contract-case/case-connector-v0.7.2) (2024-01-30)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-entities-internal bumped from 0.15.4 to 0.15.5

## [0.7.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.7.0...@contract-case/case-connector-v0.7.1) (2024-01-23)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.10.0 to 0.10.1

## [0.7.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.6.7...@contract-case/case-connector-v0.7.0) (2024-01-23)


### ⚠ BREAKING CHANGES

* replace all response types that only return a single result with one unified type

### Bug Fixes

* Correct issue where the version string was double printed ([d59596a](https://github.com/case-contract-testing/contract-case/commit/d59596a2a4199994769bb056a2795f5eb39f3008))
* Don't double count case-connector version in maintainer debug logs ([dd1edd0](https://github.com/case-contract-testing/contract-case/commit/dd1edd08460e459311527041075877337732f7e3))


### Code Refactoring

* replace all response types that only return a single result with one unified type ([53909f1](https://github.com/case-contract-testing/contract-case/commit/53909f16ad13e1d136aed953b207b9c3feea35f3))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.9.2 to 0.10.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.3 to 0.0.4

## [0.6.7](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.6.6...@contract-case/case-connector-v0.6.7) (2024-01-06)


### Bug Fixes

* Update documentation slightly ([1845322](https://github.com/case-contract-testing/contract-case/commit/18453227b712ec6209a40d450f290f639d37f06e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.9.1 to 0.9.2

## [0.6.6](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-connector-v0.6.5...@contract-case/case-connector-v0.6.6) (2024-01-06)


### Features

* Add full connector layer for the case-boundary ([651d55d](https://github.com/case-contract-testing/contract-case/commit/651d55dd2641aa3ebaea5cd4f998b7871271ccdf))


### Bug Fixes

* Correct error messages ([29caeff](https://github.com/case-contract-testing/contract-case/commit/29caeffa5fcd60e489f176e7daae7facf5187b0b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.9.0 to 0.9.1

## Changelog

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.7.0 to 0.8.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.2 to 0.0.3
    * @contract-case/eslint-config-case-maintainer bumped from 0.0.2 to 0.0.3

## Changelog

### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-boundary bumped from 0.6.3 to 0.7.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.1 to 0.0.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.0.1 to 0.0.2
