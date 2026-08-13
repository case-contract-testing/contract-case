---
sidebar_position: 4
sidebar_label: 'Declaring your DSL'
---

# Declaring your DSL

Your plugin's executors run inside the ContractCase core - but your users
write their tests in their own language, against user-facing classes and
functions (the DSL). Somebody has to provide those classes in every language
your users want.

Rather than asking plugin authors to hand-write and hand-maintain a DSL per
language, ContractCase lets a plugin _declare_ its DSL as data: the `dsl`
property of the plugin object is a `PluginDslDeclaration` describing every
user-facing matcher and interaction, with enough type and documentation
information to generate idiomatic classes in each supported language
(currently TypeScript and Java).

Declaring the DSL as data has a purpose beyond saving typing: it means there
is **one source of truth**. The language bindings can't drift from each other
in behaviour or documentation, because they're all generated from the same
declaration - and when you add a parameter, every language gets it in the
same release.

## Running the generator

The generator is part of the [ContractCase CLI](../reference/cli). From the
project where your plugin is installed (or your plugin's own repository, with
the plugin built and installed):

```bash
ContractCase generate-plugin-dsl @yourorg/your-plugin --languages java,ts --output-dir .
```

- The plugin is loaded by package name, with the same rules as
  [loading a plugin for a test run](./loading-plugins#plugin-names-must-be-plain-package-names) -
  it must be installed locally.
- `--languages` is a comma-separated subset of `java` and `ts` (both by
  default).
- `--output-dir` should be the root of the package the generated files will
  belong to: the generators write to conventional paths beneath it
  (`src/main/java/...` for Java, `src/boundaries/dsl/...` for TypeScript).

Distributing the generated classes is up to you - for Java, that means
compiling them into a jar alongside your plugin's npm package (they depend on
the ContractCase Java DSL for the `DslMatcher` / `DslInteraction` marker
interfaces, plus Jackson and Lombok).

:::tip note

The generated Java classes currently land in ContractCase's own package
namespace (`io.contract_testing.contractcase.dsl.<kind>.<category>`), with
your plugin's `category` as the leaf package. If this causes you problems -
for example, if you'd prefer them generated into your own package namespace -
please [open an issue](https://github.com/case-contract-testing/contract-case/issues/new).

:::

## The declaration

```ts
import { PluginDslDeclaration } from '@contract-case/case-plugin-base';

export const dsl: PluginDslDeclaration = {
  namespace: 'yourorg',
  category: 'identifiers',
  matchers: [
    /* MatcherDslDeclaration[] */
  ],
  interactions: [
    /* InteractionDslDeclaration[] */
  ],
};
```

- `namespace` is the prefix for all the type constants in this declaration -
  the generator produces type strings of the form `${namespace}:${type}`. It
  must be unique to you; we recommend the GitHub organisation or username that
  hosts your plugin's repository. (The core plugins share the reserved
  namespace `_case`.)
- `category` groups related declarations, and determines where generated
  classes land - for example, the package name
  `io.contract_testing.contractcase.dsl.matchers.<category>` in Java.
- `matchers`, `interactions` and (rarely) `states` are the declarations
  themselves.

### Declarations don't need to map 1:1 to executors

More than one DSL declaration may share the same `type` constant. This is
deliberate, and the core function plugin makes heavy use of it: it declares
four matcher DSL classes over two matcher executors, and eight interaction
DSL classes over two mock executors. Use this when you want different names,
different defaults, or different parameter shapes in the DSL for what is
ultimately the same executor - the DSL is for humans, and executors are for
the engine, so there's no reason to force them into the same shape.

## Declaring an object

Matchers, interactions and states share a common base:

```ts
{
  name: 'AnyUlid',           // The generated class name, in CamelCase
  type: 'AnyUlid',           // The type constant, without the namespace
  documentation: 'Matches any ULID string.',
  params: [ /* ParameterDeclaration[] */ ],
}
```

`documentation` is required. Yes, really - it becomes the doc comment on the
generated class in every language, and the users of your plugin won't be sorry
about that.

### Parameters

Each parameter is declared with a name, documentation (also required), and a
type:

```ts
{
  name: 'example',
  documentation: 'An optional example ULID to use when writing the contract.',
  type: 'string',
  optional: true,
}
```

