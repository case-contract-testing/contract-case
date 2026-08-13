## DSL Generators

ContractCase has a new DSL system, which allows matcher generation
from a json definition, consumed by the `@contract-case/definition-generator` package.

Properties that the generated matchers must support in order for the generator's type system to make sense:

- It must have a constructor which takes an ordered list of arguments. This is used for the passToMatcher type, which allows defining composite matchers.

## Regenerating the core DSLs

The core DSL declarations live in two places: the seven bare category
declarations in `case-definition-generator/src/entities/*`, and the `dsl`
properties of the core plugins (`case-core-plugin-http` and
`case-core-plugin-function`).

To regenerate the DSL classes from these declarations, run (in
`packages/case-definition-generator`):

```bash
npm run build && npm run generate:core-dsls
```

This writes:

- The Java DSL classes into `packages/dsl-java` (committed - review and
  commit any changes along with the declaration change that caused them)
- The TypeScript DSL files into this package's `src/generated/ts`
  (not yet consumed by anything, and not committed - see the
  "TS Generated Matchers" todo)

## Generating DSLs for third-party plugins

Plugin authors use the ContractCase CLI instead:

```bash
ContractCase generate-plugin-dsl @yourorg/your-plugin --languages java,ts --output-dir .
```

This loads the plugin package by name (with the same loading rules as
`loadPlugins`) and generates the DSL classes declared by its `dsl` property.
See the user-facing documentation in
`packages/documentation/docs/plugins/dsl-generation.md`.
