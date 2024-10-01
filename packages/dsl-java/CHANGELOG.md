# Changelog

## [0.1.1](https://github.com/case-contract-testing/contract-case/compare/@contract-case/dsl-java-v0.1.0...@contract-case/dsl-java-v0.1.1) (2024-10-01)


### Features

* Add loadPlugin message to both contract definition and verification grpc streams ([5845808](https://github.com/case-contract-testing/contract-case/commit/584580849cc48eaf990a2b559ab85f29f0b571b6))
* Add mockConfig configuration property ([f82a394](https://github.com/case-contract-testing/contract-case/commit/f82a394f4e048721f5399928a83f19ed044ac13c))
* Add plugin loader methods to ContractDefiner and ContractVerifier ([1112f40](https://github.com/case-contract-testing/contract-case/commit/1112f40de01e53dd4dc5f60d9562a30a4fe090d4))


### Bug Fixes

* Avoid channel unavailable messages during normal shutdown ([0ccdbf7](https://github.com/case-contract-testing/contract-case/commit/0ccdbf7a5e2dfd10deb92a68b0b6a552ccef10d3))
* Extract sourcemap for better stack traces ([e465b96](https://github.com/case-contract-testing/contract-case/commit/e465b962296ae0c661c5c0a0dd7e230218e6aca7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @contract-case/case-connector bumped from 0.7.5 to 0.8.0

## [0.1.0](https://github.com/case-contract-testing/java-dsl/compare/contractcase-v0.0.1...contractcase-v0.1.0) (2024-05-16)


### ⚠ BREAKING CHANGES

* Change config map for a more convenient SetupInfo object

### Features

* Add builders for config objects ([a01ff31](https://github.com/case-contract-testing/java-dsl/commit/a01ff31ba0aa5d4500692e9fd126496f7414c2cc))
* Add ContractCaseCore crash handler ([087bc05](https://github.com/case-contract-testing/java-dsl/commit/087bc053ca94fc2eb2e6464c50eb1815f83ab472))
* Add ContractDefiner interface ([66332ac](https://github.com/case-contract-testing/java-dsl/commit/66332ac0421e372643110246fdc9934e51f766de))
* Add ContractVerifier ([d1a9dde](https://github.com/case-contract-testing/java-dsl/commit/d1a9ddef2fce847727a68467b3fd3519316d1a2c))
* Add methods that take config builders, so you don't need to call build() as often ([21e6c84](https://github.com/case-contract-testing/java-dsl/commit/21e6c84f5c42445f84291464bf37a0d14f24b134))
* Add no-config versions of runExample and runThrowingExample ([a62b4f6](https://github.com/case-contract-testing/java-dsl/commit/a62b4f6b7d41c45790921b23f0e6f7bc5d1c29d1))
* Add ResultPrinter implementation ([50ef39c](https://github.com/case-contract-testing/java-dsl/commit/50ef39c637624740355123ffd35b4c3630096ee2))
* Add verifier using the new connector style ([aaef35d](https://github.com/case-contract-testing/java-dsl/commit/aaef35d129d2a12bd6304a182f5375ba1986eb5f))
* Bundle ContractCase core runtime ([86cb5f2](https://github.com/case-contract-testing/java-dsl/commit/86cb5f24d4410f73881f9bf2f8e65a245e93c000))
* Change config map for a more convenient SetupInfo object ([42137a0](https://github.com/case-contract-testing/java-dsl/commit/42137a009d01d6565793f07676cf4e7c7e805c8c))
* Expose matchers and mocks in API ([4b2a683](https://github.com/case-contract-testing/java-dsl/commit/4b2a683a1244c2a11d7d9d517e5e905755a74222))
* Get runExample working ([f2d16f6](https://github.com/case-contract-testing/java-dsl/commit/f2d16f68ebad693fe00623deceafc5706d2628aa))
* Get verification working ([fa9d179](https://github.com/case-contract-testing/java-dsl/commit/fa9d179cc291e380742633586bfad7f9ce03d3d2))
* Implement state handler calls ([f595d88](https://github.com/case-contract-testing/java-dsl/commit/f595d88244fcfa8345730d5124d480186cbc44b1))
* Replace boundary connector with one that connects to case-connector instead, working around JSii issue ([e902547](https://github.com/case-contract-testing/java-dsl/commit/e902547921c28bc575a4de6e5a5c4090655e4a82))


### Bug Fixes

* Embed @contract-case/case-connector@0.7.5 ([d232ea2](https://github.com/case-contract-testing/java-dsl/commit/d232ea2280c0a9ad8fab95f30893b4f4d33bbc03))
* Gracefully shutdown grpc channel on shutdown ([208dcdb](https://github.com/case-contract-testing/java-dsl/commit/208dcdb28a2a4dcfeb77454e0432a0071f1259f7))
