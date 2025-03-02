## Package structure

This page describes the structure of the packages, and the internal source layout of each package.

### Monorepo contains:

Largely, there are five kinds of packages- the `connector`, the `core`, the `plugin`, the user facing (`contract-case`) libraries, the `documentation`, and the `maintainer` packages.

#### Connector layer

The connector is the boundary that the user-facing libraries should include.

- case-connector: The gRPC connector that is the entrypoint for contract-case in other languages. It can be used as a server to call contract-case from languages that support gRPC, and it also exposes the same interface as JS bindings, in case the target language can call javascript directly.
- case-connector-proto: The protobuf / gRPC definitions for case-connector. This is separate so that language dependent implementations can more comfortably include it.

#### Core

The main `case-core` package implements the core contract testing engine, which sets up the mocks, calls the state handlers and triggers, and writes the contract. General behaviour goes in here.

The `core-plugin-{xxx}` packages contain the types and behaviour for the plugins that ContractCase includes. They're built using the same plugin framework available to external users, and should not
rely on internal knowledge or undocumented APIs.

- `case-core-plugin-{xxx}`: Implements the behaviours for various core plugins that ContractCase ships with (eg, the `http` plugin contains the mock client, mock server, and any HTTP related matchers)
- `case-core-plugin-{xxx}-dsl`: Contains the types for describing the matchers or mocks for each plugin. This is a separate package so that packages that expose these (eg the definition-dsl) don't need to depend on the behaviour package.

There are some additional packages that are part of the core layer:

- `case-entities`: Base types and helpers imported by several packages. Separate to avoid circular dependencies. Custom plugins should not need to import this package. If you feel you need to import something from this package outside the core, it probably means something that's in this package should move out, please open an issue.

#### Plugin base

These contain the interface that plugins rely on - it describes the boundary between the core and the plugin interfaces. External plugins should depend on these.

- `case-plugin-base`: Base behaviour needed to implement plugins for ContractCase
- `case-plugin-dsl-types`: Base types needed to implement the type-only DSL layer for ContractCase.

#### User-facing packages

These are the packages that users will actually import and use in their tests. These generally depend on `case-connector`, and know how to start the server. See [adding DSLs](./AddingDsl.md) for details.

- `contract-case-jest`: The user-facing Jest library for ContractCase
- `dsl-java`: The user-facing Java library for ContractCase (this should be renamed `contract-case-java`)

Additionally, there are two cross-platform packages:

- `contract-case-cli`: The cross-platform CLI used for contract manipulation and contacting a broker.
- `case-definition-dsl`: The JSii layer that just describes the definition language for defining interactions to be run. This should be renamed `contract-case-definition-dsl` for consistency. It currently re-exports the http-plugin-dsl types - long term, we should separate this into a separate

#### Documentation

The main documentation is built in the `documentation` package. Any custom code that's specific to `contract-case` is in a package prefixed with documentation - eg `documentation-matchers-generator` generates the matcher documentation. None of the documentation packages are published to any package managers.

#### Maintainer packages

- `case-maintainer-config`: Common settings for maintaining packages (doesn't include the eslint config, as it needs specific naming conventions).
- `eslint-config-case-maintainer`: Common eslint settings for all typescript packages

## Source structure inside a package.

Most of the javascript packages follow the same general layout, unless there's a technology-specific reason not to do it this way:

### Sub-package layout

- boundaries: For the DSL that will be used by different languages. Everything in here should only be for exposing ContractCase to the users, and there should be no behaviour
- connectors: General connections outside ContractCase (including incoming)
- core: The engine that runs the mocks
- diffmatch: The engine that runs the data matching
- entities: The base layer of application wide concepts

No lower layer is allowed to include code from an upper layer.

### Source file layout

The source files follow the direct-child include rule, which aims to provide the following benefits:

- It is clear from the structure which code is globally imported and which is used only locally, which means you can assess impact of changes without checking
- It is clear which modules depend on each other, which means you can assess the appropriate interface easily
- Where to put new code is clear
- Where to look to find existing code is clear

#### The direct-child import rule for TypeScript:

- A module can only import modules from:
- The same directory - eg:
  - code in `src/a/a.ts` may import from `src/a/b` (which is either `src/a/b.ts` or `src/a/b/index.ts`)
  - code in `src/a/a.ts` may not import from `src/a/b/c.ts` or `src/a/b/c/d`
- One of the very top level directories under `src` - these are where common code goes. For example, code anywhere may import from `src/components`. This means:
  - code in `src/pages/b/c/d.ts` may import from `src/components/a`
  - code in `src/pages/b/c/d.ts` may not import from `src/components/a/b`
  - Any module in a common directory (eg `src/*/`) must be imported in more
    than one place. If the code changes so that previously common code is
    only used in one other module, it should be moved out to be in the same directory as the module.
- If a module is not imported by the main module in a directory, then it should be down one more level.
- Eg, if `src/a/a.ts` imports `src/a/b.ts` which imports `src/a/c.ts` (which is not imported by `src/a/a.ts`), then b and c move down one level:

```
 // Not like this
 src/
    ├─ a/
    │  ├─ index.ts // re-exports ./a
    │  ├─ a.ts     // imports ./b
    │  ├─ b.ts     // imports ./c
    │  ├─ c.ts
```

so that it looks like this:

```
 src/
    ├─ a/
    │  ├─ index.ts // re-exports ./a
    │  ├─ a.ts     // imports ./b
    │  ├─ b/
    │  │  ├─ index.ts // re-exports ./b (imported by a)
    │  │  ├─ b.ts     // imports ./c
    │  │  ├─ c.ts
```

This structure has the advantage that you can see that `b` is only used by `a`, and `c` is only used by `b`

#### Index files

- The main module in a directory is named the same as the directory - eg, the
  main export from `src/a` is `src/a/a.ts`. This is so that your editor tabs doesn't
  get cluttered with `index.ts` files that contain different code.
- `index.ts` files only contain re-exports. They describe the public
  interface of the module that is in that folder, and may re-export anything
  according to the rules below.
  This code follows the Direct Child Include Rule:

## Other languages

Although there's no requirement to follow a particular structure for the other languages,
the preference is to follow the philosophy above, with modifications so that it remains
idiomatic in the language.
