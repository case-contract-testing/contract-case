# Changelog

## [0.27.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.27.0...@contract-case/case-plugin-base-v0.27.1) (2025-08-20)


### Bug Fixes

* **core:** Fix an issue where type errors in interaction definitions would fail the test, but not prevent the contract from being written ([34b56ae](https://github.com/case-contract-testing/contract-case/commit/34b56ae11d090eca4a0842afdb12eb3d6f6d608e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.27.0 to 0.27.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.0 to 0.27.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.0 to 0.27.1

## [0.27.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.26.1...@contract-case/case-plugin-base-v0.27.0) (2025-07-30)


### Features

* **java-dsl:** Allow overriding the crash advice with the `adviceOverride` `"CASE_CRASH_ADVICE"` ([60aceb3](https://github.com/case-contract-testing/contract-case/commit/60aceb36e7c7310c44eaa20e46c00d6bfb4f22d8))


### Bug Fixes

* **java-dsl:** Substantially improve javadoc for adviceOverrides ([01125db](https://github.com/case-contract-testing/contract-case/commit/01125dbc5a31b11e88f79eaaaa1fa7ebb6da068d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.26.1 to 0.27.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.1 to 0.27.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.1 to 0.27.0

## [0.26.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.26.0...@contract-case/case-plugin-base-v0.26.1) (2025-07-13)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.26.0 to 0.26.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.0 to 0.26.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.0 to 0.26.1

## [0.26.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.25.2...@contract-case/case-plugin-base-v0.26.0) (2025-07-11)


### Features

* **plugin-base:** Added ability for matching errors to have context about what the data is, allowing more specific error messages ([150c0d6](https://github.com/case-contract-testing/contract-case/commit/150c0d6745afe0ba3b60819510fdc11346578c4d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.25.2 to 0.26.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.2 to 0.26.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.2 to 0.26.0

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.25.1...@contract-case/case-plugin-base-v0.25.2) (2025-06-22)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.25.1 to 0.25.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.1 to 0.25.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.1 to 0.25.2

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.25.0...@contract-case/case-plugin-base-v0.25.1) (2025-06-18)


### Bug Fixes

* **core:** Fix crash in core when rendering certain failure kinds ([bcbed47](https://github.com/case-contract-testing/contract-case/commit/bcbed478439af142b18476ce9178530634661ccb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.25.0 to 0.25.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.0 to 0.25.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.0 to 0.25.1

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.24.2...@contract-case/case-plugin-base-v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **core:** Improve clarity of verification failed message ([fcf8deb](https://github.com/case-contract-testing/contract-case/commit/fcf8deb11acf53a359540edbb83fbbb8eaa146f4))
* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.24.2 to 0.25.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.2 to 0.25.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.24.1...@contract-case/case-plugin-base-v0.24.2) (2025-06-11)


### Features

* Add ability to override some configuration advice via adviceOverrides ([ef171e2](https://github.com/case-contract-testing/contract-case/commit/ef171e27225a6db1fd32e9c99c6d8b1ed3bd1a17))
* **plugin:** Added convenience method for determining whether contracts can't be published in the current setup ([3b0c516](https://github.com/case-contract-testing/contract-case/commit/3b0c5163dfb40a4adf029d476c8587ec0df54379))


### Bug Fixes

* **cli:** Downloaded contracts no longer write a main contract file, as we can't tell which one is main ([9631a77](https://github.com/case-contract-testing/contract-case/commit/9631a77ec58a2f35d7f0825c27822260cf1987bd))
* **plugins:** Add explicit error code for missing state handler and document it ([4e18264](https://github.com/case-contract-testing/contract-case/commit/4e1826455b4cd9f3d6d883614e612aa8645731b7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.24.1 to 0.24.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.1 to 0.24.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.24.0...@contract-case/case-plugin-base-v0.24.1) (2025-06-09)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.24.0 to 0.24.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.0 to 0.24.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.23.1...@contract-case/case-plugin-base-v0.24.0) (2025-05-26)


### Features

* **core,java:** Add user-facing stack traces so that the source of errors is clear ([c8234ad](https://github.com/case-contract-testing/contract-case/commit/c8234adeebfa9bcf764009f5c4cc6c22562eebf6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.23.1 to 0.24.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.1 to 0.24.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.23.0...@contract-case/case-plugin-base-v0.23.1) (2025-05-04)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.23.0 to 0.23.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.0 to 0.23.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.22.0...@contract-case/case-plugin-base-v0.23.0) (2025-04-28)


### Features

* CaseConnectorErrors now come with an error code that can be used to programatically react to them. See the reference documentation for details. ([dee6d4d](https://github.com/case-contract-testing/contract-case/commit/dee6d4d36219edfad5dfa9f913b1f852666db289))


### Bug Fixes

* **core:** Improve the logging of location context ([500cbb7](https://github.com/case-contract-testing/contract-case/commit/500cbb7a1d3f14ee810bde2f3e3b2627acb29e96))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.22.0 to 0.23.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.22.0 to 0.23.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.21.0...@contract-case/case-plugin-base-v0.22.0) (2025-04-14)


### ⚠ BREAKING CHANGES

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change.

### Features

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change. ([b8dcd1f](https://github.com/case-contract-testing/contract-case/commit/b8dcd1f7ed16cfdeda22728da794a66e95f2870c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.21.0 to 0.22.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.21.0 to 0.22.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.20.1...@contract-case/case-plugin-base-v0.21.0) (2025-03-25)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.20.1 to 0.21.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.1 to 0.21.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.20.0...@contract-case/case-plugin-base-v0.20.1) (2025-03-22)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.20.0 to 0.20.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.0 to 0.20.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.19.2...@contract-case/case-plugin-base-v0.20.0) (2025-03-20)


### ⚠ BREAKING CHANGES

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details.

### Features

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details. ([b2a078d](https://github.com/case-contract-testing/contract-case/commit/b2a078d18631c15caf27706a672c49d040a47790))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.19.2 to 0.20.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.2 to 0.20.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.19.1...@contract-case/case-plugin-base-v0.19.2) (2025-03-19)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.19.1 to 0.19.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.1 to 0.19.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.19.0...@contract-case/case-plugin-base-v0.19.1) (2025-03-18)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.19.0 to 0.19.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.0 to 0.19.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.18.0...@contract-case/case-plugin-base-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions

### Features

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions ([afaa8d7](https://github.com/case-contract-testing/contract-case/commit/afaa8d75d81e45ca7609f89b1e17819183bc59b2))
* Add ability for the current version to be generated from the git sha ([dd70365](https://github.com/case-contract-testing/contract-case/commit/dd703650fd058d34f6d772011b74faec10b93074))
* Run parameter validators ahead of the self-check, allowing early warning of configuration mistakes in example interactions ([186d2e5](https://github.com/case-contract-testing/contract-case/commit/186d2e58eff512d37e53425ac353b231d15250a8))


### Bug Fixes

* Change the "-&gt;" in interaction names to "returns" ([e1c3f29](https://github.com/case-contract-testing/contract-case/commit/e1c3f29bb6803dff59f615b75b055cc3c9d184b7))
* Improve logging when multiple contracts are verified ([9f3f4a2](https://github.com/case-contract-testing/contract-case/commit/9f3f4a249eeafdb4da57aef11807ff3e23f544d3))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.18.0 to 0.19.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.1.0 to 0.19.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.1 to 0.19.0

## [0.18.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.17.1...@contract-case/case-plugin-base-v0.18.0) (2024-10-17)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.17.1 to 0.18.0

## [0.17.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.17.0...@contract-case/case-plugin-base-v0.17.1) (2024-10-08)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.17.0 to 0.17.1

## [0.17.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.16.3...@contract-case/case-plugin-base-v0.17.0) (2024-10-02)


### ⚠ BREAKING CHANGES

* Separate case-plugin-base into case-plugin-base and case-plugin-dsl-types to make working with bundled dependencies easier. Some imports may need to be updated.

### Code Refactoring

* Separate case-plugin-base into case-plugin-base and case-plugin-dsl-types to make working with bundled dependencies easier. Some imports may need to be updated. ([6659218](https://github.com/case-contract-testing/contract-case/commit/6659218c053146c2c1171fa3c9621c6aa8399aac))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-dsl-types bumped from 0.16.3 to 0.17.0

## [0.16.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.16.2...@contract-case/case-plugin-base-v0.16.3) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions

## [0.16.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.16.1...@contract-case/case-plugin-base-v0.16.2) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions

## [0.16.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.16.0...@contract-case/case-plugin-base-v0.16.1) (2024-10-01)


### Miscellaneous Chores

* **@contract-case/case-plugin-base:** Synchronize ContractCase versions

## [0.16.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-plugin-base-v0.15.7...@contract-case/case-plugin-base-v0.16.0) (2024-10-01)


### ⚠ BREAKING CHANGES

* Split HTTP mock and matchers to their own packages

### Features

* Add ability for plugins to specify their own configuration ([bf636c2](https://github.com/case-contract-testing/contract-case/commit/bf636c22a2564cfc2e4ebdac179835b32fa3a964))
* Add getPluginConfig convenience method for extracting the value of `mockConfig[pluginName]` ([50de742](https://github.com/case-contract-testing/contract-case/commit/50de74239f0a384043309986e7ce033f204d5865))


### Bug Fixes

* Hardcode error names so that they're robust to minification ([3106196](https://github.com/case-contract-testing/contract-case/commit/3106196f909ef703ecb15e0f076933a987e69fc3))
* Improve hasErrors function ([9b82033](https://github.com/case-contract-testing/contract-case/commit/9b8203359419ffc1be723e54228445df040be1d4))
* Improve plugin configuration error messages ([11d44bb](https://github.com/case-contract-testing/contract-case/commit/11d44bb8e951df8197ce3a7abaf9ca1d3e2a817d))
* Improve plugin configuration errors and documentation ([30e5987](https://github.com/case-contract-testing/contract-case/commit/30e5987f52d0743b751c9ec57858e739260ac2fc))
* Support null responses, eg for void returns in functions ([1c2eeb1](https://github.com/case-contract-testing/contract-case/commit/1c2eeb1d72aabbaccbe67eec820e12463bdb84e0))


### Miscellaneous Chores

* Split HTTP mock and matchers to their own packages ([bfc2e4f](https://github.com/case-contract-testing/contract-case/commit/bfc2e4ff2d464899fd8ce63978048e9f1991ff80))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.4 to 0.1.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.0 to 0.1.1
