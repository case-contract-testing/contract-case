# Changelog

## [0.27.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.27.1...@contract-case/case-core-plugin-http-v0.27.2) (2025-08-26)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.27.1 to 0.27.2
    * @contract-case/case-plugin-dsl-types bumped from 0.27.1 to 0.27.2
    * @contract-case/case-plugin-base bumped from 0.27.1 to 0.27.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.1 to 0.27.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.1 to 0.27.2

## [0.27.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.27.0...@contract-case/case-core-plugin-http-v0.27.1) (2025-08-20)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.27.0 to 0.27.1
    * @contract-case/case-plugin-dsl-types bumped from 0.27.0 to 0.27.1
    * @contract-case/case-plugin-base bumped from 0.27.0 to 0.27.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.0 to 0.27.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.0 to 0.27.1

## [0.27.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.26.1...@contract-case/case-core-plugin-http-v0.27.0) (2025-07-30)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.26.1 to 0.27.0
    * @contract-case/case-plugin-dsl-types bumped from 0.26.1 to 0.27.0
    * @contract-case/case-plugin-base bumped from 0.26.1 to 0.27.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.1 to 0.27.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.1 to 0.27.0

## [0.26.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.26.0...@contract-case/case-core-plugin-http-v0.26.1) (2025-07-13)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.26.0 to 0.26.1
    * @contract-case/case-plugin-dsl-types bumped from 0.26.0 to 0.26.1
    * @contract-case/case-plugin-base bumped from 0.26.0 to 0.26.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.26.0 to 0.26.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.0 to 0.26.1

## [0.26.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.25.2...@contract-case/case-core-plugin-http-v0.26.0) (2025-07-11)


### ⚠ BREAKING CHANGES

* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions

### Features

* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions ([7f06209](https://github.com/case-contract-testing/contract-case/commit/7f062096bdad81e5d763429682b99f481f9405ce))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.25.2 to 0.26.0
    * @contract-case/case-plugin-dsl-types bumped from 0.25.2 to 0.26.0
    * @contract-case/case-plugin-base bumped from 0.25.2 to 0.26.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.2 to 0.26.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.2 to 0.26.0

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.25.1...@contract-case/case-core-plugin-http-v0.25.2) (2025-06-22)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.25.1 to 0.25.2
    * @contract-case/case-plugin-dsl-types bumped from 0.25.1 to 0.25.2
    * @contract-case/case-plugin-base bumped from 0.25.1 to 0.25.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.1 to 0.25.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.1 to 0.25.2

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.25.0...@contract-case/case-core-plugin-http-v0.25.1) (2025-06-18)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.25.0 to 0.25.1
    * @contract-case/case-plugin-dsl-types bumped from 0.25.0 to 0.25.1
    * @contract-case/case-plugin-base bumped from 0.25.0 to 0.25.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.25.0 to 0.25.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.0 to 0.25.1

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.24.2...@contract-case/case-core-plugin-http-v0.25.0) (2025-06-18)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from 0.24.2 to 0.25.0
    * @contract-case/case-plugin-dsl-types bumped from 0.24.2 to 0.25.0
    * @contract-case/case-plugin-base bumped from 0.24.2 to 0.25.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.2 to 0.25.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.24.1...@contract-case/case-core-plugin-http-v0.24.2) (2025-06-11)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.24.1 to ^0.24.2
    * @contract-case/case-plugin-dsl-types bumped from 0.24.1 to 0.24.2
    * @contract-case/case-plugin-base bumped from ^0.24.1 to ^0.24.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.1 to 0.24.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.24.0...@contract-case/case-core-plugin-http-v0.24.1) (2025-06-09)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.24.0 to ^0.24.1
    * @contract-case/case-plugin-dsl-types bumped from 0.24.0 to 0.24.1
    * @contract-case/case-plugin-base bumped from ^0.24.0 to ^0.24.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.24.0 to 0.24.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.23.1...@contract-case/case-core-plugin-http-v0.24.0) (2025-05-26)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.23.1 to ^0.24.0
    * @contract-case/case-plugin-dsl-types bumped from 0.23.1 to 0.24.0
    * @contract-case/case-plugin-base bumped from ^0.23.1 to ^0.24.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.1 to 0.24.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.23.0...@contract-case/case-core-plugin-http-v0.23.1) (2025-05-04)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.23.0 to ^0.23.1
    * @contract-case/case-plugin-dsl-types bumped from 0.23.0 to 0.23.1
    * @contract-case/case-plugin-base bumped from ^0.23.0 to ^0.23.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.23.0 to 0.23.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.22.0...@contract-case/case-core-plugin-http-v0.23.0) (2025-04-28)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.22.0 to ^0.23.0
    * @contract-case/case-plugin-dsl-types bumped from 0.22.0 to 0.23.0
    * @contract-case/case-plugin-base bumped from ^0.22.0 to ^0.23.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.22.0 to 0.23.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.21.0...@contract-case/case-core-plugin-http-v0.22.0) (2025-04-14)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.21.0 to ^0.22.0
    * @contract-case/case-plugin-dsl-types bumped from 0.21.0 to 0.22.0
    * @contract-case/case-plugin-base bumped from ^0.21.0 to ^0.22.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.21.0 to 0.22.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.20.1...@contract-case/case-core-plugin-http-v0.21.0) (2025-03-25)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.20.1 to ^0.21.0
    * @contract-case/case-plugin-dsl-types bumped from 0.20.1 to 0.21.0
    * @contract-case/case-plugin-base bumped from ^0.20.1 to ^0.21.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.1 to 0.21.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.20.0...@contract-case/case-core-plugin-http-v0.20.1) (2025-03-22)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.20.0 to ^0.20.1
    * @contract-case/case-plugin-dsl-types bumped from 0.20.0 to 0.20.1
    * @contract-case/case-plugin-base bumped from ^0.20.0 to ^0.20.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.20.0 to 0.20.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.19.2...@contract-case/case-core-plugin-http-v0.20.0) (2025-03-20)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.19.2 to ^0.20.0
    * @contract-case/case-plugin-dsl-types bumped from 0.19.2 to 0.20.0
    * @contract-case/case-plugin-base bumped from ^0.19.2 to ^0.20.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.2 to 0.20.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.19.1...@contract-case/case-core-plugin-http-v0.19.2) (2025-03-19)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.19.1 to ^0.19.2
    * @contract-case/case-plugin-dsl-types bumped from 0.19.1 to 0.19.2
    * @contract-case/case-plugin-base bumped from ^0.19.1 to ^0.19.2
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.1 to 0.19.2
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.19.0...@contract-case/case-core-plugin-http-v0.19.1) (2025-03-18)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.19.0 to ^0.19.1
    * @contract-case/case-plugin-dsl-types bumped from 0.19.0 to 0.19.1
    * @contract-case/case-plugin-base bumped from ^0.19.0 to ^0.19.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.19.0 to 0.19.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.18.0...@contract-case/case-core-plugin-http-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions

