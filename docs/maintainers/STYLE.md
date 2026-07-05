# ContractCase Style Guide

This document describes the coding conventions used in ContractCase that are
_not_ enforced by lint or covered by
[CodingStandards.md](./CodingStandards.md). Where CodingStandards.md tells you
_what_ the standards are, this document records the conventions that live
between the lint rules — and, importantly, _why_ each one exists, including its
known costs. If a convention's trade-off starts to outweigh its motivation, it
should be revisited rather than followed blindly.

Formatting is Prettier's job, and many style rules are enforced by
`eslint-config-case-maintainer` (no `any`, no loops, no `console`, no default
exports, no parameter mutation, and so on). Nothing in this document repeats
what a machine already checks. Everything here is convention: it only survives
through review and through this document.

## Table of Contents

- [Functions, closures, and classes](#functions-closures-and-classes)
- [Dependency injection](#dependency-injection)
- [Exports](#exports)
- [Asynchronous code](#asynchronous-code)
- [Error handling](#error-handling)
- [Control flow and data](#control-flow-and-data)
- [Types](#types)
- [Naming](#naming)
- [Context threading and logging](#context-threading-and-logging)
- [Plugin executor conventions](#plugin-executor-conventions)
- [Documentation and comment voice](#documentation-and-comment-voice)
- [Tests](#tests)
- [Cross-language bindings](#cross-language-bindings)
- [Known deviations](#known-deviations)

---

## Functions, closures, and classes

### Everything is an arrow-function `const` with an explicit return type

There are no `function` declarations in the codebase. Every function, including
internal helpers, is written as:

```typescript
export const errorHandler = (e: Error): never => {
  ...
};
```

**Why:** uniformity — one function syntax means one thing to read; explicit
return types on exports are lint-enforced, but we extend the habit to internal
helpers so that a wrong implementation fails at the definition, not at some
distant call site.

### State lives in closures created by `make*` factories, not in classes

When a "service" needs configuration or private state, write a factory that
takes the configuration and returns an object of closures:

```typescript
export const makeBrokerApi = (context: DataContext): BrokerApi => ({
  publishContract: (...) => ...,
  downloadContract: (...) => ...,
});
```

Examples: `makeLogger`, `makeBrokerApi`, `makeResultFormatter`,
`makeFunctionRegistry`, `makeAssertionsOn`.

**Why:** a closure's captured state cannot be reached or mutated from outside —
there is no `this`, no visibility modifier to forget, and no temptation to add
setters. Factories also make dependencies explicit: everything the service
uses arrives through the factory's parameters.

**Cost:** no `instanceof`, and each instance allocates its own function
objects. This is fine at ContractCase's scale (services are created a handful
of times per run, not per matcher).

### Classes are reserved for exactly three roles

1. **The user-facing DSL surface** (`case-definition-dsl` matchers,
   interactions, states) — classes give users a discoverable, documentable API
   and let JSii translate it to other languages. Inheritance is acceptable
   here (`BasicAuthHeaderValue extends StringPrefix`) because the hierarchy
   _is_ the user-facing taxonomy.
2. **Stateful lifecycle orchestrators** — `WritingCaseContract`,
   `ContractVerifier`, `PluginLoader`, `BrokerService`. These genuinely hold
   evolving state across a run.
3. **Error types** — see [Error handling](#error-handling).

Anything that doesn't fit one of these roles should be a function or a `make*`
factory. If you're writing a class and it isn't one of these three things,
stop and reconsider.

**Why:** the split maps to audience. Classes appear where fluency and
discoverability help a _user_; functions appear where composability helps a
_maintainer_. Keeping the class population small also keeps the "where is the
state?" question easy to answer.

---

## Dependency injection

Collaborators are injected as explicit dependency bundles, with production
wiring supplied through a default argument:

```typescript
constructor(
  config: CaseConfig,
  printer: ResultFormatter,
  dependencies: WriterDependencies = writerDependencies(printer),
) { ... }
```

The bundles themselves (`WriterDependencies`, `ReaderDependencies`) are plain
objects of factory functions, assembled in one place
(`case-core/src/connectors/dependencies.ts`).

**Why:** this is the reason the test suites contain **zero**
`jest.mock` / `jest.fn` / `jest.spyOn` calls. Tests construct the real object
and hand it real (or trivially faked) collaborators. Tests written this way
survive refactors that would shred a module-mocking suite, and they can never
pass against an interface that no longer exists.

**Cost:** the default argument hides the production wiring inside a signature,
and the dependency bundles must be maintained by hand. Accept both; the
no-mocking-library property is worth it. Do not introduce a mocking framework.

---

## Exports

Named exports only — this is lint-enforced — but there are two sanctioned uses
of `export default`, and the exception carries meaning:

1. **A plugin package default-exports its assembled plugin object** (and only
   that):

   ```typescript
   // case-core-plugin-http/src/index.ts
   export default CoreHttpPlugin;
   ```

2. **A module that _is_ a single data blob** may default-export it — the
   `case-definition-generator/src/entities/*.ts` DSL declarations.

**Why:** when defaults are this rare, seeing one tells you what kind of module
you're in: "this module is the thing", not "this module contains things".

Public package entry points separate type re-exports with `export type { ... }`
so that API Extractor and bundlers can see the type-only surface.

---

## Asynchronous code

### Prefer `.then()` chains over `async`/`await`

```typescript
validate: (matcher, matchContext) =>
  Promise.resolve()
    .then(() => validateCodes(matcher, matchContext))
    .then(() => descendAndValidate(...)),
```

**Why:** `async`/`await` makes it easy to write long functions that nest
promises aggressively while looking flat and innocent. A `.then()` chain keeps
each step small and makes the shape of the pipeline — including where errors
can enter and where they're handled — explicit in the code's structure. If a
chain is getting awkward, that's usually a sign the steps want to be named
functions, not a sign to switch to `await`.

`async`/`await` is not banned; it appears where a genuinely sequential
narrative reads better (for example `BrokerService.downloadContracts`). But
the default is the chain, and "this would be easier with `await`" should
prompt "should this be several tighter functions?" first.

### Open synchronous-entry async functions with `Promise.resolve().then(...)`

```typescript
validate: (matcher, matchContext) =>
  Promise.resolve().then(() => {
    if (somethingWrong) {
      throw new CaseConfigurationError(...);
    }
    return descendAndValidate(...);
  }),
```

**Why:** it funnels synchronous throws into the promise chain, so callers never
face the "did this throw synchronously or reject?" split. Every `validate`
implementation uses this opener even when its body is synchronous, so all
executors present a uniform async signature.

Note the opener is exactly `Promise.resolve().then(...)` — resolving with no
value. `Promise.resolve(() => {}).then(...)` resolves _with a function that is
never called_ and is a bug, not a variant.

---

## Error handling

### Two kinds of thrown error, split by blame

Every thrown error answers the question "whose fault is this?":

- **`CaseConfigurationError`** — _the user misconfigured something._ Carries a
  `ConfigurationErrorCode` and remediation advice.
- **`CaseCoreError`** — _this is a bug in ContractCase._ Messages say so
  plainly ("This should not be possible. Please open an issue").

(Plus narrower siblings where the blame is more specific: `CaseTriggerError`
for a failing user trigger, `ConnectorError` for bugs in a wrapper library.)

**Why:** ContractCase is a testing tool; its single most important UX property
is that a failing user always knows whether to fix their own configuration or
file a bug. Encoding blame in the type means every throw site is forced to
make that call, and every error-rendering path can act on it.

When throwing, choose deliberately, and if the choice is non-obvious, say why
in a comment ("This is a CoreError because the ArgumentsMatcher is an internal
matcher").

### Error class boilerplate

Every error class repeats the same construction pattern:

```typescript
constructor(message: string, context: LogLevelContext | 'DONT_ADD_LOCATION', ...) {
  super(...);
  Object.setPrototypeOf(this, new.target.prototype); // TS extends-Error fix
  this.name = 'CaseConfigurationError';
  ...
}
```

The `Object.setPrototypeOf` line and the explicit `this.name` literal are both
load-bearing: the first fixes `instanceof` under TypeScript's `Error`
subclassing, and the second supports name-based dispatch (below).

### Dispatch on `e.name`, not `instanceof`, at package boundaries

```typescript
switch (e.name) {
  case 'CaseConfigurationError':
  case 'ContractCaseConfigurationError':
    ...
}
```

**Why:** errors cross package and process boundaries (core → connector →
foreign-language DSL), where `instanceof` breaks — duplicate package
instances, serialisation, and gRPC all destroy prototype identity. The name
string survives everything.

**Cost:** it's stringly typed; renaming an error class silently breaks
dispatch. This is why `this.name` is always a literal, set right next to the
class declaration, and why renames of error classes need a repo-wide search.

### Boundary adapters must never throw

Functions whose job is to convert errors into wire-safe values
(`jsErrorToFailure` in TypeScript, `safeExecute` in Java) must not be able to
throw, and carry a comment saying so:

```typescript
// NOTE: It must not be possible for this function to throw an error
```

**Why:** a throw inside the error path escapes the stream/process boundary and
surfaces as an unrelated crash far from the real failure. The convention is
enforced only by comment and review — treat any modification to these
functions as high-risk.

### Inside the matching engine, errors are values

Matching failures are not exceptions. A `check` returns a `MatchResult` — an
array of `CaseError` where the empty array means success — built only through
the combinators `makeResults`, `makeNoErrorResult`, `combineResults`,
`errorWhen`, `matchingError`, and queried with `hasErrors` / `hasNoErrors`.

**Why:** a matcher tree should report _every_ mismatch in a run, not just the
first. Accumulating errors as values is the natural model for that; exceptions
would abort at the first mismatch. The rule of thumb:

- The _data didn't match_ → return error values.
- The _matcher itself is malformed_ → throw `CaseConfigurationError`.
- _Neither should be possible_ → throw `CaseCoreError`.

### User-facing message voice

Error messages are complete, conversational sentences that:

- state what's wrong first, then explain (per the Design Values);
- quote the offending value in single quotes:
  `` `The string '${actual}' did not include the expected substring '${expected}'` ``;
- attribute blame explicitly where it helps ("This is a configuration problem,
  and probably not a bug with ContractCase");
- offer the next step ("Please confirm that you are calling the mock server,
  and not your real server").

Log via `context.logger.error(...)` immediately before throwing when there is
internal state a maintainer would want; the log can carry the deep dump, the
error message stays user-sized.

### Sentinel string arguments

Where a parameter needs an "opt out" mode, use a self-describing string
literal union member rather than a boolean or a nullable:

```typescript
context: LogLevelContext | 'DONT_ADD_LOCATION';
```

**Why:** at the call site, `'DONT_ADD_LOCATION'` reads as documentation;
`false` or `undefined` reads as nothing.

---

## Control flow and data

### Exhaustiveness: use `UnreachableError(value: never)`

Every `switch` over a discriminated union ends with:

```typescript
default:
  throw new UnreachableError(type);
```

where `UnreachableError`'s constructor takes `value: never`, so adding a union
member without handling it is a **compile** error, not a runtime surprise.
The Java equivalent is an exhaustive switch expression whose
`default`/`UNRECOGNIZED` arms throw `ContractCaseCoreError`.

Some older sites instead pair a `default:` branch with an all-caps warning
comment ("**ALL** error types must be checked in this function"). These
predate the `UnreachableError` pattern and should be migrated to it as they
are touched — see [Known deviations](#known-deviations).

### Expression-oriented bodies

Prefer returning an expression to mutating your way to a result: function
bodies are frequently a single returned ternary or combinator call, objects
are built with spread, and optional members use the conditional-spread idiom:

```typescript
...(matcher.body ? { body: strip(matcher.body, context) } : {}),
```

**Why:** expression style plus immutability means a reader can trace where any
value came from without simulating mutations. The lint config does much of the
pushing here (no loops, no parameter mutation, reduce-with-initial-value);
the conventions above are how the code looks when you comply gracefully.

**Cost:** a returned multi-branch ternary is hard to breakpoint. If you can't
debug it, name the branches as small functions rather than converting the body
to imperative statements.

### Nullish checks: prefer `== null`

Use loose `== null` / `!= null` to test for "no value" — it covers both `null`
and `undefined`, and `eqeqeq` is configured to allow exactly this case.

Use `=== undefined` only when the distinction between `null` and `undefined`
genuinely matters (for example, protobuf unboxing where `undefined` means
"field absent"), and add a comment saying the distinction is intentional.
An uncommented `=== undefined` should be treated as a probable mistake — see
[Known deviations](#known-deviations).

---

## Types

Beyond what CodingStandards.md covers:

### Wire-format tags are `as const` constants; unions are built from `typeof`

```typescript
export const STRING_CONTAINS_TYPE = '_case:StringContains' as const;

export type AnyStringMatcherType =
  | typeof STRING_CONTAINS_TYPE
  | typeof STRING_PREFIX_TYPE;
```

The constant is then used everywhere the tag appears: in the matcher interface
(`'_case:matcher:type': typeof STRING_CONTAINS_TYPE`), in registry keys
(`[STRING_CONTAINS_TYPE]: StringContainsMatcherExecutor`), and in the
executor's generic parameter.

**Why:** the value and its type have a single source, so they can never drift,
and registries keyed by computed properties get exhaustiveness checking from
the mapped registry type for free.

### Extract union members with `*For<T>` helpers

To pick one member out of a big union by its discriminant, define a tiny
marker interface and an `Extract` alias, rather than repeating conditional
types at use sites:

```typescript
interface IsCaseNodeForType<T extends AnyCaseNodeType> {
  '_case:matcher:type': T;
}

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseMatcher,
  IsCaseNodeForType<T>
>;
```

### Discriminate on a tag, not on property presence

Prefer giving each union member its own `'_case:matcher:type'` (or `kind`)
value over sharing one tag and narrowing with `'someField' in matcher`.
Presence-based narrowing forced the cast-then-check guard style in the
function plugin and is a known soundness hole; new unions should not repeat
it.

### `readonly` on (almost) all exported types

Members of exported interfaces and type aliases should be `readonly`, and
array-typed members should be `ReadonlyArray<T>`:

```typescript
export interface DescribeSegment {
  readonly kind: 'message';
  readonly segments: ReadonlyArray<DescribeSegment>;
}
```

**Why:** the Design Values commit us to immutable matchers and context;
`readonly` makes the compiler enforce what is otherwise only convention.
Older matcher descriptor interfaces predate this rule and lack `readonly` —
add it as those files are touched (see [Known deviations](#known-deviations)).

The rare deliberate mutation (for example a module-scope counter) is fine, but
should be isolated, small, and obvious — `let exampleId = 0` next to the one
function that increments it.

### The `foo.types.ts` convention

A plain `types.ts` holds a module's type declarations. When one `types.ts`
would grow too large, split it into several `<topic>.types.ts` files in the
same directory (`definitions.types.ts`, `constants.types.ts`,
`utility.types.ts`, ...), usually re-exported together.

**Why:** the alternative — a subdirectory created just to hold types — adds a
navigation level for no benefit. The suffix keeps the split flat while still
signalling "this file is declaration surface". A `.types.ts` file may carry
small runtime companions that belong with the declarations (tag constants,
type guards); the suffix means "primarily types", not "no runtime".

### `unknown` at the boundaries, guards to narrow

Values of unknown provenance — matcher input, caught errors, parsed JSON —
enter typed code as `unknown` (never `any`; lint enforces this) and are
narrowed with `is*` type-guard functions. Caught errors are read as
`(e as Error).message` when the catch block cannot do better.

---

## Naming

Additions to the CodingStandards.md naming table. These prefixes and suffixes
encode a type or function's _role_, which matters more as the package count
grows:

| Pattern        | Meaning                                                                      | Examples                                     |
| -------------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
| `Any*`         | The top of a union — "any member of"                                         | `AnyCaseMatcher`, `AnyMockDescriptor`        |
| `All*`         | An aggregate of every member (usually a map or union of unions)              | `AllHttpMatcherTypes`, `AllSetup`            |
| `Core*`        | Internal wire-format matcher shape (as opposed to the user-facing DSL class) | `CoreStringContainsMatcher`                  |
| `*Descriptor`  | Serialisable description of a mock/interaction                               | `MockFunctionDescriptor`                     |
| `*Fn` / `*Fns` | Function type alias / bundle of function types                               | `StripMatcherFn`, `TraversalFns`             |
| `*Executor`    | The runtime object implementing a matcher or mock (see below)                | `StringContainsMatcherExecutor`              |
| `Wire*`        | Import alias for a protobuf/generated wire type                              | `DefinitionRequest as WireDefinitionRequest` |
| `make*`        | Factory returning an object of closures or a constructed value               | `makeLogger`, `makeResults`                  |
| `is*` / `has*` | Boolean predicate, usually a type guard (`x is T`)                           | `isCaseNode`, `hasExample`                   |
| `must*`        | Resolver that returns the value or throws (assert-or-throw)                  | `mustResolveToString`                        |
| `*Internal`    | Private worker function behind a public wrapper                              | `assertPresentInternal`                      |

Two specific rulings:

- **Executor objects take the `Executor` suffix.** The DSL class is
  `StringContains`, the wire shape is `CoreStringContainsMatcher`, the runtime
  object is `StringContainsMatcherExecutor`. (The HTTP plugin's executors
  currently omit the suffix; see [Known deviations](#known-deviations).)
- **`Wire` aliasing is mandatory in the connector.** Generated protobuf types
  never appear under their bare names next to domain types; the alias makes
  "which side of the boundary am I on?" visible in every expression.

---

## Context threading and logging

### The context object is an explicit parameter, everywhere

Nearly every function takes an immutable `context` / `matchContext` as its
final parameter. The context carries the logger, resolved config, lookup
functions, and — critically — the current **location trail**. Descending into
a child matcher goes through `addLocation`:

```typescript
context.descendAndValidate(
  matcher['_case:matcher:contains'],
  addLocation(':stringContains', matchContext),
);
```

**Why:** the location trail is the backbone of ContractCase's error UX — it is
what lets an error say _where_ in a deeply nested matcher tree the mismatch
happened. Threading the context explicitly (rather than using module state)
keeps every function pure and testable.

**Costs and rules of thumb:**

- The parameter is viral. Accept the plumbing; do not "save" a signature by
  reaching for module state.
- Forgetting `addLocation` doesn't fail any test — it silently degrades error
  messages. When reviewing a matcher, check every descent adds a location.
- Context is never mutated; transforms are `{ ...context, ...overrides }`
  (with derived function members recomputed).

### Logging narrates, at the right audience level

All logging goes through `context.logger` (never `console`; lint-enforced).
The five levels split by _audience_, not just severity:

- `error`, `warn`, `debug` — for users.
- `maintainerDebug`, `deepMaintainerDebug` — for ContractCase maintainers;
  used to dump internal state, especially just before a throw.

Log generously. The core narrates its own execution ("This interaction passed
all assertions"), and the maintainer levels exist precisely so verbosity
never has to be traded against user-facing noise.

---

## Plugin executor conventions

Every matcher executor is an object literal with exactly four members, typed
as `MatcherExecutor<typeof TAG, CoreShape>`:

```typescript
export const StringContainsMatcherExecutor: MatcherExecutor<
  typeof STRING_CONTAINS_TYPE,
  CoreStringContainsMatcher
> = {
  describe, // human-readable description, via the describe combinators
  check, // returns MatchResult (errors as values)
  strip, // returns the raw example data, or throws StripUnsupportedError
  validate, // Promise; throws CaseConfigurationError on bad definitions
};
```

Conventions around the shape:

- Define the four members as named `const`s in the file and assemble them at
  the bottom, rather than writing large inline methods — the assembled object
  then reads as a table of contents.
- The plugin object registers executors in a map keyed by the tag constants
  with computed properties: `[STRING_CONTAINS_TYPE]: StringContainsMatcherExecutor`.
- One executor per file, file named after the export.

**Why:** the uniform shape is what makes thirty matcher files instantly
legible once you have read one, and the tag-keyed registry map gets its
exhaustiveness checked by the mapped `AllExecutors` type.

### DSL definitions are data, and documentation lives in the data

Each plugin's user-facing DSL is declared as a plain typed data structure
(`PluginDslDeclaration`) whose entries carry their documentation as strings.
Code generation turns this into the TypeScript and Java DSLs.

**Why:** one source of truth means the language bindings cannot drift from
each other in behaviour or documentation. The cost is that the declaration
duplicates information that also exists at the type level; keep the two in
sync when adding matchers (this is the price of cross-language generation).

---

## Documentation and comment voice

### The public surface is documented for the pipeline, not just the reader

Everything exported carries a TSDoc release tag (`@public` or `@internal`) —
API Extractor consumes these, and `tsdoc/syntax` lint keeps them valid.
Beyond the tag conventions in CodingStandards.md:

- Public config interfaces document **every field**, with `@defaultValue`.
- Class-level doc comments are **duplicated onto the constructor** in
  `case-definition-dsl`, so documentation renders in both places the doc
  tooling looks. Yes, it's duplication; keep the two in sync (the
  `@privateRemarks` notes in those files say to update them by
  search-and-replace, and mean it).
- The `override toJSON(): unknown { return super.toJSON(); }` boilerplate on
  DSL matchers exists purely to satisfy JSii/docgen. Copy it exactly; never
  hand-edit one instance.
- `@deprecated` always carries a migration note. Deprecated API is documented
  out, not deleted.

### Internal code documents _why_, in an honest voice

Internal mappers and helpers have near-zero JSDoc — the executor shapes and
naming conventions are expected to carry the _what_. Comments that do exist
explain constraints and reasoning, and the house voice is candid:

- `TODO:` comments are left in production code as honest markers of known
  debt, with enough context to act on later ("The `accepts` concept is
  unused, we should remove it").
- Hacks are confessed where they live ("Hack since this object isn't
  constructed anyway"; "it's a bit of a land mine"), including open questions
  addressed to future maintainers.

**Why:** a reader who inherits the author's doubts debugs faster than one who
inherits confident-looking code. Do not launder a hack into silence — either
fix it or label it.

---

## Tests

Additions to the testing patterns in CodingStandards.md:

### No mocking framework — inject real or trivially-faked collaborators

Tests instantiate the real unit with its real dependency bundle, substituting
only the edges:

```typescript
const contract = new WritingCaseContract(
  CONTRACT,
  { ...writerDependencies(defaultPrinter) },
  ...
);
```

Fakes are hand-rolled objects of plain functions
(`printMatchError: () => Promise.resolve()`), not `jest.fn()`. See
[Dependency injection](#dependency-injection) for the motivation. A
`jest.clearAllMocks()` in this codebase is a sign something was copy-pasted.

### Test-data factories over shared fixtures

Build test data with small functions that parameterise the one field under
test:

```typescript
const consumerContract = (consumerName: string): ContractData => ({ ... });
```

Shared assertion helpers are `make*` factories too, and may generate whole
`describe`/`it` blocks (`makeExpectErrorContaining(contract)`); the necessary
lint relaxations (`jest/no-export`, `jest/expect-expect` with
`expectErrorContaining` registered) are applied file-locally or in the shared
config.

**Why:** factories make each test state its own delta from a valid baseline;
test-generating helpers keep matcher coverage matrices exhaustive without
copy-paste. **Cost:** generated tests make "which line failed?" one step less
direct — keep the generating helpers small and close to their use.

Large context fixtures (`EMPTY_CONTEXT`-style blocks) should be shared, not
copy-pasted between spec files — the current duplication across the plugin
spec files is a known smell, not a pattern to follow.

### Spec-file naming variants

- `foo.spec.ts` — colocated unit/integration test.
- `index.<feature>.spec.ts` — feature-scoped suites at a package root
  (`index.http.client.define.spec.ts`).
- `*.spec.verify.ts` — verification-side counterpart of a definition suite.
- `*.spec-norun.ts` — executable documentation examples, compiled but not run
  in the normal test target.
- `*.case.spec.ts` — suites that are themselves ContractCase contract tests.

### Type-level tests are tests

DSL packages include "it compiles" tests that assign a constructed DSL object
to its expected core type and assert non-null. Their value is the assignment
line, which turns a type-contract break into a test failure instead of a
downstream consumer's build break.

---

## Cross-language bindings

The Java DSL (and any future language binding) deliberately mirrors the
TypeScript connector's _structure_ while staying idiomatic in its own
language:

- Same layered split: incoming mapper / outgoing mapper / result hierarchy /
  response-correlation registry.
- Same semantics: the blame-split error taxonomy, "boundary adapters never
  throw", the `"UNDOCUMENTED"` error-code sentinel, the maintainer-debug
  logging protocol (`CASE_CONNECTOR_DEBUG`, including the same accepted
  values).
- Idiomatic implementation per language: builders + `private final` +
  unmodifiable collections in Java where TypeScript has spread + `readonly`;
  `CompletableFuture` + executors where TypeScript has the event loop;
  exhaustive switch expressions where TypeScript has `UnreachableError`.

Rules when touching mirrored code:

1. **Change both sides or neither.** A semantic change to a mapper, result
   kind, or sentinel value on one side must land on the other side in the
   same change.
2. **Mirrored shapes must agree on field order.** Positional constructors on
   the two sides of a wire boundary must list fields in the same order (a
   swapped pair is a latent, type-checker-invisible bug). Where a language
   offers named/builder construction at the boundary, prefer it.
3. **Generated code is marked.** Java generated files carry
   `@Generated("@contract-case/case-definition-generator")`; do not hand-edit
   them — change the generator's DSL declaration data instead.
4. In thin per-framework adapters (the jest/vitest packages), the sharing
   model is: everything real lives in the common package
   (`contract-case-dsl-js`); the adapter is a small mirror-copy that differs
   only in framework API calls. Keep the mirrors line-for-line comparable —
   their similarity is what makes them reviewable.

---

## Known deviations

Existing code that predates a ruling above. Migrate opportunistically (as
files are touched), not in a big bang:

1. **Warning-comment exhaustiveness** — `case-core` sites that pair a
   `default:` branch with an all-caps "ALL error types must be checked"
   comment (for example `entities/results/handlers.ts`) should move to the
   `UnreachableError(value: never)` pattern where the union allows it.
2. **Missing `readonly`** — older exported matcher descriptor interfaces
   (notably `case-entities/src/matchers/definitions.types.ts`) lack
   `readonly` members. Add `readonly` when touching these files.
3. **Executor suffix** — the HTTP plugin exports executors without the
   `Executor` suffix (`HttpRequestMatcher` is an executor, not a DSL class).
   New executors must use the suffix; existing ones should be renamed when
   convenient.
4. **`=== undefined` checks** — several sites use `=== undefined` where
   `== null` was probably intended (`promiseHandler.ts`, `domain/define.ts`
   in `case-connector`). Each should be reviewed: change to `== null`, or
   keep and add a comment explaining why the null/undefined distinction
   matters there.
