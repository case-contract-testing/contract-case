## Release roadmap

- [x] Broker verification - read and publish result
- [x] Initial docs
- [x] Query string, probably
- [x] Refactor to make Jest DSL extractable
- [x] Note about stability
- [x] Spike translation to C# etc
- [x] Determine how package structure will work
- [ ] Release Java + Python
- [ ] Extract Jest
- [ ] Release C# ?

## Package structure

- ${LANGUAGE}-DSL - The layer that users will actually use. Contains no features except for making Case idiomatic for that language. Mostly just a wrapper for Case-Boundaries to make error handling nice.
  - depends on case-boundary-internal

### Monorepo contains:

- Case-Boundary-Internal (the JSii layer that is the exported interface)
  - depends on case-core
- Case-CLI (Compiles to a cross platform CLI for contract manipulation with the broker)
  - depends on case-core
- Case-Test-Equivalence-Matchers (the JSii layer that just describes the matcher contents - separate because otherwise people might call the wrong thing in the boundaries layer)
  - depends on case-entities and case-core
- Case-Core (implements the actual matching + core)
  - depends on case-entities
- Case-entities (typescript types and helpers imported by both core and boundaries. Separate to avoid a circular dependency)

## Todo list

Next:

- [x] Fix Broker download contracts
- [x] Do upload for verification results
- [x] Spike JSii - support list
  - [x] Errors from JS to host
  - [x] Errors from host's provided functions
  - [x] Passing values between host's functions
  - [x] Standard out
  - [x] core calls a host callback that calls back to core
  - [x] Arbitrary JSON
  - [x] Arbitrary JSON with Case Matchers
- [x] Spike monorepo
- [ ] Flatten types at the boundary

  - [x] Classes for matchers
  - [ ] Classes for mocks
  - [ ] Types for contract definition
    - [ ] Types for Triggers
      - [ ] Implement triggerAndVerify
    - [x] Types for State Handlers
    - [x] Pass in core printer to Logger
    - [x] Types for Logger
    - [ ] Types for Result Printer
  - [ ] Types for extensions
    - [ ] Refactor context
  - [ ] Types for contract verification
  - [x] Figure out types for the triggers
  - [x] Figure out types for the check functions
  - Jest DSL
  - [ ] Error handling boundary
  - [ ] Crash messages
  - [ ] Case Matcher functions
  - Java DSL
  - [ ] Error handling boundary
  - [ ] Crash messages
  - [ ] Case Matcher functions

- [ ] Documentation pipeline for Matchers
- [x] Documentation for config object
- [x] Documentation for states
- [ ] Documentation for verification
- [ ] Auto-generate matcher documentation

Notes from refactor:

- [ ] Rename case:matcher to \_case:matcher
- [ ] Rename all case:matcher:matcher to case:matcher:child
  - But not the ones where it's not a child
- [ ] Make ending of matcher interfaces consistent
  - Some are:
    - Matches
    - Matcher
    - Match
    - Matchers / Children
- [ ] Make list of all resolvesTo
  - string
  - number
  - null
  - boolean
  - should there be "array" ?
