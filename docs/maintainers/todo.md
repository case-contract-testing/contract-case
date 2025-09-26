## Release roadmap

- [x] Broker verification - read and publish result
- [x] Initial docs
- [x] Query string, probably
- [x] Refactor to make Jest DSL extractable
- [x] Note about stability
- [x] Spike translation to C# etc
- [x] Determine how package structure will work
- [x] Extract Jest
- [x] Release Java
  - [x] DSL call core
  - [x] DSL start server
  - [x] Example client define
  - [x] Example client verify
  - [ ] Example server define
  - [ ] Example server verify
- [ ] Broker docs
- [ ] Broker configurability in CLI
  - [ ] Selectors on download
  - [ ] Publish selectors
- [ ] Auto docs on Matchers
- [ ] Auto docs on Mock types
- [ ] Fix bug where it's not finding the CI token
- [ ] Release python
- [ ] Release C# ?

## Permalinks needed

The following links need to be made permanent, or replaced with permalink
versions, as they are listed in source code / generated documentation.

- https://case.contract-testing.io/docs/reference/configuring
- https://case.contract-testing.io/docs/reference/state-handlers/
- https://case.contract-testing.io/docs/reference/triggers

## Todo list

Next:

- [ ] Different verifications with specific configuration, so that you can do "main fails, everything else is just recorded as failure"
- [ ] Arbitrary behaviour on verification - probably a callback to the host language
- [ ] Name contracts, so that they can be described in logs
- [ ] Group the verification handles, so they can be reported in groups in host languages
- [ ] Generate Matchers and remove JSii
- [ ] Improve snapshot mismatch error by saying how the snapshot doesn't match
- [ ] Reasoning about required-for-deploy so that client-providers are better matched
- [ ] Document that you can mix interaction types
- [ ] Do a configuration error message like the crash message, so that misconfigurations don't result in stack traces
- [x] Ensure original stack traces are maintained across boundaries and implement `originalStack` function.
- [ ] Add way to say 'I need this field and I don't care what's in it'
- [ ] Replace direct access of context in the core with selector methods, so that the logic is consistent and will read more fluently
- [ ] Validate config - some settings can come as arbitrary strings (eg from env), and we could be more helpful if there are errors
- [ ] Allow both `CASE_foo` and `CASE_FOO` environment variables (but fail if they're both set to different things).
- [ ] Make sure that downloaded contracts don't write to `main`, and don't collide with local contracts.

Document

- [ ] `namedLookup` for looking up a named segment
- [ ] Automatically named request / response pairs
- [ ] stateHandlers and Config in the runInteraction or the main contract call

Java:

- [ ] Give `TriggerGroups` a builder and make it immutable, to match the rest of the builders
- [ ] Complete javadoc (eliminate all warnings)
- [ ] Autogenerate documentation of configuration classes somehow - so that they're in sync between different languages
- [ ] Implement server verification and definition in the tests
- [x] Implement function verifiers
- [x] Implement mockConfig passing
- [ ] Should we catch JUnit failures and remap them so that contract case can render them?
- [ ] More idiomatic logging - at the moment, you have to set standard out as the logger
- [ ] Kill Boundary layer - it's unnecessary, we should map straight to Connector

- [x] Don't throw exceptions in the DSL - it won't be handled correctly by JSii.
- [x] Fix variables so that you can have different defaults for different states
- [ ] State handlers in the grpc connector aren't given the configuration
- [x] Connect CASE_CONNECTOR_CLIENT to a maintainer log somewhere
- [x] Connect CASE_CONNECTOR_CLIENT in Jest DSL - probably include it in an
      internal config property, and have the grpc connector read it from the env var
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
- [x] Flatten types at the boundary

Tidiness:

- [ ] Perhaps separate the DSL's needs in the definition package and the pretty-format, bit too.
- [ ] Rename handle -> functionName in the registerFunction() calls
  - [x] Classes for matchers
  - [x] Classes for mocks
  - [x] Types for contract definition
    - [x] Types for Triggers
      - [x] Implement triggerAndVerify
    - [x] Types for State Handlers
    - [x] Pass in core printer to Logger
    - [x] Types for Logger
    - [x] Types for Result Printer
  - [x] Types for extensions
    - [ ] Split result printer out of exposed context
    - [ ] Refactor context to separate functions and data to make it easier to expose
  - [x] Types for contract verification
  - [x] Figure out types for the triggers
  - [x] Figure out types for the check functions
  - Jest DSL
  - [x] Error handling boundary
  - [x] Crash messages
  - [ ] Case Matcher functions so that you don't have to import JSii
  - Java DSL
  - [x] Set up maven publish
  - [x] Error handling boundary
  - [x] Crash messages
  - [x] Case Matcher functions so that you don't have to import JSii
  - [x] Trigger functions should take config

- [ ] Build mechanism to ensure that mocks have the right number of request / response present
- [ ] Tidy up error handling in the grpc connector
  - [ ] Thrown errors should be caught in the section that they're thrown, so that they don't fall over the whole connector
  - [ ] There should be a never-throws boundary in the domain layer, in case the mappers throw
  - [ ] DRY out the unexpected error handler

## Mindless tasks

Good for when I don't want to think

- [ ] Replace all `maintainerLog` lines with appropriate `connectorDebugLog` lines

## Documentation todos

- [ ] case-context ? Maybe move this out
- [ ] case-contract format ? maybe move this out too
- [ ] Extending case
- [x] Vs e2e
- [x] Vs schema
- [x] Vs pact
- [ ] API coverage
- [ ] Confirm understood client
- [ ] Ways to write contracts easily
- [ ] Where to mock
- [ ] Write specific responses
- [ ] Brokers
- [ ] Example types
- [x] Matchers: Auto-generate matcher documentation
- [ ] Verifying contracts
- [x] Deployment checks
- [x] Documentation for config object
- [x] Documentation for states
- [ ] Documentation for verification
- [x] Remove "advanced topics" but keep content
- [x] Remove FAQ but keep content
- [x] Differences from Pact
- [ ] -- Pass-through APIs
- [ ] -- Mock model
- [ ] -- How to do proxy testing
- [ ] -- Extensibility
- [ ] How to use
- [x] How states work
- [x] Why there's no optional
- [x] How log levels work
- [ ] Maintainer documentation
- [ ] Correct coverage information
- [x] Package versioning strategy

## After grpc

- [ ] Remove case-boundary types from java wrapper
- [ ] Write up / modify implementation instructions
- [ ] Remove case-boundary from case-connector (refactor so that ts dsl uses the same as the grpc?)
- [ ] It's possible that mustResolveToString and mustResolveToNumber have been
      used in places where we meant `shouldResolveToString` - review uses, and
      consider introducing a version that doesn't throw CaseCoreError

## Notes from refactor:

- [x] Add a way to configure individual mocks
- [ ] Rename all the repeated types so they're not confusing
- [x] Rename case:matcher to \_case:matcher
- [x] Rename all case:matcher:matcher to case:matcher:child
  - But not the ones where it's not a child
- [x] Make ending of matcher interfaces consistent
  - Some are:
    - Matches
    - Matcher
    - Match
    - Matchers / Children
- [x] Make list of all resolvesTo
  - string
  - number
  - null
  - boolean
  - should there be "array" ?
- [ ] Properly use accepts or some other property to use resolvesTo
- [x] Validators need to move
  - [ ] Array length (including checking that it's sensible)
  - [ ] Array length sensible
  - [ ] Array contains with an empty array
  - [ ] Array starts with with an empty array
  - [ ] String prefix with an empty string?
- [ ] Remove MatchContextByType from core
- [ ] Make it an error to not have broker tokens or URLs when trying to publish

# Connector

- [x] Make loggers for the boundaries & glue
- [x] Extract controller from grpc, maybe
- [ ] Confirm if the state handlers should have config / params?
- [ ] Move the links to the promise handler out of the mappers
- [x] Remove the unnecessary handles from the grpc
- [ ] Do proper stack trace passing, as a first class object
- [x] Tie the proto in the java to the proto in the typescript
- [x] Start the server from java
- [x] Remove JSii from boundary
- [x] Redo boundary interface types now that we don't need JSii
- [ ] Add back in validators for constants (probably contract tests)
- [ ] Expose teardown correctly on boundary
- [ ] Wrap connector errors so that the core can't explode the server

# Java

- [ ] Make junit wrapper

# Pact Parity

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
  - [ ] Publish branch in verification (PUT /pacticipants/<name>/branches/<branchname>/versions/<version>)
  - [ ] Choose version selectors for upload
  - [ ] Choose version selectors for download
  - [ ] Make download actually a nice CLI
- [x] Read contract file
  - [x] Read all files in a location?
  - [x] Verify contract file
  - [x] Error handling when the files don't exist
- [x] Http Headers
- [x] Query strings
- [x] Crash messages
- [ ] Helpers for setting up tests
- [ ] Timeouts

# Major features

- [x] Add context to start and end contract
- [x] Test harness integration
- [x] Provider defined examples
- [x] Authentication sources (authentication as a first class citizen)
- [ ] SNS and SQS support
- [ ] grpc support

# Later features

- [ ] Save a new matcher directly to contract, without a test (so that it can be used in tests)
- [ ] Text bodies
- [ ] XML Matchers
- [ ] Http forms matchers
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
  - [ ] As String
- [x] Matcher content verification
- [x] Matcher argument verification
- [x] Options + config
  - [x] Options and config from environment variables
  - [ ] Options and config from .rc files
- [x] Logging matchers
- [x] JS Matchers - Loading plugins from a JS module
- [ ] Matcher version compatibility
- [ ] Pact compatibility (ability to read Pact files)
- [ ] Call-out matchers that call out to another service
- [ ] Ignore matcher ("pretend this isn't in the response for the following matcher")
- [x] Run as a server so that arbitrary frameworks can use it
- [ ] "Is this interaction the same as that"?
- [ ] Combine files for upload (does the broker support multiple contracts between the same two services?)
  - [x] No, the broker should not support multiple contracts between the same two services, because otherwise you don't know if you have all the expectations for that service
- [ ] Parametrised matchers so you can say "do this test for each of these values of this enum" or similar
- [ ] Ability to change the default version strategy, so you don't have to use tags

## Contract file access patterns

- [x] Enumerate interactions
- [ ] List states ?
- [ ] Join contract files ?
- [ ] Union contract files
- [ ] Intersect contract files

## Internals

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
- [ ] Ability to tell when the main run is taking place from context (maybe don't log during the sanity run?)
- [ ] Make the triggerAndTests map have a more unique key (not just `::`, and detect if it has been printed twice)

## Configuration and ergonomics

- [x] Log levels
- [x] File locations
- [x] Silent mode (no logs or test output)
- [x] Write docs for initial setup
- [ ] Fail if there are no tests
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
- [ ] Make it an error to specify a different consumerName in runInteraction and defineContract
- [ ] Warn when an autogenerated name is used directly in a test
- [ ] Debug logs should include state variables
- [ ] Error collapsers, so if the same spot produces the same errors for different reasons it will only be reported once.
- [ ] Better system for stripping matchers with `and()` - maybe `{ items, keys, structure }`?
- [ ] Accepts / resolvesTo sanity checks

Potential issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)
- [x] Need to allow multiple values for variables
- [ ] Dangling promises when 'No verifier or errorVerifier provided' CaseConfigurationError happens
- [ ] Make teardowns run for successful state setup functions when one of the setups (or other teardowns) fails.
- [ ] Worker process still running when the triggers aren't found
- [x] Server shutdown is slow when run via grpc - fixed by lowering the keepalive

### Implementation notebook

Here I write notes to myself to make sure I don't miss anything

- [ ] Check error types that case can actually emit - do all of them make it to the boundary? Maybe we can remove some from ResultKindConstants