- `name` must be alphanumeric camelCase, and unique within the declaration.
  Beware of a few names with special behaviour: `type` is reserved, and
  `example` / `resolvesTo` are allowed but map to the
  [special matcher keys](./writing-matchers#parameters-and-special-keys) of
  the same name. (For our ULID matcher, that's exactly what we want.)
- `optional` parameters must come last, since some target languages express
  optionality by omitting trailing arguments.
- By default, a parameter is written into the descriptor JSON as
  `_case:matcher:<name>` (or `_case:mock:<name>` for interactions). Set
  `jsonPropertyName` to override this - for example, the function plugin maps
  its `arguments` parameter to the plain `request` key.

The available types are the scalars (`'string'`, `'number'`, `'integer'`,
`'boolean'`, `'null'`), `'AnyData'` (any JSON value), `'AnyCaseMatcherOrData'`
(any JSON value _or any matcher_ - the workhorse type for parameters that
users will want to nest matchers inside), arrays of any of these
(`{ kind: 'array', type: ... }`), and `PassToMatcher` (below).

### Composing matchers with `PassToMatcher`

`PassToMatcher` declares a parameter whose values are passed to _another
matcher's_ constructor, letting you build composite DSL classes whose
generated constructors take flat, friendly arguments. For example, the
function plugin's interactions take a `returnValue` argument, which the
generated code wraps in a `FunctionReturnValue` matcher for you:

```ts
const returnValue: ParameterDeclaration = {
  name: 'returnValue',
  jsonPropertyName: 'response',
  documentation: 'The return value of this function.',
  type: {
    kind: 'PassToMatcher',
    exposedParams: [
      {
        name: 'returnValue',
        documentation: 'The return value of this function.',
        type: 'AnyCaseMatcherOrData',
      },
    ],
    matcherReference: {
      namespace: '_case',
      name: 'FunctionReturnValue',
      category: 'functions',
    },
  },
};
```

The `exposedParams` are what the user sees; they're passed positionally to the
constructor of the matcher named by `matcherReference`. The generator does no
checking that the referenced matcher exists or that the parameters line up, so
we recommend only referencing matchers from your own plugin, where you control
both ends.

## Extra properties on matcher declarations

Matcher declarations can also carry:

- `constantParams` - parameters that are always the same for every instance,
  written into the descriptor but not exposed in the constructor. The special
  key `resolvesTo` sets
  [`_case:matcher:resolvesTo`](./writing-matchers#parameters-and-special-keys),
  which also makes the generated DSL more precisely typed.
- `contextModifiers` - entries written under `_case:context:*`, for
  [context-modifying matchers](./writing-matchers#modifying-the-context) like
  `shapedLike`.
- `currentRunModifiers` - entries written under `_case:currentRun:context:*`,
  for matchers that change the run configuration below them (like the
  log-level changing matcher). Most plugins won't need these.

## Interaction declarations

Interactions additionally declare their
[`setup` block](./writing-mocks#one-interaction-two-sides-the-setup-block):

```ts
{
  name: 'WillReceiveFunctionCall',
  type: 'MockFunctionCaller',
  documentation: '...',
  setup: {
    write: { type: '_case:MockFunctionCaller', stateVariables: 'state', triggers: 'generated' },
    read: { type: '_case:MockFunctionExecution', stateVariables: 'default', triggers: 'provided' },
  },
  params: [ /* ... */ ],
}
```

The full declaration for the core function plugin is a good worked example of
everything on this page - see
[its source](https://github.com/case-contract-testing/contract-case/blob/main/packages/case-core-plugin-function/src/dsl/functions.ts).

## What the generator produces

For TypeScript, each declaration becomes an interface plus a factory function.
For Java, each declaration becomes a builder-style class with Jackson
annotations mapping fields to the descriptor's JSON keys, implementing the
marker interfaces (`DslMatcher`, `DslInteraction`, `DslState`) that the Java
DSL's type signatures require. In both cases, `PassToMatcher` parameters are
collapsed - the generated constructor accepts the exposed parameters and
constructs the inner matcher itself.

## Hand-writing your DSL

Generation isn't compulsory - the generated classes are conveniences over
plain JSON, so you can also write the DSL by hand:

- **TypeScript users** can use the plain factory functions from your `-dsl`
  package directly (like the `anyUlid` function in
  [writing matchers](./writing-matchers#the-dsl-function)) - descriptors are
  just JSON, so no generation is strictly necessary.
- **Java users** can write classes by hand: plain objects whose Jackson
  `@JsonProperty` annotations produce exactly your descriptor's keys
  (including `_case:matcher:type` / `_case:mock:type`), implementing
  `DslMatcher` or `DslInteraction` as appropriate. The
  [generated classes in the Java DSL](https://github.com/case-contract-testing/contract-case/tree/main/packages/dsl-java/src/main/java/io/contract_testing/contractcase/dsl)
  show the expected shape.