- [ ] Properly use accepts or some other property to use resolvesTo
- [ ] Validators need to move
  - [ ] Array length (including checking that it's sensible)
  - [ ] Array length sensible
  - [ ] Array contains with an empty array
  - [ ] Array starts with with an empty array
  - [ ] String prefix with an empty string?

Pact Parity

- [ ] JVM / Python / Go / C# bindings
- [x] Strip matchers
- [x] Logging
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
  - [x] Variables from provider state (Implementation detail: via resolved matchers)
- [x] Write contract file
  - [x] Print errors nicely
  - [x] Config for location
- [ ] Broker compatibility
  - [x] Publish contract
  - [x] Get contract from broker
  - [x] Publish verification result
  - [ ] Choose version selectors for upload
  - [ ] Choose version selectors for download
  - [ ] Make download actually a nice CLI
- [x] Read contract file
  - [x] Read all files in a location?
  - [x] Verify contract file
  - [x] Error handling when the files don't exist
- [x] Http Headers
- [x] Query strings
- [ ] Crash messages
- [ ] Helpers for setting up tests
- [ ] Timeouts

Major features

- [x] Add context to start and end contract
- [x] Test harness integration
- [x] Provider defined examples
- [x] Authentication sources (authentication as a first class citizen)
- [ ] SNS and SQS support

Later features

- [ ] Save a new matcher directly to contract, without a test (so that it can be used in tests)
- [ ] Text bodies
- [ ] XML Matchers
- [ ] Http forms matchers
- [ ] grpc support
- [ ] graphql support
- [ ] Kafka support
- [ ] URL matchers

Cool features

- [x] And matcher
- [x] Resolved values (eg state)
- [x] Automatic names for interactions
- [x] Better automatic names eg "a GET request to /health"
- [ ] String matcher helpers
  - [x] Prefix
  - [x] Suffix
  - [ ] Pivot
  - [ ] Split
- [x] Matcher content verification
- [ ] Matcher argument verification
- [x] Options + config
  - [ ] Options and config from environment variables
  - [ ] Options and config from .rc files
- [x] Logging matchers
- [ ] JS Matchers - Loading plugins from a JS module
- [ ] Matcher version compatibility
- [ ] Pact compatibility (ability to read Pact files)
- [ ] Call-out matchers that call out to another service
- [ ] Ignore matcher ("pretend this isn't in the response for the following matcher")
- [ ] Run as a server so that arbitrary frameworks can use it
- [ ] "Is this interaction the same as that"?
- [ ] Combine files for upload (does the broker support multiple contracts between the same two services?)
- [ ] Parametrised matchers

Contract file access patterns

- [x] Enumerate interactions
- [ ] List states ?
- [ ] Join contract files ?
- [ ] Union contract files
- [ ] Intersect contract files

Internals

- [x] Http produce request body matcher
- [x] Http produce request path matcher
- [x] Http consume request verification matcher
- [x] Http response status matcher
- [x] Test context
- [x] Matcher acceptance
- [x] Location aware errors
- [x] Reference (named/lookup) interactions and matchers
- [x] Print objects properly
- [x] Errors that don't have associated matchers
- [x] Move interactions to matchers
- [x] Fail tests if there are configuration errors inside the handler
- [x] Tidy up strip matcher stuff
- [x] State setups should be available in the config
- [x] Make sure all errors include context
- [x] Do state handlers in order they're defined instead of all at once
- [x] Fix global import issue - probably post process the dist directory. Or rewrite all the imports :/
- [x] Indentation on test output
- [x] Release plan that includes version number - can we just import this like we did in pact? It would be nice if it was accurate.
- [x] Do I need runcontext:tree? Maybe I can remove it.
- [x] Review the invert contract logic, possibly this can be removed too - Update, it could
- [x] Make loggable context explicit instead of calculated - or, calculate it better.
- [x] Fix issue with multiple values for the same variable
- [x] Fix issue where a failed trigger results in open sockets
- [x] Sort out the LoggableContext / LogContext naming mess
- [x] Remove logLevel setting and do it with context instead, allowing localised logging
- [x] Do we need to give the `and` matcher an optional example?
- [x] Examples might have matchers in them, need to strip those too
- [x] Can / should we give every matcher an optional example?
- [x] Make dependency object instead of passing each dependency separately
- [ ] Make it less likely that a key is missed during the location printing (maybe make the maintainer-only location strings an explicit type instead of implied by `:`)
- [ ] Review test harness and separate into a dedicated module
- [ ] Move the error reporting logic closer to the boundary so that it's not possible to miss an example
- [ ] Ability to tell when the main run is taking place from context

Configuration and ergonomics

- [x] Log levels
- [x] File locations
- [x] Silent mode (no logs or test output)
- [x] Write docs for initial setup
- [ ] Check that contract is actually downloaded before trying to report results (etc)
- [ ] Named shaped object types (so eg headers doesn't say 'an object shaped like')
- [x] Better formatting of locations (strip unnecessary stuff unless in maintainer debug mode)
- [ ] Strip matchers should take states
- [ ] Nice support for named examples in request / responses
- [ ] Warn when a logLevel matcher is written to contract
- [ ] Error types marshalled at boundary
- [ ] Introduce error codes for different classes of error
  - [ ] Write documentation for every single CaseConfigurationError
- [ ] Annotate code generally with maintainer debug info
- [ ] Make raw errors on matcher save print a diff
- [ ] Make it an error to specify a different consumerName in runExample and defineContract
- [ ] Warn when an autogenerated name is used directly in a test
- [ ] Debug logs should include state variables
- [ ] Error collapsers, so if the same spot produces the same errors for different reasons it will only be reported once.
- [ ] Better system for stripping matchers with `and()` - maybe `{ items, keys, structure }`?
- [ ] Accepts / resolvesTo sanity checks

Documentation

- [x] Differences from Pact
- [ ] -- Pass-through APIs
- [ ] -- Mock model
- [ ] -- How to do proxy testing
- [ ] -- Extensibility
- [ ] How to use
- [ ] How states work
- [x] Why there's no optional
- [ ] How log levels work
- [ ] Maintainer documentation

Potential issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)
- [x] Need to allow multiple values for variables
- [ ] Dangling promises when 'No verifier or errorVerifier provided' CaseConfigurationError happens
- [ ] Make teardowns run for successful state setup functions when one of the setups (or other teardowns) fails.

### Implementation notebook

Here I write notes to myself to make sure I don't miss anything
