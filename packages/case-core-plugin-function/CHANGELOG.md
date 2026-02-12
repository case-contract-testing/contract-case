# Changelog

## [0.28.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.28.1...@contract-case/case-core-plugin-function-v0.28.2) (2026-02-12)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.28.1 to 0.28.2
    * @contract-case/case-plugin-base bumped from 0.28.1 to 0.28.2
    * @contract-case/case-plugin-dsl-types bumped from 0.28.1 to 0.28.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.28.1 to 0.28.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.28.1 to 0.28.2

## [0.28.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.28.0...@contract-case/case-core-plugin-function-v0.28.1) (2026-01-19)


### Features

* **plugin-base:** Plugins now can expose DSL definitions that can be built by the DSL generator ([e665a55](https://github.com/case-contract-testing/contract-case/commit/e665a556054ccd4bef20c469de5885d6425f8268))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.28.0 to 0.28.1
    * @contract-case/case-plugin-base bumped from 0.28.0 to 0.28.1
    * @contract-case/case-plugin-dsl-types bumped from 0.28.0 to 0.28.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.28.0 to 0.28.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.28.0 to 0.28.1

## [0.28.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.27.3...@contract-case/case-core-plugin-function-v0.28.0) (2025-12-14)


### ⚠ BREAKING CHANGES

* In order to support the upcoming replacement of JSii, the function invocation matcher has changed to no longer have the function name associated with it, it is now injected by the plugin at runtime. This is not a functional change, but it is still a breaking change as contracts with function plugins will have different definitions and will need to be updated.

### Code Refactoring

* In order to support the upcoming replacement of JSii, the function invocation matcher has changed to no longer have the function name associated with it, it is now injected by the plugin at runtime. This is not a functional change, but it is still a breaking change as contracts with function plugins will have different definitions and will need to be updated. ([d1e5762](https://github.com/case-contract-testing/contract-case/commit/d1e57627e85609b4cbdf7d3b7d61bd6f0a97af29))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.27.3 to 0.28.0
    * @contract-case/case-plugin-base bumped from 0.27.3 to 0.28.0
    * @contract-case/case-plugin-dsl-types bumped from 0.27.3 to 0.28.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.3 to 0.28.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.3 to 0.28.0

## [0.27.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.27.2...@contract-case/case-core-plugin-function-v0.27.3) (2025-10-25)


### Features

* **core:** Add overrideable advice for FAKE_NEVER_CALLED configuration error ([aa1f33f](https://github.com/case-contract-testing/contract-case/commit/aa1f33fcc66436b44137fac1f276ed36a9d3d539))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.27.2 to 0.27.3
    * @contract-case/case-plugin-base bumped from 0.27.2 to 0.27.3
    * @contract-case/case-plugin-dsl-types bumped from 0.27.2 to 0.27.3
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.2 to 0.27.3
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.2 to 0.27.3

## [0.27.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.27.1...@contract-case/case-core-plugin-function-v0.27.2) (2025-08-26)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.27.1 to 0.27.2
    * @contract-case/case-plugin-base bumped from 0.27.1 to 0.27.2
    * @contract-case/case-plugin-dsl-types bumped from 0.27.1 to 0.27.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.1 to 0.27.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.1 to 0.27.2

## [0.27.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.27.0...@contract-case/case-core-plugin-function-v0.27.1) (2025-08-20)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.27.0 to 0.27.1
    * @contract-case/case-plugin-base bumped from 0.27.0 to 0.27.1
    * @contract-case/case-plugin-dsl-types bumped from 0.27.0 to 0.27.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.0 to 0.27.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.0 to 0.27.1

## [0.27.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.26.1...@contract-case/case-core-plugin-function-v0.27.0) (2025-07-30)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.26.1 to 0.27.0
    * @contract-case/case-plugin-base bumped from 0.26.1 to 0.27.0
    * @contract-case/case-plugin-dsl-types bumped from 0.26.1 to 0.27.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.1 to 0.27.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.1 to 0.27.0

## [0.26.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.26.0...@contract-case/case-core-plugin-function-v0.26.1) (2025-07-13)


### Bug Fixes

* **function-plugin:** Correct regression where unexpected thrown exceptions from the code under test would be incorrectly reported as a crash ([65f194a](https://github.com/case-contract-testing/contract-case/commit/65f194a6538cf95584fc6a95a6df4e1fccbc15c9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.26.0 to 0.26.1
    * @contract-case/case-plugin-base bumped from 0.26.0 to 0.26.1
    * @contract-case/case-plugin-dsl-types bumped from 0.26.0 to 0.26.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.0 to 0.26.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.0 to 0.26.1

## [0.26.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.25.2...@contract-case/case-core-plugin-function-v0.26.0) (2025-07-11)


### ⚠ BREAKING CHANGES

* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions

### Features

* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions ([7f06209](https://github.com/case-contract-testing/contract-case/commit/7f062096bdad81e5d763429682b99f481f9405ce))


### Bug Fixes

* **function-plugin:** Add debug logging of return value when caller is mocked ([cac45b5](https://github.com/case-contract-testing/contract-case/commit/cac45b5c95dcf6d875bf2c46c6dee4bc211e5c07))
* **function-plugin:** No longer repeats `returnValue` twice in error location messages ([4a5d4dd](https://github.com/case-contract-testing/contract-case/commit/4a5d4dd03c0cdb450ed4f430b580e100cd008a44))
* **function-plugin:** Substantially improved error messages when functions throw instead of returning, or receive the wrong number of arguments ([d25d819](https://github.com/case-contract-testing/contract-case/commit/d25d819a8478b887e7fc1bb4a747d0c0bd4428dc))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.25.2 to 0.26.0
    * @contract-case/case-plugin-base bumped from 0.25.2 to 0.26.0
    * @contract-case/case-plugin-dsl-types bumped from 0.25.2 to 0.26.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.2 to 0.26.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.2 to 0.26.0

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.25.1...@contract-case/case-core-plugin-function-v0.25.2) (2025-06-22)


### Bug Fixes

* **function-plugin:** Correct error message when an exception is thrown ([afdd9b5](https://github.com/case-contract-testing/contract-case/commit/afdd9b517b7ee5daef8f82f26019579da468dc26))
* **function-plugin:** Improve description of thrown errors ([2cfb5e4](https://github.com/case-contract-testing/contract-case/commit/2cfb5e4da3a1c8f747915bf3b64f5363dc2b42fa))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.25.1 to 0.25.2
    * @contract-case/case-plugin-base bumped from 0.25.1 to 0.25.2
    * @contract-case/case-plugin-dsl-types bumped from 0.25.1 to 0.25.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.1 to 0.25.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.1 to 0.25.2

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.25.0...@contract-case/case-core-plugin-function-v0.25.1) (2025-06-18)


### Features

* **core:** Add ability to match throwing functions ([88f8978](https://github.com/case-contract-testing/contract-case/commit/88f8978e653a5a725cc58732d27348f2880fd484))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.25.0 to 0.25.1
    * @contract-case/case-plugin-base bumped from 0.25.0 to 0.25.1
    * @contract-case/case-plugin-dsl-types bumped from 0.25.0 to 0.25.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.0 to 0.25.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.0 to 0.25.1

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.24.2...@contract-case/case-core-plugin-function-v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from 0.24.2 to 0.25.0
    * @contract-case/case-plugin-base bumped from 0.24.2 to 0.25.0
    * @contract-case/case-plugin-dsl-types bumped from 0.24.2 to 0.25.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.2 to 0.25.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.24.1...@contract-case/case-core-plugin-function-v0.24.2) (2025-06-11)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.24.1 to ^0.24.2
    * @contract-case/case-plugin-base bumped from ^0.24.1 to ^0.24.2
    * @contract-case/case-plugin-dsl-types bumped from ^0.24.1 to ^0.24.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.1 to 0.24.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.24.0...@contract-case/case-core-plugin-function-v0.24.1) (2025-06-09)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.24.0 to ^0.24.1
    * @contract-case/case-plugin-base bumped from ^0.24.0 to ^0.24.1
    * @contract-case/case-plugin-dsl-types bumped from ^0.24.0 to ^0.24.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.0 to 0.24.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.23.1...@contract-case/case-core-plugin-function-v0.24.0) (2025-05-26)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.23.1 to ^0.24.0
    * @contract-case/case-plugin-base bumped from ^0.23.1 to ^0.24.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.23.1 to ^0.24.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.1 to 0.24.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.23.0...@contract-case/case-core-plugin-function-v0.23.1) (2025-05-04)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.23.0 to ^0.23.1
    * @contract-case/case-plugin-base bumped from ^0.23.0 to ^0.23.1
    * @contract-case/case-plugin-dsl-types bumped from ^0.23.0 to ^0.23.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.0 to 0.23.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.22.0...@contract-case/case-core-plugin-function-v0.23.0) (2025-04-28)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.22.0 to ^0.23.0
    * @contract-case/case-plugin-base bumped from ^0.22.0 to ^0.23.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.22.0 to ^0.23.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.22.0 to 0.23.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.21.0...@contract-case/case-core-plugin-function-v0.22.0) (2025-04-14)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.21.0 to ^0.22.0
    * @contract-case/case-plugin-base bumped from ^0.21.0 to ^0.22.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.21.0 to ^0.22.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.21.0 to 0.22.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.20.1...@contract-case/case-core-plugin-function-v0.21.0) (2025-03-25)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.20.1 to ^0.21.0
    * @contract-case/case-plugin-base bumped from ^0.20.1 to ^0.21.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.20.1 to ^0.21.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.1 to 0.21.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.20.0...@contract-case/case-core-plugin-function-v0.20.1) (2025-03-22)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.20.0 to ^0.20.1
    * @contract-case/case-plugin-base bumped from ^0.20.0 to ^0.20.1
    * @contract-case/case-plugin-dsl-types bumped from ^0.20.0 to ^0.20.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.0 to 0.20.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.19.2...@contract-case/case-core-plugin-function-v0.20.0) (2025-03-20)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.19.2 to ^0.20.0
    * @contract-case/case-plugin-base bumped from ^0.19.2 to ^0.20.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.19.2 to ^0.20.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.2 to 0.20.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.19.1...@contract-case/case-core-plugin-function-v0.19.2) (2025-03-19)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.19.1 to ^0.19.2
    * @contract-case/case-plugin-base bumped from ^0.19.1 to ^0.19.2
    * @contract-case/case-plugin-dsl-types bumped from ^0.19.1 to ^0.19.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.1 to 0.19.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.19.0...@contract-case/case-core-plugin-function-v0.19.1) (2025-03-18)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.19.0 to ^0.19.1
    * @contract-case/case-plugin-base bumped from ^0.19.0 to ^0.19.1
    * @contract-case/case-plugin-dsl-types bumped from ^0.19.0 to ^0.19.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.0 to 0.19.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.18.0...@contract-case/case-core-plugin-function-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions

### Features

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions ([afaa8d7](https://github.com/case-contract-testing/contract-case/commit/afaa8d75d81e45ca7609f89b1e17819183bc59b2))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.18.0 to ^0.19.0
    * @contract-case/case-plugin-base bumped from ^0.18.0 to ^0.19.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.18.0 to ^0.19.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.1.0 to 0.19.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.1 to 0.19.0

## [0.18.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.17.1...@contract-case/case-core-plugin-function-v0.18.0) (2024-10-17)


### ⚠ BREAKING CHANGES

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings

### Code Refactoring

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings ([c9ddd93](https://github.com/case-contract-testing/contract-case/commit/c9ddd93782b5e11cd5925ea76e089e0d779fdc11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.17.1 to ^0.18.0
    * @contract-case/case-plugin-base bumped from ^0.17.1 to ^0.18.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.17.1 to ^0.18.0

## [0.17.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.17.0...@contract-case/case-core-plugin-function-v0.17.1) (2024-10-08)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.17.0 to ^0.17.1
    * @contract-case/case-plugin-base bumped from ^0.17.0 to ^0.17.1
    * @contract-case/case-plugin-dsl-types bumped from ^0.17.0 to ^0.17.1

## [0.17.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.16.3...@contract-case/case-core-plugin-function-v0.17.0) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.16.3 to ^0.17.0
    * @contract-case/case-plugin-base bumped from ^0.16.3 to ^0.17.0
    * @contract-case/case-plugin-dsl-types bumped from ^0.16.3 to ^0.17.0

## [0.16.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.16.2...@contract-case/case-core-plugin-function-v0.16.3) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.16.2 to ^0.16.3
    * @contract-case/case-plugin-base bumped from ^0.16.2 to ^0.16.3

## [0.16.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.16.1...@contract-case/case-core-plugin-function-v0.16.2) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.16.1 to ^0.16.2
    * @contract-case/case-plugin-base bumped from ^0.16.1 to ^0.16.2

## [0.16.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.16.0...@contract-case/case-core-plugin-function-v0.16.1) (2024-10-01)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-function:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.16.0 to ^0.16.1
    * @contract-case/case-plugin-base bumped from ^0.16.0 to ^0.16.1

## [0.16.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-function-v0.15.7...@contract-case/case-core-plugin-function-v0.16.0) (2024-10-01)


### Features

* Add function caller mocks ([e05b370](https://github.com/case-contract-testing/contract-case/commit/e05b370380d67f1b0774631bbd83d5e0c83d6a59))
* Add function plugin for mocking function execution ([de74428](https://github.com/case-contract-testing/contract-case/commit/de74428f60945a754bf7da1fadc0f813bb5fa3f3))


### Bug Fixes

* Improve location reporting when function return types don't match ([1f32560](https://github.com/case-contract-testing/contract-case/commit/1f325600c7690c8124750fa9e1e3bc4fffb05aca))
* Improve plugin configuration error messages ([11d44bb](https://github.com/case-contract-testing/contract-case/commit/11d44bb8e951df8197ce3a7abaf9ca1d3e2a817d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-function-dsl bumped from ^0.15.7 to ^0.16.0
    * @contract-case/case-plugin-base bumped from ^0.15.7 to ^0.16.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.4 to 0.1.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.0 to 0.1.1
