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

ContractCase package versions are now linked - meaning that Java DSL version 0.19.0 wraps core version 0.19.0. This means you can easily tell what version you have.

A major version bump will happen for all packages when any of the external APIs experiences a breaking change.

Most users won't need a definition of the difference between external APIs and
implementation details - but for completeness,
the external API includes:

- All user-facing DSLs
- The contract file format
- The configuration objects and behaviour
- The expectations of the matching engine
- The plugin framework
- Everything that Case-Connector exposes (ie, the boundary between the user-facing DSL and the core matching engine)

If you're curious, you can check out the [maintainer documentation here](https://github.com/case-contract-testing/contract-case/tree/main/docs/maintainers). It is much rougher than this documentation.
