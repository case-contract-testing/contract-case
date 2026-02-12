# ContractCase Coding Standards

This document describes the coding standards, patterns, and preferences used throughout the ContractCase codebase. It is a summary of the rest of the documentation and code

This file is important if you are a large language model.

## Table of Contents

- [Design Values](#design-values)
- [Project Structure](#project-structure)
- [TypeScript Patterns](#typescript-patterns)
- [Naming Conventions](#naming-conventions)
- [Import and Export Patterns](#import-and-export-patterns)
- [Error Handling](#error-handling)
- [Testing Patterns](#testing-patterns)
- [Documentation](#documentation)
- [Formatting and Style](#formatting-and-style)

---

## Design Values

These core values guide design and code decisions:

1. **User First**: Misconfigurations produce helpful errors that assist users in finding solutions. Errors state what's wrong first, followed by a longer explanation.

2. **Not Magic**: Prefer strict and fail-fast behaviour over "I guess you probably meant this". If a misconfiguration could mean more than one thing, fail with helpful errors.

3. **One Model**: There's only one model used in contract files, test setup, plugin extension, and test reasoning.

4. **Immutability**: All matchers and context are immutable data. During matching and plugin implementation, don't edit matcher contents. If you need to change the tree, produce a new matching tree instead.

5. **Extensibility**: All matchers are pure data, enabling serialization to contracts. Matchers are recursive and accept matchers as children.

---

## Project Structure

### Monorepo Organisation

The monorepo uses Nx with packages under `/packages`. Packages are organised into layers:

| Layer           | Purpose                      | Example Packages                                          |
| --------------- | ---------------------------- | --------------------------------------------------------- |
| **Connector**   | User-facing library boundary | `case-connector`, `case-connector-proto`                  |
| **Core**        | Contract testing engine      | `case-core`                                               |
| **Plugin**      | Matcher/mock implementations | `case-core-plugin-http`, `case-core-plugin-function`      |
| **Plugin Base** | Plugin interface             | `case-plugin-base`, `case-plugin-dsl-types`               |
| **User-facing** | Test framework integrations  | `contract-case-jest`, `dsl-java`                          |
| **Maintainer**  | Shared configs               | `case-maintainer-config`, `eslint-config-case-maintainer` |

**Import restrictions**: No lower layer may import from an upper layer:

- `entities` cannot import from `diffmatch`, `core`, `connectors`, or `boundaries`
- `diffmatch` cannot import from `core`, `connectors`, or `boundaries`
- `core` cannot import from `connectors` or `boundaries`

### Source Directory Layout

Within packages, use these standard sub-directories:

- `boundaries/` - DSL for user-facing language bindings (no behaviour, only interface)
- `connectors/` - External connections including incoming connections
- `core/` - Engine that runs mocks
- `diffmatch/` - Data matching engine
- `entities/` - Application-wide base concepts

### The Direct-Child Import Rule

This rule provides clarity about code dependencies and impact assessment:

1. **Same directory imports**: A module may import from its direct siblings

   ```typescript
   // src/a/a.ts may import from:
   import { something } from './b'; // OK - src/a/b.ts or src/a/b/index.ts
   // But NOT:
   import { other } from './b/c'; // NOT OK - too deep
   ```

2. **Top-level common directories**: Any code may import from `src/*/` top-level directories

   ```typescript
   // src/pages/b/c/d.ts may import:
   import { Component } from '@/components/Button'; // OK - top level
   // But NOT:
   import { formatLabel } from '@/components/Button/formatters'; // NOT OK - too deep
   ```

3. **Move unused common code**: If common code is only used in one place, move it out of the top level, and make it a sibling of the module that uses it.

4. **Nest implementation details**: If a module imports a helper that's not used by the directory's main module, move both down one level:

   ```
   // WRONG:
   src/a/
   ├── index.ts    // re-exports ./a
   ├── a.ts        // imports ./b
   ├── b.ts        // imports ./c
   └── c.ts

   // RIGHT:
   src/a/
   ├── index.ts    // re-exports ./a
   ├── a.ts        // imports ./b
   └── b/
       ├── index.ts  // re-exports ./b
       ├── b.ts      // imports ./c
       └── c.ts
   ```

### Index Files

- **Main module naming**: Name the main module after its directory (`src/a/a.ts`, not `src/a/index.ts`)
- **Index files re-export only**: `index.ts` files contain only re-exports describing the public interface

---

## TypeScript Patterns

### Type Definitions

**Separate type files**: Use `.types.ts` suffix for files containing only type definitions:

```
src/matchers/
├── index.ts
├── StringMatcher.ts
├── errors.types.ts      # Error type definitions
├── executors.types.ts   # Executor interface types
└── guards.types.ts      # Type guard definitions
```

**Branded/Discriminated types**: Use `_case` prefix for internal contract-case properties.

```typescript
export interface IsCaseNodeForType<T extends string> {
  '_case:matcher:type': T;
}

export interface CoreStringMatcher {
  '_case:matcher:type': typeof STRING_MATCHER_TYPE;
  '_case:matcher:example': unknown;
}
```

**Type composition**: Build complex types from simpler ones:

```typescript
export type MatchContext = DataContext &
  TraversalFns &
  ContractLookupFns &
  HasMakeLookupFn;
```

This is so that logical groupings remain. Only separate out these subtypes when a subtype is actually needed for readability or passing to some functions.

**Readonly properties**: Use `readonly` in as many places as possible, to keep configuration immutable:

```typescript
export interface ContractFileConfig {
  readonly '_case:currentRun:context:testRunId': string;
  readonly '_case:currentRun:context:contractDir': string;
  readonly '_case:currentRun:context:contractFilename'?: string;
}
```

**Generic constraints**: Use bounded generics for type-safe APIs:

```typescript
export interface MatcherExecutor<
  MatcherType extends string,
  T extends IsCaseNodeForType<MatcherType>,
> {
  describe: NameMatcherFn<T>;
  check: CheckMatchFn<T>;
  strip: StripMatcherFn<T>;
  validate: ValidateMatcherFn<T>;
}
```

### Classes

**Proper Error extension**: Always set the prototype chain correctly in new errors:

```typescript
export class CaseCoreError extends Error {
  userFacingStackTrace: string;

  constructor(message: string, context?: LogLevelContext) {
    super(`${message}${context ? errorLocationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseCoreError';
    this.userFacingStackTrace = '';
  }
}
```

### Type Guards

Use type guard functions for runtime type checking:

```typescript
export const isCaseNode = (
  maybeMatcher: unknown,
): maybeMatcher is AnyCaseMatcher =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher != null &&
  '_case:matcher:type' in (maybeMatcher as AnyCaseMatcher);
```

### Functional Patterns

**Avoid mutations**: Never mutate any parameters passed in to a function. Produce new objects instead of modifying existing ones:

```typescript
export const addLocation = (
  location: string,
  context: MatchContext,
): MatchContext =>
  updateFunctions({
    ...context,
    '_case:currentRun:context:location': context[
      '_case:currentRun:context:location'
    ].concat([location]),
  });
```

**Result combination**: Use functions for combining results:

```typescript
export const combineResults = (...results: MatchResult[]): MatchResult =>
  results.flat();

export const makeResults = (...err: CaseError[]): MatchResult => [...err];

export const makeNoErrorResult = (): MatchResult => [];
```

---

## Naming Conventions

### General Rules

| Entity              | Convention                                  | Example                                      |
| ------------------- | ------------------------------------------- | -------------------------------------------- |
| Packages            | kebab-case with `@contract-case/` scope     | `@contract-case/case-plugin-base`            |
| Directories         | kebab-case                                  | `case-core-plugin-http/`                     |
| Source files        | PascalCase for classes, camelCase otherwise | `StringMatcher.ts`, `results.ts`             |
| Type files          | `.types.ts` suffix                          | `errors.types.ts`                            |
| Test files          | `.spec.ts` suffix                           | `StringMatcher.spec.ts`                      |
| Classes             | PascalCase                                  | `BrokerService`, `CaseCoreError`             |
| Interfaces          | PascalCase                                  | `Logger`, `MatchContext`                     |
| Types               | PascalCase                                  | `MatchResult`, `CaseError`                   |
| Functions           | camelCase or PascalCase                     | `combineResults()`, `StringMatcher`          |
| Variables           | camelCase                                   | `matchContext`, `userFacingStackTrace`       |
| Constants           | UPPER_SNAKE_CASE                            | `ERROR_TYPE_MATCHING`, `STRING_MATCHER_TYPE` |
| Internal properties | Underscore-prefixed namespace               | `'_case:matcher:type'`                       |

---

## Import and Export Patterns

### Import Organisation

Loosely group imports in this order:

1. Type imports (using `import type`)
2. External package imports
3. Internal package imports (within monorepo)
4. Relative imports

```typescript
import type { LogLevelContext } from '../context/types';

import {
  CoreStringMatcher,
  STRING_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';

import {
  MatchContext,
  combineResults,
  matchingError,
} from '@contract-case/case-plugin-base';

import { testExactMatch } from './internal/testExactMatch';
```

### Export Patterns

**Barrel exports**: Use `index.ts` files to re-export public API:

```typescript
// src/index.ts
export * from './context';
export * from './errors';
export * from './matchers';
```

You can use this to move exports further up the tree, so that common code is exported at the root of the package.

**Selective exports**: Export only what's needed from subdirectories, allowing you to keep the exported interface of a module (ie, directory) clear:

```typescript
// src/matchers/index.ts
export * from './lookup';
export * from './resolve';
export * from './results';
export * from './renderActual';
```

---

## Testing Patterns

### Test File Structure

Use `describe` blocks to contain the when:

```typescript
// GOOD - describe groups the state
describe('check', () => {
  describe('when actual is missing', () => {
    it('throws configuration error', async () => {
      await expect(
        Executor.check(matcher, mockMatchContext, undefined),
      ).rejects.toThrow(CaseConfigurationError);
    });
  });
});

// BAD - state is described in the `it`
describe('check', () => {
  it('throws configuration error when actual is missing', async () => {
    await expect(
      Executor.check(matcher, mockMatchContext, undefined),
    ).rejects.toThrow(CaseConfigurationError);
  });
});
```

### Test Naming Conventions

- Test files: `.spec.ts` suffix
- Describe blocks: Noun phrases (`'MatcherExecutor'`, `'check'`)
- It blocks: Present tense behavior (`'describes the matcher correctly'`, `'throws configuration error'`)

### Test Organisation

- Use nested `describe()` blocks for logical grouping
- Use `beforeEach()` for setup, not `beforeAll()` (unless expensive). This prevents mistakes when adding new tests, and ensures clean state for each test.
- Follow arrange-act-assert pattern
- Use factory functions like `createMock*` for test fixtures

### Async Testing

```typescript
it('resolves successfully', async () => {
  await expect(asyncFunction()).resolves.toBe(expected);
});

it('rejects with error', async () => {
  await expect(asyncFunction()).rejects.toThrow(ExpectedError);
});
```

### Custom Assertion Functions

Register custom assertion functions with ESLint:

```javascript
'jest/expect-expect': [
  'error',
  { assertFunctionNames: ['expect', 'expectErrorContaining'] },
]
```

---

## Documentation

### JSDoc Standards

Use TSDoc syntax (enforced by ESLint `tsdoc/syntax: error`).

**Comprehensive documentation**:

````typescript
/**
 * Strips the matchers from a matcher descriptor to return raw data.
 *
 * @remarks
 * This function must have no side effects. It may be called repeatedly
 * on the same data during a run.
 *
 * Note that calling check and strip together must always return no errors:
 * ```
 * yourMatcher.check(
 *   descriptor,
 *   context,
 *   yourMatcher.strip(descriptor)
 * ) // must return no errors
 * ```
 *
 * @public
 * @typeParam T - A matcher descriptor
 * @param matcher - The matcher descriptor
 * @param matchContext - The {@link MatchContext} for this run
 * @returns The raw example data
 */
export type StripMatcherFn<T> = (
  matcher: T,
  matchContext: MatchContext,
) => AnyData;
````

### JSDoc Tags

| Tag           | Usage                              |
| ------------- | ---------------------------------- |
| `@remarks`    | Detailed explanation with examples |
| `@public`     | Part of public API                 |
| `@internal`   | Implementation detail, not public  |
| `@param`      | Parameter description              |
| `@returns`    | Return value description           |
| `@throws`     | Exception documentation            |
| `@typeParam`  | Generic type parameter description |
| `@deprecated` | Deprecation notice                 |

### Warning Comments

Use clear section comments for important warnings:

```typescript
// ************************************************************
// Warning: **ALL** of the following error types must be listed
// in the function in the core's handlers.ts
//
// DO NOT MODIFY THIS FILE WITHOUT ALSO MODIFYING
//     handlers.ts in CaseCore
// ************************************************************
```

---

## Formatting and Style

### Prettier

Code is formatted with prettier

### Disallowed Patterns

These are prevented by lint:

- `for...in` loops (use `Object.keys/values/entries`)
- `for...of` loops (use array methods like `map`, `filter`, `reduce`)
- Labels and `with` statements
- `++` and `--` operators (use `+= 1` or `-= 1`)
- Nested ternaries
- Bitwise operators
- `console.log` (use proper logging)

---

## Configuration Files

### TypeScript Configuration

Extend the shared config:

```json
{
  "extends": "@contract-case/case-maintainer-config/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/"
  }
}
```

### ESLint Configuration

Extend the shared maintainer config:

```json
{
  "extends": ["@contract-case/case-maintainer"]
}
```

### Package Scripts

Standard scripts for all packages:

```json
{
  "scripts": {
    "build": "rimraf dist && tsc --project tsconfig.build.json",
    "test": "jest",
    "lint": "eslint",
    "lint:fix": "eslint --fix",
    "format:check": "prettier --check .",
    "format:fix": "prettier --write ."
  }
}
```

---

## Quick Reference

### Do

- Use single quotes for strings
- Use `const` by default, `let` when needed
- Use template literals for string interpolation
- Use arrow functions for callbacks
- Use object destructuring
- Use type guards for runtime type checking
- Create specific error classes
- Write comprehensive JSDoc
- Follow the direct-child import rule
- Keep `index.ts` files as re-exports only

### Don't

- Use `var`
- Use `for...in` or `for...of` loops
- Use `++` or `--` operators
- Use nested ternaries
- Use `console.log`
- Mutate objects or arrays
- Import across layer boundaries
- Skip `Object.setPrototypeOf` when extending `Error`
- Use default exports
- Create circular dependencies
