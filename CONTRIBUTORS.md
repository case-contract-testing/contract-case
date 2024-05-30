# ContractCase contribution instructions

ContractCase welcomes contributions!

If your change is major, or you'd like to discuss it before starting work, please open an issue to
avoid having to rework your hard work.

### Maintainer documentation

You can find maintainer documentation for all ContractCase modules and
packages [here](./docs/maintainers).

The [package structure](./docs/maintainers/PackageStructure.md)
documentation is an important starting point, as it describes the functionality of each package.

Any guidelines in those instructions also apply here. If any information is missing, or you have
further questions, please open an issue.

### DSL specific things

In the DSL packages (eg `dsl-java`), new additions and code changes should exclusively be for making
the use of ContractCase idiomatic in the relevant ecosystem (eg Java / the JVM).

If your change might have broader use, please put it instead
in [one of the core packages](./docs/maintainers/PackageStructure.md), with the prefix `packages/case`.
