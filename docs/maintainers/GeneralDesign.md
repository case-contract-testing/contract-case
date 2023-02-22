# Case Contract Testing Framework

(working title)

Work in progress, not ready for use yet. Expected beta testing: Feb 2023.

## Values

- User first: If misconfigurations happens, Case will print helpful errors that assist the user in finding a solution
- Not magic: Case prefers strict and fail-fast behaviour over "I guess you probably meant this".
  If there is a misconfiguration, and the user may have meant more than one thing, case will fail with with helpful errors.
- One model: There's only one model for Case. It's used in the contract file, to set contract tests, to extend with plugins, and to think about how tests work.

## Roadmap

1. Pact Parity (in progress)
2. Provider driven contracts (done)
3. Arbitrary combinations of req/resp pairs, incidentally including native SQS support
4. RELEASE BETA
5. Passthrough APIs
6. Plugins and arbitrary extensions

## Design

- All matchers are only data, so they can be saved in the contract and passed around
- Extensible: To implement a new matcher, you just implement the interface. See [the Adding Matchers documentation](./docs/maintainers//AddingMatchers.md)
