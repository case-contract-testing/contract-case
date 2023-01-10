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
2. Provider driven contracts
3. Arbitrary combinations of req/resp pairs (incidentally including SQS)
4. RELEASE BETA
5. Passthrough APIs
6. Plugins and arbitrary extensions

## Design

- All matchers are only data, so they can be saved in the contract and passed around
- Extensible: To implement a new matcher, you just implement the interface. See [the Adding Matchers documentation](./docs/maintainers//AddingMatchers.md)

## Todo list

Completed

- [x] Http produce request body matcher
- [x] Http produce request path matcher
- [x] Http consume request verification matcher
- [x] Http response status matcher
- [x] Test context
- [x] Matcher acceptance
- [x] Location aware errors
- [x] Reference (named/lookup) interactions and matchers
- [x] Print objects properly

Pact Parity

- [ ] JVM / Python / Go / C# bindings
- [x] Strip matchers
- [x] Loggingq
- [x] Random port startup
- [ ] Convenience matchers
  - [x] Primitive matchers
  - [x] Cascading array and object matchers
  - [x] shapedLike matchers
  - [x] Array each like
  - [x] Object keys
  - [x] Object values only
  - [x] String includes
  - [x] Array contains
  - [x] Integer
  - [ ] Timestamp with format (covers time, date and timestamp)
- Matchers we don't need, but will need to build if we want to read pact files
  - [ ] "Treat this as a string"
  - [ ] Decimal "with decimal places" (what does this mean? Probably covered by 'number')
  - [ ] Semver - limited use case, but neat
  - [ ] NotEmpty - why would this be needed?
  - [ ] Regex - dangerous as it allows optionals. Maybe a subset?
  - [ ] Probably out of scope: Binary content type with magic file check
- [x] Provider state
  - [ ] Variables from provider state (Implementation detail: via resolved matchers)
- [x] Write contract file
  - [x] Print errors nicely
  - [x] Config for location
- [x] Read contract file
  - [ ] Read all files in a location
  - [x] Verify contract file
  - [ ] Error handling when the files don't exist
  - [ ] Get files from broker
- [ ] Http Headers
- [ ] Crash messages
- [ ] Helpers for setting up tests
- [ ] Timeouts

Major features

- [x] Add context to start and end contract
- [x] Test harness integration
- [ ] Provider defined examples
- [ ] Authentication sources (authentication as a first class citizen)
- [ ] SNS and SQS support

Later major features

- [ ] Save a new matcher directly to contract, without a test (so that it can be used in tests)
- [ ] Text bodies
- [ ] XML Matchers
- [ ] Http forms matchers
- [ ] grpc support
- [ ] graphql support
- [ ] Kafka support

Cool features

- [x] And matcher
- [ ] Resolved values (eg state)
- [ ] Ignore matcher ("pretend this isn't in the response for the following matcher")
- [ ] Pact compatibility
- [ ] Call-out matchers that call out to another service
- [ ] Matcher structure / use verification
- [ ] Matcher version compatibility
- [ ] Matcher content verification
- [x] Options + config
  - [ ] Options and config from environment variables
  - [ ] Options and config from .rc files
- [ ] Run as a server so that arbitrary frameworks can use it
- [ ] String combination matchers - how would this work?
- [ ] JS Matchers - Loading plugins from a JS module
- [x] Automatic names for interactions
  - [ ] Better automatic names eg "a GET request to /health"
- [ ] Logging matchers

Contract file access patterns

- [x] Enumerate interactions
- [ ] List states ?
- [ ] Join contract files ?
- [ ] Union contract files
- [ ] Intersect contract files

Internals

- [ ] Errors that don't have associated matchers
- [ ] Error collapsers, so if the same spot produces the same errors for different reasons it will only be reported once.
- [ ] "Is this interaction the same as that"?
- [ ] Do state handlers in order they're defined instead of all at once
- [ ] Broker CLI / integration?
- [ ] Release plan that includes version number - can we just import this like we did in pact? It would be nice if it was accurate.
- [ ] Fix global import issue - probably post process the dist directory. Or rewrite all the imports :/
- [ ] Combine files for upload (does the broker support multiple contracts between the same two services?)
- [ ] Review test harness and separate into a dedicated module
- [ ] Warn on unused lookup matchers?
- [ ] Indentation on test output
- [ ] Better system for stripping matchers with `and()` - maybe `{ items, keys, structure }`?

Errors

- [ ] Error types marshalled at boundary
- [ ] Introduce error codes for different classes of error
  - [ ] Write documentation for every single CaseConfigurationError
- [x] Make sure all errors include context
- [ ] Annotate code generally with maintainer debug info

Configuration

- [x] Log levels
- [x] File locations
- [ ] Silent mode (no logs or test output)

Documentation

- [ ] Differences from Pact
- [ ] -- Pass-through APIs
- [ ] -- Interaction model
- [ ] -- How to do proxy testing
- [ ] -- Extensibility
- [ ] How to use
- [ ] How states work
- [ ] Why there's no optional
- [ ] How log levels work
- [ ] Maintainer documentation

Potential issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)

### Implementation notebook

Here I write notes to myself to make sure I don't miss anything

- [ ] Do I need runcontext:tree? Maybe I can remove it.
- [ ] Review the invert contract logic, possibly this can be removed too.
- [ ] Make loggable context explicit instead of calculated - or, calculate it better.
- [x] Remove logLevel setting and do it with context instead, allowing localised logging
- [x] Do we need to give the `and` matcher an optional example?
- [x] Examples might have matchers in them, need to strip those too
- [x] Can / should we give every matcher an optional example?
