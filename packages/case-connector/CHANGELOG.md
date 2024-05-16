# Changelog

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
