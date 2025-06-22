# Changelog

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.25.1...documentation-v0.25.2) (2025-06-22)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.25.0...documentation-v0.25.1) (2025-06-18)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.24.2...documentation-v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.24.1...documentation-v0.24.2) (2025-06-11)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.24.0...documentation-v0.24.1) (2025-06-09)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.23.1...documentation-v0.24.0) (2025-05-26)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.23.0...documentation-v0.23.1) (2025-05-04)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.22.0...documentation-v0.23.0) (2025-04-28)


### Documentation

* Document changedContracts option ([d7a75d4](https://github.com/case-contract-testing/contract-case/commit/d7a75d4dd73c4b93e854e6ec31fd5c8d4e1499b8))

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.21.0...documentation-v0.22.0) (2025-04-14)


### Documentation

* Improve documentation about deploy checks ([ddcc78e](https://github.com/case-contract-testing/contract-case/commit/ddcc78e4f4fafc2f889f7a24b77264eb26562cb8))
* Improve information on sharing contracts ([cdbb277](https://github.com/case-contract-testing/contract-case/commit/cdbb277d474db16df7e48c23463bc96184f540d6))
* Improve matchers page with examples in both languages ([bf92f72](https://github.com/case-contract-testing/contract-case/commit/bf92f723f5bbf3cd119b3cc3471c66b687070fed))

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.20.1...documentation-v0.21.0) (2025-03-25)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.20.0...documentation-v0.20.1) (2025-03-22)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.19.2...documentation-v0.20.0) (2025-03-20)


### ⚠ BREAKING CHANGES

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details.

### Features

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details. ([b2a078d](https://github.com/case-contract-testing/contract-case/commit/b2a078d18631c15caf27706a672c49d040a47790))

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.19.1...documentation-v0.19.2) (2025-03-19)


### Miscellaneous Chores

* **documentation:** Synchronize ContractCase versions

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.19.0...documentation-v0.19.1) (2025-03-18)


### Bug Fixes

* **docs:** Correct install instructions for java ([e615234](https://github.com/case-contract-testing/contract-case/commit/e6152341b8322a86698b752128a2c69de918ac23))

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.0.8...documentation-v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* The `mocks` module has been renamed `interactions`; and `AnyMockDescriptor` has been renamed `AnyInteractionDescriptor`. You may need to update your imports
* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction

### Features

* Add ability for the current version to be generated from the git sha ([dd70365](https://github.com/case-contract-testing/contract-case/commit/dd703650fd058d34f6d772011b74faec10b93074))


### Documentation

* Add initial matcher documentation ([d95d868](https://github.com/case-contract-testing/contract-case/commit/d95d868d3f6f3a03e16119be25029822631d342e))
* Improve state handler documentation ([1c02ae0](https://github.com/case-contract-testing/contract-case/commit/1c02ae086216a153e6e3e7455eb45cfb28316b38))
* Minor improvements to wording in the state handler documentation ([7791228](https://github.com/case-contract-testing/contract-case/commit/7791228e235ec166ec7243fd4650ff5dbc70348b))
* Substantially improve documentation ([7bf4006](https://github.com/case-contract-testing/contract-case/commit/7bf40065063184795f94e6872cb80c3014c02db9))
* Update docs to reflect change from Example -&gt; interaction ([2d3b5b1](https://github.com/case-contract-testing/contract-case/commit/2d3b5b1cc8a6957ce02e5b0fe3194b68bb3eb956))
* Update matcher documentation ([ace5ac9](https://github.com/case-contract-testing/contract-case/commit/ace5ac9b0d00b79fb55d4373b6405a71f849d598))
* Update package versioning to make it clear that the versions are linked now ([fa43518](https://github.com/case-contract-testing/contract-case/commit/fa43518600c4d451450582d8776e9ead2292cd7a))


### Code Refactoring

* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction ([a37e0e8](https://github.com/case-contract-testing/contract-case/commit/a37e0e8258672894e702aebdb5d9cddce90923b4))
* The `mocks` module has been renamed `interactions`; and `AnyMockDescriptor` has been renamed `AnyInteractionDescriptor`. You may need to update your imports ([f3f4b0d](https://github.com/case-contract-testing/contract-case/commit/f3f4b0dafb6f9be2a5055fe198dda03025b5682b))

## [0.0.8](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.0.7...documentation-v0.0.8) (2024-10-01)


### Documentation

* Add more java examples ([c176fa9](https://github.com/case-contract-testing/contract-case/commit/c176fa93930b78c761d312d48ec133081aa13d38))
* Add some java examples ([b38a779](https://github.com/case-contract-testing/contract-case/commit/b38a77992c92e3cadb3474edeee39c3181394957))
* Add terminology page ([8fa1954](https://github.com/case-contract-testing/contract-case/commit/8fa195491f5084be3ceb83cf0253e755a8a018d3))
* Clarify contract definition section ([1040e60](https://github.com/case-contract-testing/contract-case/commit/1040e60a1488333ce59d92a1e3f64c6db6cd2e67))
* Remove FAQ and put the answers in more appropriate locations ([2cede5a](https://github.com/case-contract-testing/contract-case/commit/2cede5a9b66ac63375b540168f086b81c6bc5181))
* Significantly reduce repetition in documentation ([d69c222](https://github.com/case-contract-testing/contract-case/commit/d69c222796a75fc2ca7b50898af306d05c83aa98))
* Update introduction ([dffe337](https://github.com/case-contract-testing/contract-case/commit/dffe337bf2df428d18ac396e8399b55f187a68fc))

## [0.0.7](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.0.6...documentation-v0.0.7) (2024-01-06)


### Documentation

* Update mdx syntax for docusaurus upgrade ([d2e7d6c](https://github.com/case-contract-testing/contract-case/commit/d2e7d6cab50433c40680a66ae3d50f6d7b3117e8))

## [0.0.6](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.0.5...documentation-v0.0.6) (2023-06-01)


### Documentation

* Add missing data in relaxing tests and state definition code examples ([be57cab](https://github.com/case-contract-testing/contract-case/commit/be57cab1bc31f86e461e1cf63e7a1883c87b817f))
* Update brokers page, and add package versioning information ([4c025a7](https://github.com/case-contract-testing/contract-case/commit/4c025a7aae7badd9d91e51288e5d5a4f99c5c43b))

## [0.0.5](https://github.com/TimothyJones/ContractCaseTest/compare/documentation-v0.0.4...documentation-v0.0.5) (2023-05-19)


### Documentation

* Add missing data in relaxing tests and state definition code examples ([be57cab](https://github.com/TimothyJones/ContractCaseTest/commit/be57cab1bc31f86e461e1cf63e7a1883c87b817f))

## [0.0.4](https://github.com/case-contract-testing/contract-case/compare/documentation-v0.0.3...documentation-v0.0.4) (2023-05-17)


### Features

* Add ability for CLI to accept broker configuration as an option ([0565927](https://github.com/case-contract-testing/contract-case/commit/05659279746423b4fb1d2e6fa0df57aa14356c6f))


### Documentation

* Add CLI documentation page ([dc05756](https://github.com/case-contract-testing/contract-case/commit/dc05756aa6e554fb3076b72b86af8c5de845ca6e))
* Correct CLI instructions for verification ([a629bd4](https://github.com/case-contract-testing/contract-case/commit/a629bd46cb5f590454ac8382852fff285561b1b6))
* Correct link to examples ([cc173b6](https://github.com/case-contract-testing/contract-case/commit/cc173b68f9e5ef481bf0e40a3189ef85f66c5dcc))
* Correct several places where the name still showed as 'Case' ([d188f8f](https://github.com/case-contract-testing/contract-case/commit/d188f8f24d74c0172c1cae85284d4cec365b9af7))
* Correct typo ([85fc7b4](https://github.com/case-contract-testing/contract-case/commit/85fc7b4ba1eb19efa433e0e6dc9a3562c24b79d4))
* Correct URL to example ([8fe8982](https://github.com/case-contract-testing/contract-case/commit/8fe89829ba83f3d596c4048e75391b14ff556b46))
* Remove caveat about it not being the right package, because it is ([66905fb](https://github.com/case-contract-testing/contract-case/commit/66905fbde40b2e955fc1543a638d60c42eaf7358))
* Update documentation to match new format ([3c78016](https://github.com/case-contract-testing/contract-case/commit/3c780162ae66befede0904a26ff8ffb47975e8b6))

## [0.0.3](https://github.com/case-contract-testing/case/compare/documentation-v0.0.2...documentation-v0.0.3) (2023-04-26)


### Features

* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))

## [0.0.2](https://github.com/case-contract-testing/case/compare/case-documentation-v0.0.1...case-documentation-v0.0.2) (2023-04-19)


### Features

* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
