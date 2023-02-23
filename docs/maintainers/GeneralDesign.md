# Guidelines

This document contains the guidelines used to make design and code choices when
extending or maintaining Case.

## Values

- User first: If misconfigurations happens, Case will print helpful errors that assist the user in finding a solution
- Not magic: Case prefers strict and fail-fast behaviour over "I guess you probably meant this".
  If there is a misconfiguration, and the user may have meant more than one thing, case will fail with with helpful errors.
- One model: There's only one model for Case. It's used in the contract file, to set contract tests, to extend with plugins, and to think about how tests work.

## Guidelines

- Don't build features inside the boundaries layer, as this is meant to be a thin wrapper / DSL around the core interface. This will avoid the problem of some features existing in some languages and not others.
- All matchers are immutable. Don't edit the contents of a matcher, instead, if you need to change something inside a matcher, produce a new tree and call that instead.
- The context is also immutable data (but may be replaced as you walk the matcher tree)

## Design choices

- All matchers are only data, so they can be saved in the contract and passed around
- Matchers are recursive. Each matcher that has children also accepts matchers.
- Extensible: To implement a new matcher, you just implement the interface. See [the Adding Matchers documentation](./docs/maintainers//AddingMatchers.md)

- The only difference between test and verification is: Verification is multiple tests, while test is a single test. The input to a single verification is the same as the input to a single test.
