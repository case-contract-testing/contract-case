# Changelog

## [0.8.0](https://github.com/case-contract-testing/case/compare/case-entities-internal-v0.7.0...case-entities-internal-v0.8.0) (2023-04-19)


### ⚠ BREAKING CHANGES

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))


### Bug Fixes

* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))
