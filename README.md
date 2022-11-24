# Case Contract Testing Framework

(working title)

Work in progress, not ready for use yet.

## Values

- User first: If misconfigurations happen, Case will print helpful errors that assist the user in finding a solution

## Design

- All matchers are only data, so they can be saved in the contract and passed around
- Extensible: To implement a new matcher, you just implement the interface

Completed

- [x] Primitive matchers
- [x] Cascading array and object matchers
- [x] shapedLike matchers
- [x] Http produce request body matcher
- [x] Http produce request path matcher
- [x] Http response status matcher
- [x] Http consume request verification matcher
- [x] Strip matchers
- [x] Test context before verification
- [x] Matcher acceptance
- [x] Location aware errors
- [x] Logging
- [x] Reference (named/lookup) interactions

Contract file access patterns

- [ ] Save a new matcher directly
- [ ] Enumerate interactions
- [ ] List states?

Future tasks

- [ ] Convenience matchers for object keys, arrays of a particular shape
- [ ] Helpers for setting up tests
- [ ] Write contract file
- [ ] Provider state
- [ ] Resolved values (eg state)
- [ ] Headers
- [ ] Join contract files
- [ ] Is this interaction the same as that?
- [ ] Authentication source
- [ ] Warnings and debug info
- [ ] And matcher
- [ ] Print objects properly
- [ ] Random port startup
- [ ] Introduce error codes for different classes of error
- [ ] Make sure all errors include context
- [ ] Crash messages

--

- [ ] Pact compatibility
- [ ] Test harness integration
- [ ] Provider defined examples

- [ ] Union contract files?
- [ ] Intersect contract files?
- [ ] Matcher structure / use verification
- [ ] Matcher version compatibility
- [ ] Matcher content verification
- [ ] Call-out matchers?
- [ ] JVM / Python / Go bindings
- [ ] Error types marshalled at boundary
- [ ] Broker CLI

Documentation

- [ ] Differences from Pact
- [ ] How to use
- [ ] How states work
- [ ] Why there's no optional

Issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)
