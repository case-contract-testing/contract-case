# Changelog

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
