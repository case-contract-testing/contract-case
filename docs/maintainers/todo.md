## Release roadmap

- [ ] Broker verification - read and publish result
- [ ] Initial docs
- [ ] Query string, probably
- [x] Note about stability
- [ ] Determine how package structure will work
- [x] Extract Jest DSL
- [ ] Maybe pull out Jest package?
- [ ] Maybe pull out core?
- [ ] Spike translation to C# etc

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
  - [ ] Get contract from broker
  - [ ] Publish verification result
- [x] Read contract file
  - [ ] Read all files in a location?
  - [x] Verify contract file
  - [ ] Error handling when the files don't exist
- [x] Http Headers
- [x] Query strings
- [ ] Crash messages
- [ ] Helpers for setting up tests
- [ ] Timeouts

Major features

- [x] Add context to start and end contract
- [x] Test harness integration
- [x] Provider defined examples
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
- [x] Resolved values (eg state)
- [x] Automatic names for interactions
- [x] Better automatic names eg "a GET request to /health"
- [ ] String matcher helpers
  - [x] Prefix
  - [x] Suffic
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

Contract file access patterns

- [x] Enumerate interactions
- [ ] List states ?
- [ ] Join contract files ?
- [ ] Union contract files
- [ ] Intersect contract files

Internals

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
- [ ] Make teardowns run for successful state setup functions when one of the setups (or other teardowns) fails.
- [ ] Strip matchers should take states
- [ ] "Is this interaction the same as that"?
- [ ] Broker CLI / integration?
- [ ] Combine files for upload (does the broker support multiple contracts between the same two services?)
- [ ] Review test harness and separate into a dedicated module
- [ ] Better system for stripping matchers with `and()` - maybe `{ items, keys, structure }`?

Configuration and ergonomics

- [x] Log levels
- [x] File locations
- [x] Silent mode (no logs or test output)
- [ ] Warn when a logLevel matcher is written to contract
- [ ] Error types marshalled at boundary
- [ ] Introduce error codes for different classes of error
  - [ ] Write documentation for every single CaseConfigurationError
- [ ] Annotate code generally with maintainer debug info
- [ ] Make raw errors on matcher save print a diff
- [ ] Warn when an autogenerated name is used directly in a test
- [ ] Debug logs should include state variables
- [ ] Error collapsers, so if the same spot produces the same errors for different reasons it will only be reported once.

Documentation

- [ ] Differences from Pact
- [ ] -- Pass-through APIs
- [ ] -- Mock model
- [ ] -- How to do proxy testing
- [ ] -- Extensibility
- [ ] How to use
- [ ] How states work
- [ ] Why there's no optional
- [ ] How log levels work
- [ ] Maintainer documentation

Potential issues:

- [ ] Double handling of lookup interactions if the same data is traversed (eg, by checkMatch and stripMatch)
- [x] Need to allow multiple values for variables

### Implementation notebook

Here I write notes to myself to make sure I don't miss anything

- [ ] Do I need runcontext:tree? Maybe I can remove it.
- [x] Review the invert contract logic, possibly this can be removed too - Update, it could
- [ ] Make loggable context explicit instead of calculated - or, calculate it better.
- [x] Fix issue with multiple values for the same variable
- [x] Fix issue where a failed trigger results in open sockets
- [x] Sort out the LoggableContext / LogContext naming mess
- [x] Remove logLevel setting and do it with context instead, allowing localised logging
- [x] Do we need to give the `and` matcher an optional example?
- [x] Examples might have matchers in them, need to strip those too
- [x] Can / should we give every matcher an optional example?
