# Layout of Case source

First, the important bit, then the details:

## Layout structure

- boundaries: For the DSL that will be used by different languages. Everything in here should only be for exposing Case to the users, and there should be no behaviour
- connectors: General connections outside Case (including incoming)
- core: The engine that runs the mocks
- diffmatch: The engine that runs the data matching
- entities: The base layer of application wide concepts

No lower layer is allowed to include code from an upper layer.

## Code structure

This code follows the direct-child include rule, which aims to provide the following benefits:

- It is clear from the structure which code is globally imported and which is used only locally, which means you can assess impact of changes without checking
- It is clear which modules depend on each other, which means you can assess the appropriate interface easily
- Where to put new code is clear
- Where to look to find existing code is clear

### The direct-child import rule for TypeScript:

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

### Index files

- The main module in a directory is named the same as the directory - eg, the
  main export from `src/a` is `src/a/a.ts`. This is so that your editor tabs doesn't
  get cluttered with `index.ts` files that contain different code.
- `index.ts` files only contain re-exports. They describe the public
  interface of the module that is in that folder, and may re-export anything
  according to the rules below.
  This code follows the Direct Child Include Rule:
