---
sidebar_position: 5
sidebar_label: 'Loading and distributing'
---

# Loading and distributing plugins

This page covers the user side of plugins: how a plugin gets loaded into a
test run, and what to know when distributing one.

## Loading a plugin

A plugin is distributed as an npm package, and loaded by package name. Two
steps:

1. Install the package locally, alongside your test suite:

   ```bash
   npm install --save-dev @yourorg/contract-case-plugin-ulid
   ```

2. Ask ContractCase to load it, before running any interactions that use it.

   From the TypeScript/JavaScript DSL, `loadPlugins` returns a Promise, so
   the natural place to call it is a `beforeAll`:

   ```ts
   defineContract(config, (contract) => {
     beforeAll(() => contract.loadPlugins('@yourorg/contract-case-plugin-ulid'));

     // ... interactions using the plugin's matchers and mocks
   });
   ```

   and on the verification side:

   ```ts
   verifyContract(config, (verifier) => {
     beforeAll(() => verifier.loadPlugins('@yourorg/contract-case-plugin-ulid'));
   });
   ```

   From the Java DSL:

   ```java
   ContractDefiner definer = new ContractDefiner(config);
   definer.loadPlugins("@yourorg/contract-case-plugin-ulid");
   ```

   and on the verification side:

   ```java
   ContractVerifier verifier = new ContractVerifier(config);
   verifier.loadPlugins("@yourorg/contract-case-plugin-ulid");
   ```

`loadPlugins` accepts multiple names if you're loading more than one plugin.
Loading is idempotent - loading the same plugin (at the same version) twice
is harmless, and the second load is skipped.

### Both sides need the plugin

The matcher and mock type constants from your plugin are written into the
contract file. That means a contract defined using a plugin can only be
_verified_ by a run that has the same plugin loaded - otherwise the verifier
has no executor for those types, and will fail with a configuration error.

If you're distributing a contract to another team, their verification suite
needs to install and load your plugin too. Plugin authors should say this
prominently in their installation instructions.

### Plugin names must be plain package names

Because plugins are intended to be loaded from your package manager, they must be plain package names.

Why so strict? Loading a plugin executes its code. If plugin specifiers could
be URLs, then anything able to influence the specifier - a malicious contract
file, or a compromised client of a contract server - could load arbitrary
remote code into your test process. Restricting specifiers to
already-installed packages means nothing can be loaded that you didn't
explicitly install.

### What happens at load time

When a plugin loads, ContractCase checks:

- **Version consistency**: if a plugin with the same
  [`uniqueMachineName`](./writing-a-plugin#the-description-object) was already
  loaded at a _different_ version, loading fails - a single test run can't
  reason about two versions of the same plugin.
- **Type registration**: each matcher and mock type the plugin provides is
  registered in the engine's registry. Registering a type that another loaded
  plugin already claimed is a configuration error (this is why
  [namespacing your types](./writing-a-plugin#namespacing-your-types)
  matters), and a non-core plugin registering a `_case:`-prefixed mock type is
  rejected outright.

The core plugins (HTTP and function calls) are loaded automatically on every
run - you never need to load them yourself.

## Configuring a loaded plugin

Users configure mocks from a plugin via the
[`mockConfig` configuration property](../reference/configuring#mockconfig-object),
keyed by the plugin's `shortName` - see
[plugin configuration](./writing-mocks#plugin-configuration-mockconfig) for
the author's side of this. Plugin authors should document their `shortName`
and supported configuration keys alongside their installation instructions.

## Distributing a plugin

Some things to know before publishing:

- **Export shape.** The package's entry point must export the assembled
  [`ContractCasePlugin` object](./writing-a-plugin) as
  its default export, and that object is the plugin's whole runtime API.
- **Dependencies.** Depend on `@contract-case/case-plugin-base` and
  `@contract-case/case-plugin-dsl-types` only - the rest of the ContractCase
  packages are internal.
- **Version compatibility.** ContractCase is
  [in beta](../package-versioning), and minor versions of
  `@contract-case/case-plugin-base` may contain breaking changes to the
  plugin API. Document which ContractCase versions your plugin release
  supports, and expect to release in step with ContractCase minors until
  1.0.0. There is currently no automated compatibility check between a
  third-party plugin and the core, so a clear compatibility statement in your
  README is what your users will rely on.
- **Contract stability.** Your type constants and descriptor shapes are
  written into your users' contract files, which may be stored and verified
  long after they were defined. Changing them is a breaking change for your
  users' _contracts_, not just their code - see the
  [notes on namespacing](./writing-a-plugin#namespacing-your-types).
- **DSLs for other languages.** If your users write tests in Java, you'll
  also need to ship the Java DSL classes for your matchers and interactions -
  see [Declaring your DSL](./dsl-generation) for the current state of DSL
  generation.

### A pre-publishing checklist

- [ ] All matcher and mock type constants are prefixed with your own
      namespace (never `_case:`)
- [ ] `uniqueMachineName` is prefixed with something you control, and doesn't
      start with the core plugin prefix (`_CaseCore:`)
- [ ] `version` is a semantic version string, and matches your package
      version
- [ ] The plugin object is the package's default export
- [ ] Configuration is validated with helpful `CaseConfigurationError`
      messages that name the exact `mockConfig` key to fix
- [ ] Your README documents: the `shortName` and configuration keys, which
      ContractCase versions are supported, and that verifiers of contracts
      written with your plugin also need it installed
