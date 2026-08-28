# ContractCase contribution instructions

ContractCase welcomes contributions!

For bugfixes, please raise an issue alongside your PR describing the bug.

If your change is major, please open an issue first to discuss. This avoids having to rework your hard work on the first review.

### Commit convention

ContractCase uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to automatically generate the changelog, and squashes PRs. What this means is -
if your PR has user facing changes (eg, is a bugfix or a new feature), please use the PR title to document it with the following convention:

```
# indicate a bug fix to the 'scope' component
fix(scope): Describe the bug fix here

# indicate new feature in the 'scope' component
feat(scope): Describe the feature here

# indicate a bug fix which also introduces a breaking change:
fix(scope)!: Describe the bug fix here, why it is a breaking change, and what to do when migrating

# indicate new feature in the 'scope' component which is a breaking change
feat(scope): Describe the feature here, why it is a breaking change, and what to do when migrating
```

Usually the `scope` will be a package, eg `java-dsl`. It doesn't have to match the package name exactly, and isn't read by any automated tools - it's intended to make changes clear for humans reading the changelog.

There is no limit on the length of a commit message here - we're prioritising a nice human-readable changelog over short commit messages. So, instead of `Fix issue #123`, say `Fix an issue where users in <some situation> got <incorrect behaviour>`, or similar.

The commit types primarily used by ContractCase are:

- `feat`: Indicates a new feature
- `fix`: Indicates a bug fix or minor improvement
- `docs`: Indicates a documentation-only change, including changes that only change code comments
- `refactor`: Indicates a refactor (occasionally these result in breaking changes)
- `chore`: Everything else. For most external contributors, you won't need to use chore.

If you're not sure which one to use, just pick the one that feels most right, and we can discuss on the PR. Don't stress too much :)

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

```

```
