# Package Versioning

ContractCase releases follow [semantic versioning](https://semver.org/), with two additional restrictions:

1. Before 1.0.0, ContractCase is in Beta, and the API is considered unstable. Breaking changes will be indicated in minor
   version bumps- that is, 0.2.0 and 0.3.0 are not entirely compatible.
2. Patch versions will always be backwards compatible.

Breaking changes will always be detailed in the relevant changelogs.

## Relevant packages

ContractCase has two boundary layers - the DSLs, and the core packages. When you
run tests with logging enabled, the version of the core package used by your version of ContractCase will be logged - if you need to check the changelog for your core version, use this version.

The core version and the DSL versions are independent. Breaking changes from the core that will affect users (eg a file format change) are also communicated to users via breaking DSL version numbers.

Most of the time you won't need to worry about which version you are using - the latest version of the DSL for your language will have the most recent core and therefore the most recent fixes and functionality.

### DSL packages

- TypeScript / JavaScript with Jest: ContractCase Jest [changelog](https://github.com/case-contract-testing/contract-case/blob/main/packages/contract-case-jest/CHANGELOG.md)
- Java: Coming June 2023
- Python: After Java
- C#: After Python
- Go: After C#

### Core package

- ContractCase Core [changelog](https://github.com/case-contract-testing/contract-case/blob/main/packages/case-core/CHANGELOG.md

### Additional packages

For the curious, there are some additional packages that you only need to know about if you are planning to maintain ContractCase or add additional language DSLs. These are implementation details that you shouldn't need to know about (unless you're either a maintainer or curious).

Of course, if you _are_ a maintainer or curious, you can check out the [maintainer documentation here](https://github.com/case-contract-testing/contract-case/tree/main/docs/maintainers). It is much rougher than this documentation.
