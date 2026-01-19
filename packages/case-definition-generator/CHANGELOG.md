# Changelog

## [0.28.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-definition-generator-v0.28.0...@contract-case/case-definition-generator-v0.28.1) (2026-01-19)


### Features

* **plugin-base:** Plugins now can expose DSL definitions that can be built by the DSL generator ([e665a55](https://github.com/case-contract-testing/contract-case/commit/e665a556054ccd4bef20c469de5885d6425f8268))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-base bumped from 0.28.0 to 0.28.1
    * @contract-case/case-core-plugin-http bumped from 0.28.0 to 0.28.1
    * @contract-case/case-core-plugin-function bumped from 0.28.0 to 0.28.1
    * @contract-case/case-plugin-dsl-types bumped from 0.28.0 to 0.28.1
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.28.0 to 0.28.1
    * @contract-case/eslint-config-case-maintainer bumped from 0.28.0 to 0.28.1

## [0.28.0](https://github.com/case-contract-testing/contract-case/compare/@contract-case/case-definition-generator-v0.27.3...@contract-case/case-definition-generator-v0.28.0) (2025-12-14)


### ⚠ BREAKING CHANGES

* **java-dsl:** Remove JSii. This is a substantial ergonomic improvement, but it also means that the previous DSL classes in \`io.contract_testing.contractcase.definitions\` need to be replaced with the classes in \`io.contract_testing.contractcase.dsl\`. The functionality has been preserved, but there are minor differences in the way the DSL is expressed. Please see the documentation or official test code for examples of usage.

### Features

* **java:** Generated DSL classes now all have the ContractCaseDsl annotation on the class, to assist with custom serialisation ([77f3fca](https://github.com/case-contract-testing/contract-case/commit/77f3fcaa550c90b12fe43d240e60afc39dd80a9b))


### Code Refactoring

* **java-dsl:** Remove JSii. This is a substantial ergonomic improvement, but it also means that the previous DSL classes in \`io.contract_testing.contractcase.definitions\` need to be replaced with the classes in \`io.contract_testing.contractcase.dsl\`. The functionality has been preserved, but there are minor differences in the way the DSL is expressed. Please see the documentation or official test code for examples of usage. ([6fa0d75](https://github.com/case-contract-testing/contract-case/commit/6fa0d75157de65a52cc41e297fd4fe0103de5cfc))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-plugin-base bumped from 0.27.3 to 0.28.0
    * @contract-case/case-plugin-dsl-types bumped from 0.27.3 to 0.28.0
  * devDependencies
    * @contract-case/case-maintainer-config bumped from 0.27.3 to 0.28.0
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.3 to 0.28.0
