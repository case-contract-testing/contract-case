---
sidebar_position: 1
sidebar_label: 'The anatomy of a plugin'
---

# The anatomy of a plugin

A ContractCase plugin is an npm package whose default export is a single
object of type `ContractCasePlugin`. Everything the plugin provides hangs off
this one object:

```ts
import { ContractCasePlugin } from '@contract-case/case-plugin-base';

const YourPlugin: ContractCasePlugin<
  MatcherTypes, // A union of string constants for your matcher types
  MockTypes, // A union of string constants for your mock types
  MatcherDescriptors, // A union of your matcher descriptor object types
  MockDescriptors, // A union of your mock descriptor object types
  AllSetupInfo // A union of the setup info objects your mocks provide
> = {
  description, // Names and version for this plugin
  matcherExecutors, // How your matchers behave, keyed by matcher type
  setupMocks, // How your mocks behave, keyed by mock type
  dsl, // (Optional) declares your user-facing DSL for generation
};

export default YourPlugin;
```

For a real example, see the assembly of the
[core function plugin](https://github.com/case-contract-testing/contract-case/blob/main/packages/case-core-plugin-function/src/index.ts).

The pieces are:

- `description` - the plugin's names and version, described below.
- `matcherExecutors` - a map from each of your matcher type constants to the
  [matcher executor](./writing-matchers) implementing its behaviour.
- `setupMocks` - a map from each of your mock type constants to the
  [mock executor](./writing-mocks) implementing its behaviour.
- `dsl` - an optional [DSL declaration](./dsl-generation), so that the
  user-facing classes for your matchers and mocks can be generated in each
  supported language.

The rest of this section covers each of these in detail. This page covers the
concepts that apply to the whole plugin: how ContractCase models interactions,
the description object, how to structure your packages, and the naming rules
that keep plugins from colliding with each other.

## One model: matchers are data, executors are behaviour

There's only one model in ContractCase - it's used in the contract file, to
run contract tests, and to extend ContractCase with plugins. Understanding it
makes the rest of the plugin API unsurprising:

- **Matchers are immutable JSON data.** A matcher describes an expectation
  ("any integer", "an HTTP request to `/health`"), and is written into the
  contract file exactly as the DSL produced it. Matchers are recursive - a
  matcher's parameters may themselves contain matchers or literal data.
- **Executors are behaviour.** An executor is the code that interprets a
  matcher (or mock descriptor) at test time. Executors live in plugins and are
  looked up by the matcher's type constant.

This split is why a contract file written today can be verified later, on
another machine, in another language: the file contains only data, and any
engine with the right plugins loaded can interpret it.

Each interaction in the contract file (called an `example` in the file format)
has three parts - the states it needs, the description of the mock (containing
the matcher trees), and the result of the interaction when it was defined. See
the [contract file format](../reference/plugin-framework) for the details of
how these are written down.

## The description object

The `description` property identifies your plugin:

```ts
import { PluginDescription } from '@contract-case/case-plugin-base';

export const description: PluginDescription = {
  humanReadableName: 'ULID Matcher Plugin',
  shortName: 'ulid',
  uniqueMachineName: 'yourorg:contract-case-plugin-ulid',
  version: '1.0.0',
};
```

Each field exists for a different audience, which is why there are three
different names:

- `humanReadableName` is for people - it's printed in log and error messages
  about your plugin.
- `shortName` is for your users' configuration - it's the key that users
  write under the [`mockConfig` configuration property](../reference/configuring#mockconfig-object)
  to configure your mocks. It should be reasonably unique, but doesn't have to
  be globally unique: if two plugins deliberately share configuration, it's
  fine (and useful) for them to share a `shortName`.
- `uniqueMachineName` is for the engine - it's how ContractCase reasons about
  which plugins are loaded. It **must** be unique in the whole plugin
  ecosystem, because two plugins with the same `uniqueMachineName` can't be
  loaded in the same contract. For this reason, we recommend namespacing it
  with a prefix you control - for example, the GitHub organisation or username
  that hosts your plugin's repository.
- `version` must be a [semantic version](https://semver.org/) string. At load
  time, ContractCase uses it to detect conflicts: loading the same
  `uniqueMachineName` at the same version twice is fine (the second load is
  skipped), but loading it at two _different_ versions is a configuration
  error.

:::caution WARNING

Don't start your `uniqueMachineName` with the core plugin prefix
(`_CaseCore:`, exported as `CORE_PLUGIN_PREFIX`). It's how ContractCase
recognises its own built-in plugins - core plugins log less debug information,
and failures loading them are treated as crashes in ContractCase rather than
user configuration errors. If your plugin uses this prefix, load failures and
logging won't be handled appropriately.

:::

## Namespacing your types

Every matcher type and mock type constant in the ecosystem shares one global
registry, so the type constants your plugin defines must not collide with
anyone else's:

- All matcher and mock types provided by ContractCase itself are prefixed with
  `_case:` (for example `_case:MatchInteger`, `_case:MockHttpServer`). This
  prefix is reserved: a non-core plugin that tries to register a `_case:` mock
  type will fail to load with a configuration error.
- Prefix your own type constants with a namespace you control, in the same
  style: `yourorg:AnyUlid`, `yourorg:MockMessageQueue`.

Because type constants are written into the contract file, they're part of
your plugin's public API - renaming one is a breaking change that makes
previously-written contracts unverifiable. Choose them carefully.

## Package structure

Two packages from the ContractCase monorepo are relevant to plugin authors:

- [`@contract-case/case-plugin-base`](https://www.npmjs.com/package/@contract-case/case-plugin-base)
  provides the types for the plugin itself (`ContractCasePlugin`,
  `MatcherExecutor`, `MockExecutor`, `MatchContext`) plus the helper functions
  you'll use to implement executors (error constructors, result combinators,
  the describe helpers, and so on).
- [`@contract-case/case-plugin-dsl-types`](https://www.npmjs.com/package/@contract-case/case-plugin-dsl-types)
  provides the types that describe data in the contract file
  (`AnyCaseMatcherOrData`, `AnyMockDescriptor`, and friends), without dragging
  in any engine behaviour.

Your plugin should depend on these two packages only - in particular, don't
import `@contract-case/case-entities` or `@contract-case/case-core`; they're
internal, and their APIs change without notice.

### Split your plugin into two packages

We recommend structuring a plugin as two packages, following the pattern of
the core plugins (eg `case-core-plugin-function` and
`case-core-plugin-function-dsl`):

- **`your-plugin-dsl`** contains only data definitions: the type constants,
  the TypeScript interfaces for your matcher and mock descriptors, and plain
  factory functions that build them. It depends only on
  `case-plugin-dsl-types`.
- **`your-plugin`** contains the behaviour: the executors and the assembled
  plugin object. It depends on `your-plugin-dsl` (for the constants and
  descriptor types) and on `case-plugin-base`.

The reason for the split: packages that provide user-facing DSLs need your
type constants and descriptor shapes so they can construct descriptors that
your executors will understand - but they shouldn't need to pull in the
matching engine (or your executors) to do it. Keeping the descriptor
definitions in a leaf package with almost no dependencies keeps every
downstream DSL light, and guarantees the DSL and the executors agree on the
wire format, because they import the same constants.

## Where to next

With the skeleton in place, the next two pages cover the two halves of the
plugin's behaviour: [writing matchers](./writing-matchers) and
[writing mock types](./writing-mocks).