### Features

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions ([afaa8d7](https://github.com/case-contract-testing/contract-case/commit/afaa8d75d81e45ca7609f89b1e17819183bc59b2))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.18.0 to ^0.19.0
    * @contract-case/case-plugin-dsl-types bumped from 0.18.0 to 0.19.0
    * @contract-case/case-plugin-base bumped from ^0.18.0 to ^0.19.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.1.0 to 0.19.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.1 to 0.19.0

## [0.18.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.17.1...@contract-case/case-core-plugin-http-v0.18.0) (2024-10-17)


### ⚠ BREAKING CHANGES

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings

### Code Refactoring

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings ([c9ddd93](https://github.com/case-contract-testing/contract-case/commit/c9ddd93782b5e11cd5925ea76e089e0d779fdc11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.17.1 to ^0.18.0
    * @contract-case/case-plugin-dsl-types bumped from 0.17.1 to 0.18.0
    * @contract-case/case-plugin-base bumped from ^0.17.1 to ^0.18.0

## [0.17.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.17.0...@contract-case/case-core-plugin-http-v0.17.1) (2024-10-08)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.17.0 to ^0.17.1
    * @contract-case/case-plugin-dsl-types bumped from 0.17.0 to 0.17.1
    * @contract-case/case-plugin-base bumped from ^0.17.0 to ^0.17.1

## [0.17.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.16.3...@contract-case/case-core-plugin-http-v0.17.0) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.16.3 to ^0.17.0
    * @contract-case/case-plugin-dsl-types bumped from 0.16.3 to 0.17.0
    * @contract-case/case-plugin-base bumped from ^0.16.3 to ^0.17.0

## [0.16.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.16.2...@contract-case/case-core-plugin-http-v0.16.3) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.16.2 to ^0.16.3
    * @contract-case/case-plugin-base bumped from ^0.16.2 to ^0.16.3

## [0.16.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.16.1...@contract-case/case-core-plugin-http-v0.16.2) (2024-10-02)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.16.1 to ^0.16.2
    * @contract-case/case-plugin-base bumped from ^0.16.1 to ^0.16.2

## [0.16.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.16.0...@contract-case/case-core-plugin-http-v0.16.1) (2024-10-01)


### Miscellaneous Chores

* **@contract-case/case-core-plugin-http:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.16.0 to ^0.16.1
    * @contract-case/case-plugin-base bumped from ^0.16.0 to ^0.16.1

## [0.16.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-core-plugin-http-v0.15.7...@contract-case/case-core-plugin-http-v0.16.0) (2024-10-01)


### ⚠ BREAKING CHANGES

* Export plugin as the default export instead of named
* Split HTTP mock and matchers to their own packages

### Features

* Allow specifying baseUrlUnderTest via mockConfig ([052ea3f](https://github.com/case-contract-testing/contract-case/commit/052ea3f6fadb95c7140c75024ac181b2fd8743ad))


### Bug Fixes

* Correct issue where correctly configured http plugins said they weren't correctly configured ([df386cb](https://github.com/case-contract-testing/contract-case/commit/df386cb2e8ca41d6c1a06819dc84c611bb1b74ea))
* Fix issue where tests could hang on node 18 ([e023711](https://github.com/case-contract-testing/contract-case/commit/e023711337a015eee3297fe42cc251c0ff49ef05))
* Improve plugin configuration error messages ([11d44bb](https://github.com/case-contract-testing/contract-case/commit/11d44bb8e951df8197ce3a7abaf9ca1d3e2a817d))


### Miscellaneous Chores

* Split HTTP mock and matchers to their own packages ([bfc2e4f](https://github.com/case-contract-testing/contract-case/commit/bfc2e4ff2d464899fd8ce63978048e9f1991ff80))


### Code Refactoring

* Export plugin as the default export instead of named ([78397d2](https://github.com/case-contract-testing/contract-case/commit/78397d2bea51b41f1c6b53bc70fdc741f5e7d084))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-core-plugin-http-dsl bumped from ^0.15.7 to ^0.16.0
    * @contract-case/case-plugin-base bumped from ^0.15.7 to ^0.16.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.0.4 to 0.1.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.0 to 0.1.1
