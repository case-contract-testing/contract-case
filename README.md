# Case Contract Testing Framework

(working title)

Work in progress, not ready for use yet.

## Values

- User first: If misconfigurations happens, Case will print helpful errors that assist the user in finding a solution
- Not magic: Case prefers strict and fail-fast behaviour over "I guess you probably meant this". Note - that is fail-fast _with helpful errors_

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
- [x] Print objects properly

Pact Parity

- [ ] JVM / Python / Go / C# bindings
- [ ] Convenience matchers for object keys, arrays of a particular shape
- [ ] Provider state
- [x] Write contract file
  - [ ] Print errors nicely
  - [ ] Config for location
  - [ ] Combine files for upload (does the broker support multiple contracts between the same two services?)
- [ ] Read contract file
  - [ ] Read all files in a location
  - [ ] Verify contract file
  - [ ] Error handling when the files don't exist
  - [ ] Get files from broker
- [ ] Headers
- [ ] Random port startup
- [ ] Crash messages
- [ ] Helpers for setting up tests

Major features

- [ ] Test harness integration
- [ ] Provider defined examples
- [ ] Authentication sources (authentication as a first class citizen)
- [ ] Modify matchers (eg toString)
- [ ] SNS and SQS support

Later major features

- [ ] Save a new matcher directly to contract
- [ ] grpc support
- [ ] graphql support
- [ ] Kafka support

Cool features

- [ ] And matcher
- [ ] Pact compatibility
- [ ] Call-out matchers that call out to another service
- [ ] Matcher structure / use verification
- [ ] Matcher version compatibility
- [ ] Matcher content verification
- [ ] Options + config
- [ ] Run as a server
- [ ] String combination matchers
- [ ] Manipulation matchers (eg "treat as string")
- [ ] JS Matchers
- [ ] Automatic names for interactions

Internals

- [ ] Resolved values (eg state)
- [ ] Is this interaction the same as that?
- [ ] Broker CLI / integration?
- [ ] Release plan that includes version number
- [ ] Fix global import issue

Contract file access patterns

- [ ] Enumerate interactions
- [ ] List states ?
- [ ] Join contract files ?
- [ ] Union contract files
- [ ] Intersect contract files

Errors

- [ ] Error types marshalled at boundary
- [ ] Introduce error codes for different classes of error
- [ ] Make sure all errors include context
- [ ] Annotate code generally with maintainer debug info
- [ ] Warn on unused lookup matchers?

Configuration

- [ ] Log levels and silent mode (no logs)

Documentation

- [ ] Differences from Pact
- [ ] -- Interaction model
- [ ] -- How to do proxy testing
- [ ] -- Extensibility
- [ ] How to use
- [ ] How states work
- [ ] Why there's no optional
- [ ] How log levels work
- [ ] Maintainer documentation

Issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)

### Implementation notebook

Here I write notes to myself to make sure I don't miss anything

- Do I need runcontext:tree? Maybe I can remove it.
- Review the invert contract logic, possibly this can be removed too.
