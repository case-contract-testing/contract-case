# Implmenentation Principles

Here we record the principles that are used to make implementation choices

## User facing

- User first: If misconfigurations happens, Case will print helpful errors that assist the user in finding a solution
- Not magic: Case prefers strict and fail-fast behaviour over "I guess you probably meant this".
  If there is a misconfiguration, and the user may have meant more than one thing, case will fail with with helpful errors.
- One model: There's only one model for Case. It's used in the contract file, to set contract tests, to extend with plugins, and to think about how tests work.

## Internals

- The only difference between test and verification is: Verification is multiple tests, while test is a single test. The input to a single verification is the same as the input to a single test.
- All matchers are only data, so they can be saved in the contract.
- Matchers are recursive. Each matcher that has children also accepts matchers.
- The context is also data, immutable (but may be replaced as you walk the matcher tree)
- Extensible: To implement a new matcher, you just implement the interface. This gives plugins for free. See [the Adding Matchers documentation](./AddingMatchers.md)
