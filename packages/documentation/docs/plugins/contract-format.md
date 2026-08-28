---
sidebar_position: 10
sidebar_label: 'Contract Format'
---

# Contract file format

This page describes the contract file format.

Note that **you don't need to know the format of the contract file**, as it is intended to be considered opaque.

However, if you're [writing a plugin](../plugins/) and want to understand
what's happening under the hood, this description is for you.

Please do not rely on the details of the contract file format described here -
instead, if you are building tooling on top of ContractCase, we recommend you
use the `@contract-case/case-plugin-base` package to access and reason about the
contract. You can find the API documentation for it [here](https://github.com/case-contract-testing/contract-case/blob/main/packages/case-plugin-base/docs/case-plugin-base.md).

If you need other functionality not covered by that package, please
[open an issue](https://github.com/case-contract-testing/contract-case/issues/new) and we can discuss.
You shouldn't need to directly know the details of the contract file format to build anything.

That said, we know people are going to look, and so, here are the details.

## Overview

The top level of a contract file looks like this:

```jsonc
{
  // Identifies this file as a ContractCase contract
  "contractType": "case::contract",

  // The consumer / provider pair this contract is for
  "description": {
    "consumerName": "Example-Client",
    "providerName": "Example-Server",
  },

  // Metadata about the run that wrote this contract,
  // including the ContractCase version
  // Arbitrary other metadata might be included
  "metadata": { "_case": { "version": "..." } },

  // A lookup table of named matchers and state variables,
  // keyed by their unique names. Interactions reference
  // these by name, so that repeated structures are only
  // written once
  "matcherLookup": {
    "matcher:an http \"GET\" request to \"/health\"...": {},
    "variable:default:userId::test[0]": {},
  },

  // The interactions, as described below
  "examples": [],
}
```

## Anatomy of an interaction

Each interaction (called an `example` in the file format) has three parts:

- `states`: An array of the state definitions this interaction needs. Each
  state has a `_case:state:type` of either `_case:NamedState` or
  `_case:StateWithVariables`, a `stateName`, and (for states with variables) a
  `variables` object whose values are matchers.
- `mock`: The description of the mock for this interaction. It contains the
  matcher tree(s) for the data being exchanged (for example `request` and
  `response` for HTTP mocks), a `_case:mock:type` naming the mock executor to
  use, and a `_case:run:context:setup` object that tells ContractCase how to
  run the interaction from each side:
  - `write`: How to run the interaction on the side that defines the contract
  - `read`: How to run the interaction on the side that verifies the contract

  Each of these describes which mock type to use (eg an HTTP client interaction
  is run with a mock HTTP server during definition, and a mock HTTP client
  during verification), whether state variables come from state handlers
  (`'state'`) or their default values (`'default'`), and whether triggers are
  `'provided'` by the user or `'generated'` by ContractCase. See
  [writing mock types](../plugins/writing-mocks) for a full description.

- `result`: The result of the interaction when the contract was defined
  (successful interactions are recorded as `VERIFIED`).

## Metadata namespacing

Within the matcher trees, all ContractCase metadata keys are namespaced with a
`_case:` prefix (`_case:matcher:type`, `_case:mock:type`, `_case:state:type`
and so on), so they can't collide with user data. Everything without a
`_case:` prefix is literal data or the parameters of the enclosing matcher.

Matcher type constants provided by ContractCase itself are also prefixed with
`_case:` (for example `_case:MatchInteger`) - plugins use their own namespace
prefixes instead, as described in
[the plugin documentation](../plugins/writing-a-plugin#namespacing-your-types).

## Stability

The format may change between versions. Do not rely on the structure described here.
If you need to rely on details of the contract format, please open
[an issue](https://github.com/case-contract-testing/contract-case/issues/new) and
we can discuss your use case.
