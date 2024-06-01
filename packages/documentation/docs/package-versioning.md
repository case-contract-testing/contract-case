# ContractCase versions

ContractCase releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, ContractCase is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Patch versions will always be backwards compatible - you will always be able to read a contract written with an later patch version, if you have an earlier core patch version.

Breaking changes will always be detailed in the relevant changelogs.

### DSL packages

- TypeScript / JavaScript with Jest: ContractCase Jest [changelog](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/CHANGELOG.md)
- Java / JVM: ContractCase Java [changelog](https://github.com/case-contract-testing/contract-case/blob/main/packages/dsl-java/CHANGELOG.md)
- Python: After Java
- C#: After Python
- Go: After C#

## Package versioning

ContractCase has two main layers - the DSLs, and the core packages. The core version is unrelated to the DSL versions. This because changes that break one language might not be breaking changes in another language. It's also because some of the implementation details of the core might not be breaking changes for the user-facing DSL.

Most of the time you won't need to worry about which version you are using - the
latest version of the DSL for your language will have the most recent core and
therefore the most recent fixes and functionality.

However, for completeness, the meaning and versioning guarantees are detailed here.

The versions of the Breaking changes from the core that will affect users (eg a file format change) are also communicated to users via
breaking changes indicated in the DSL version numbers.

When you
run tests with logging enabled, the version of the core package used by your version of ContractCase will be logged - if you need to check the changelog for your core version, use this version.

### Core package

- ContractCase Core [changelog](https://github.com/case-contract-testing/contract-case/blob/main/packages/case-core/CHANGELOG.md

### Additional packages

For the curious, there are some additional packages that you only need to know about if you are planning to maintain ContractCase or add additional language DSLs. These are implementation details that you shouldn't need to know about (unless you're either a maintainer or curious).

Of course, if you _are_ a maintainer or curious, you can check out the [maintainer documentation here](https://github.com/case-contract-testing/contract-case/tree/main/docs/maintainers). It is much rougher than this documentation.
