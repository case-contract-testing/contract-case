# How to add a new DSL

See also the document on [package structure](./PackageStructure.md)

All DSLs depend on `@contract-case/case-boundary`. They do not depend on
case-core (yes, even JavaScript). This is so that all DSLs have the same access
to the core. All languages support the same features.

The purpose of the DSL is to support the types and idioms in each target language.

## Hard rules

These are the rules that govern what can and can't go in a DSL. The rules are written
to reduce fragmentation and to keep the DSL layers light. Pull requests that
break these rules won't be accepted.

- **No functionality goes in your DSL.** The only purpose of your DSL layer is to make using ContractCase idiomatic in the target language.
- **No functionality goes in the case-boundary package**. The only purpose of the case-boundary
  layer is to map between JSii and `Case-Core`. It is necessary to do this mapping,
  because ContractCase has several layers of callbacks that could be arbitrarily
  deep, and we need to pass errors across them. See the Boundary Mappings section below. Long term, if a non-JSii language were to be supported, it would need its own `case-boundary`.
- **Any new functionality goes in to Case-Core.** If you're wanting to build new
  functionality, it should go there instead. See the other pages in the
  maintainers section for more on extending case-core.
- **No JSON definitions go in your DSL.** The pure-json example and matcher definitions are already exposed by
  other packages. You should not be creating JSON for Examples or Matchers in your
  DSL, unless you are depending on those other translated boundary packages to do so. Long term, if a non-JSii language were to be supported, it would need its own JSON definitions (ideally, parsed from `@contract-case/case-entities-internal`).
- **No types from `@contract-case/case-boundary` are to be exposed to users.** These types are internal implementation details.
- **Your DSL may depend on other DSLs.** For example, a Gradle DSL can depend on the
  Java DSL. Or a Jest DSL can depend on the TypeScript DSL.

## Naming

There are some repeated types through the layers. Generally:

1. Types in the core layer are prefixed with Case, eg `CaseConfigurationError` and `CaseConfig`.
2. Types in the boundary are prefixed with `Boundary`, eg `BoundaryResult` and `BoundaryCaseConfig`.
3. Types in the DSLs are prefixed with `ContractCase`, eg `ContractCaseConfigurationError` and `ContractCaseConfig`. Please follow this naming convention in your DSL.

## Implementing the DSL

Here are some steps you can follow to implement a new DSL. During implementation, you might find it useful to refer to the
[latest API documentation for the case boundary package](./reference/case-boundary-API.md)

### Steps

1. Create a `ContractCaseConfig` type that appears idiomatic in your language.
   See the contract-case-jest example, and the [configuration
   documentation](https://case.contract-testing.io/docs/reference/configuring).
   - Try to use your language's idioms and type system to make this config
     object nice to use and well-documented.
   - A good way to start is to implement a mapper that takes your
     ContractCaseConfig type and produces a `ContractCaseBoundaryConfig` object.
   - Don't check for invalid values or incompatible configuration states, as the
     core will do this for you.
2. Implement a class for both `ILogPrinter` and `IResultPrinter` (depending on
   your language, these could be the same class). These are wrappers for result
   printing and logging.
   - ContractCase only calls these methods when necessary - you do not need to
     filter the results or logs based on the value of config.
   - You will need to
     format the output, and print it (eg to standard out), unless your language
     doesn't support this. Return a `Result` as described below.
3. Create a `ContractDefiner` class. It must:
   - Expose the methods `runExample` and `runRejectingExample`. You may change the name of `runRejectingExample` to
     `runXXXExample` where `XXX` is an idiomatic word for `rejecting` in your
     language.
   - Have a constructor that takes your `ContractCaseConfig` object from step 1.
4. In the constructor for your `ContractDefiner` you should instantiate a
   `BoundaryContractDefiner`, with a mapped version of the config. See the boundary
   mappings section below.
5. Implement state handler mappings TODO describe
6. Implement trigger mappings TODO describe
7. Create a `ContractVerifier` class. It must:
   - Expose the `runVerification` method.
8. Create a class or type for `RunTestCallback`
9. Implement DSL for matchers, mocks and states (TODO describe)
10. Implement crash message printing TODO describe

TODO: More steps

## Boundary Mappings

Because the ContractCase core and boundary are written in Typescript and exposed via a JSii boundary, it's not possible to throw exceptions into the core natively. This means that we need to map any exception types into `BoundaryResult` types. The general rules are:

- Methods that are defined to return a `BoundaryResult` are called by ContractCase. In these methods:
  - firewall any exceptions and marshall into a `BoundaryFailure`
  - marshal any success into `BoundarySuccess` (for a void return) or an appropriate `BoundarySuccessWith*` type. You can tell what types are valid for the method you are implementing from the TSDoc documentation on that method (which should be available in the Case Boundary intellisense documentation in your language).
    - Don't instantiate a `BoundaryResult` directly as this is a subclass. instead use either `BoundarySuccess`, `BoundaryFailure` or one of the specific successes.
- All return values from ContractCase are also `BoundaryResult` types.
  - Any `BoundaryFailure`s returned must be unmarshalled into exceptions which you then throw.

### Unmarshalling a BoundaryFailure

The BoundaryFailure's `kind` field tells you what type of exception to throw. instead of hard coding possible values of the `kind` field, you should use the constants exposed in `BoundaryFailureKindConstants`.

Create three error types:

- `ContractCaseConfigurationError`
- `ContractCaseCoreError`
- `ContractCaseExpectationsNotMet`

(or equivalent names that match the idioms of your language, eg replacing `Error` with `Exception`).

- `BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` - this is returned when ContractCase believes that the user has configured it incorrectly. You should unmarshall this into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_CORE_ERROR` - this is returned when something broke inside ContractCase (either a bug such as a programmer error or a situation it doesn't know how to handle, or an internal problem inside a plugin). You should marshall this into a `ContractCaseCoreError`. You should unmarshall this into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_FAILED_ASSERTION_ERROR` - this is returned when the tests have failed and ContractCase wants the DSL to fail the currently running test suite. You should unmarshall this into a `ContractCaseExpectationsNotMet` error.

Additionally, these types might have alternative representations in the future:

- `BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR` - The user-provided verification function (testResponse or testErrorResponse) failed. This should be unmarshalled into a `ContractCaseExpectationsNotMet`.
- `BoundaryFailureKindConstants.CASE_BROKER_ERROR` - There was an error contacting the broker. Currently this should be unmarshalled into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_TRIGGER_ERROR` - The user-provided trigger failed when it was not expected to do so. Currently this should be unmarshalled into a `ContractCaseConfigurationError`
- Any other types are an error, and you should marshall them into a `ContractCaseCoreError`

TODO: Describe how to handle `location`

### Triggers

Triggers need to be mapped into combined triggers before being passed to the boundary. TODO: Describe this.

### State handlers

Mapping the state handlers is straightforward. TODO: Describe this.
