# Changelog

## [0.31.3](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-vitest-v0.31.2...@contract-case/contract-case-vitest-v0.31.3) (2026-09-04)


### Miscellaneous Chores

* **@contract-case/contract-case-vitest:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.31.2 to 0.31.3
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.31.2 to 0.31.3

## [0.31.2](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-vitest-v0.31.1...@contract-case/contract-case-vitest-v0.31.2) (2026-08-31)


### Miscellaneous Chores

* **@contract-case/contract-case-vitest:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.31.1 to 0.31.2
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.31.1 to 0.31.2

## [0.31.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-vitest-v0.31.0...@contract-case/contract-case-vitest-v0.31.1) (2026-08-31)


### Bug Fixes

* **vitest:** Bump peer dependency to include vitest 4.x - this worked previously, but now it is explicit ([88b56e8](https://github.com/case-contract-testing/contract-case/commit/88b56e8707911cc5d6849b9237076504502f148e))
* **vitest:** Enable coloured logging, previously colours were stripped because of the way vitest runners work ([3ef9cc2](https://github.com/case-contract-testing/contract-case/commit/3ef9cc24bf034f7c45e6d3ce97e46d5eca061823))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.31.0 to 0.31.1
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.31.0 to 0.31.1

## [0.31.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-vitest-v0.30.1...@contract-case/contract-case-vitest-v0.31.0) (2026-08-28)


### Miscellaneous Chores

* **@contract-case/contract-case-vitest:** Synchronize ContractCase versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.30.1 to 0.31.0
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.30.1 to 0.31.0

## [0.30.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-vitest-v0.30.0...@contract-case/contract-case-vitest-v0.30.1) (2026-07-18)


### Features

* Add vitest bindings with the same interface as the jest interface, and extract common TS-side user code to a shared package, `contract-case-dsl-js`, useful for anyone building non-jest or non-vitest bindings ([#1328](https://github.com/case-contract-testing/contract-case/issues/1328)) ([83534d1](https://github.com/case-contract-testing/contract-case/commit/83534d1b9a6a99da89e4b5ec3d4a89d995bc5a3d))


### Bug Fixes

* **vitest:** Correctly export ESM instead of CJS for the vitest bindings. This might sound like a breaking change, but because of the way vitest works, it could never have worked before ([9202ab6](https://github.com/case-contract-testing/contract-case/commit/9202ab66a392c21f7f669285748eea120e2af523))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.30.0 to 0.30.1
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.30.0 to 0.30.1

## [0.30.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/contract-case-dsl-js-vitest-v0.29.1...@contract-case/contract-case-dsl-js-vitest-v0.30.0) (2026-07-05)


### Features

* Add vitest bindings with the same interface as the jest interface, and extract common TS-side user code to a shared package, `contract-case-dsl-js`, useful for anyone building non-jest or non-vitest bindings ([#1328](https://github.com/case-contract-testing/contract-case/issues/1328)) ([83534d1](https://github.com/case-contract-testing/contract-case/commit/83534d1b9a6a99da89e4b5ec3d4a89d995bc5a3d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/contract-case-dsl-js bumped from 0.29.1 to 0.30.0
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.29.1 to 0.30.0
