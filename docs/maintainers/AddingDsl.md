# How to add a new DSL

See also the document on [package structure](./PackageStructure.md)

All user-facing packages depend on `@contract-case/case-connector`. They do not depend on
case-core (yes, even JavaScript packages). This is so that all DSLs have the same access to the core, which means that all languages support the same features.

The purpose of the user-facing packages is to support the types and idioms for each target language.

## Hard rules

These are the rules that govern what can and can't go in a user-facing package. The rules are written
to reduce fragmentation and to keep the user-facing layers light. Pull requests that
break these rules won't be accepted.

- **No testing functionality goes in your DSL.** The only purpose of your DSL layer is to make using ContractCase idiomatic in the target language.
- **No testing functionality goes in the case-connector packages**. The only purpose of the case-connector
  layer is to map between user-facing packages in various languages and `Case-Core`. It is necessary to do this mapping,
  because ContractCase has several layers of callbacks that could be arbitrarily
  deep, and we need to pass errors across them. See the Boundary Mappings section below. Long term, if a non-JSii language were to be supported, it would need its own `case-boundary`.
- **Any new functionality goes in to Case-Core, or one of the core plugins.** If you're wanting to build new
  functionality, it should go there instead. See the other pages in the
  maintainers section for more on extending case-core.
- **(Almost) no validation goes in your DSL or user-facing package.** The
  ContractCase core performs validation and returns configuration errors, and you
  should rely on this to keep behaviour consistent. There are a couple of
  exceptions: Wherever possible, please use your language's type system to avoid the need
  for validation (for example, use enums where ContractCase expects a few
  different specific values of strings, like for `LogLevel`). Similarly, there may be cases where parse or serialisation errors make sense to be thrown as `ContractCaseConfigurationError` types inside your user-facing package. Use your judgement, and chat to us if you're not sure.
- **No hand-written JSON matcher/mock example definitions go in your DSL.** The pure-json interaction and matcher definitions are already exposed by
  other packages. You should not be creating JSON for Interactions or Matchers in your
  DSL, unless you are depending on those other translated boundary packages to do so. Long term, if a non-JSii language were to be supported, it would need its own JSON definitions (ideally, parsed from `@contract-case/case-entities-internal`).
- **No types from `@contract-case/case-boundary` are to be exposed to users.** These types are internal implementation details.
- **Your user-facing package may depend on other user-facing packages.** For example, a Gradle DSL can depend on the
  Java DSL. Or a Jest DSL can depend on the TypeScript DSL.

## Naming

There are some repeated types through the layers. Generally:

1. Types in the core layer are prefixed with Case, eg `CaseConfigurationError` and `CaseConfig`.
2. Types in the connector are prefixed with `Connector`, eg `ConnectorResult` and `ConnectorCaseConfig`.
3. Types in the DSLs are prefixed with `ContractCase`, eg `ContractCaseConfigurationError` and `ContractCaseConfig`. Please follow this naming convention in your DSL.

## Implementing the DSL

Here are some steps you can follow to implement a new DSL. During implementation, you might find it useful to refer to the
[latest API documentation for the case boundary package](./reference/case-boundary-API.md)

### Steps

**_WARNING the following instructions are outdated. They were correct before the Connector package and gRPC server existed_**

**_If you're about to follow these instructions, please get in touch via an issue instead_**

**_We had to migrate away from a pure-JSii translated boundary package, because of a design choice in JSii that restricts host languages to blocking i/o, which makes a contract testing framework difficult to implement. Instead, there's now a gRPC server which allows contract definition and verification to be triggered 'remotely'_**

Here's an overview of the steps to create the DSL. Detailed description follows in the subsequent sections.

1. Implement a mapper from exceptions to `BoundaryFailure`
1. Create and map a `ContractCaseConfig` object
1. Map exceptions from your language into a `BoundaryResult` type (this mapper will be necessary during the next two steps)
1. Create a `StateHandler` type and map it to `BoundaryStateHandlerWithTeardown`
1. Create a `TriggerGroups` type and map it to a `Record<string, ITriggerFunction>` (or equivalent type in your language, eg `Map<string, ITriggerFunction>` for Java)
1. Create a `ContractDefiner` class
1. Implement `ILogPrinter` and `IResultPrinter`
1. Implement the `ContractDefiner` class
1. Implement a mapper for `BoundaryFailure`s to exceptions
1. Implement the `ContractVerifier` class

##### Mapping `ContractCaseConfig`

Create a `ContractCaseConfig` type that appears idiomatic in your language.
See the contract-case-jest example, and the [configuration
documentation](https://case.contract-testing.io/docs/reference/configuring).

- Try to use your language's idioms and type system to make this config
  object nice to use and well-documented.
- A good way to start is to implement a mapper that takes your
  ContractCaseConfig type and produces a `ContractCaseBoundaryConfig` object.
- Don't check for invalid values or incompatible configuration states, as the
  core will do this for you
- Map all fields except `testRunId`. For the complex types `StateHandler` and `TriggerGroups`, see the next section.
- Don't expose `testRunId` on the `ContractCaseConfig`. This should be (ideally)
  generated from your test framework so that it is different for each
  concurrently-running test. This is used by ContractCase so that concurrently
  running tests can't interfere. It is ok if the `testRunId` is the same across
  multiple subsequent test runs, but it is not ok if the ID is the same during a
  single run.

You will need to map state handlers and trigger groups - these are described in the next sections.

## Mapping exceptions and callback return types.

Because the ContractCase core and boundary are written in Typescript and exposed via a JSii boundary, it's not possible to throw exceptions into the core natively. This means that we need to map any exceptions that happen in callbacks into `BoundaryResult` types. The general rules are:

- Methods that are defined to return a `BoundaryResult` are called by ContractCase. In these methods:
  - firewall any exceptions and marshall into a `BoundaryFailure`
  - The failure should contain the message from your exception, and stringify the stack trace (in the way you'd want to present it to users) as the `location` property.
  - marshal any success into `BoundarySuccess` (for a void return) or an appropriate `BoundarySuccessWith*` type. You can tell what types are valid for the method you are implementing from the TSDoc documentation on that method (which should be available in the Case Boundary intellisense documentation in your language).
    - Don't instantiate a `BoundaryResult` directly as this is an abstract class. instead use either `BoundarySuccess`, `BoundaryFailure` or one of the specific successes.
- All return values from ContractCase are also `BoundaryResult` types.
  - Any `BoundaryFailure`s returned must be unmarshalled into exceptions which you then throw.

##### Mapping `StateHandlers`

TODO describe (for now see the implementation in the jest DSL)

##### Mapping `TriggerGroups`

Triggers need to be mapped into combined triggers before being passed to the boundary. TODO: Describe this.

TODO describe (for now see the implementation in the jest DSL)

##### Implementing `ILogPrinter` and `IResultPrinter`

Implement a class that satisfies `ILogPrinter` and `IResultPrinter` (depending on
your language, these could be the same class). These are wrappers for result
printing and logging.

- ContractCase only calls these methods when necessary - you do not need to
  filter the results or logs based on the value of config.
- You will need to
  format the output, and print it (eg to standard out), unless your language
  doesn't support this. Return a `Result` as described below.

##### Implementing the `ContractDefiner` class

Create a `ContractDefiner` class. It must:

1. Have a constructor that takes a `ContractCaseConfig`, and instantiates a private
   `BoundaryContractDefiner`, with a mapped version of the config. See the boundary
   mappings section below.
2. Expose a `runInteraction` method
   - This method delegates to the BoundaryContractDefiner.runInteraction
   - Map the returned `BoundaryResult` into an error (if appropriate). See the error mappings section below.
   - TODO: Describe how to map trigger / testResponse - this is the only place where you may throw a `CaseConfigurationError`
3. Expose a `runRejectingInteraction` method.
   -You may change the name of `runRejectingInteraction` to `runXxxInteraction` where `Xxx` is an idiomatic word for `rejecting` in your language (eg, the java DSL uses `runThrowingExample`).
   - This method delegates to the `BoundaryContractDefiner.runRejectingInteraction`
   - Map the `BoundaryResult` the same way as the `runInteraction` method.
   - TODO: Describe how to map trigger / testErrorResponse - this is the only place where you may throw a `CaseConfigurationError`

### Unmarshalling a `BoundaryFailure`

Just as the ContractCase Boundary expects callbacks to return a
`BoundaryFailure`, it will pass back `BoundaryFailure` objects instead of
throwing exceptions. You should unmarshall these into exceptions or equivalents
in your language.

The BoundaryFailure's `kind` field tells you what type of exception to throw.
instead of hard coding possible values of the `kind` field, you should use the
constants exposed in `BoundaryFailureKindConstants`.

Create three error types:

- `ContractCaseConfigurationError`
- `ContractCaseCoreError`
- `ContractCaseExpectationsNotMet`

(or equivalent names that match the idioms of your language, eg replacing
`Error` with `Exception`). These must all take a message property (for the
message) and a `location` property, which is a string representation of the
stack trace.

- `BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` - this is returned when ContractCase believes that the user has configured it incorrectly. You should unmarshall this into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_CORE_ERROR` - this is returned when something broke inside ContractCase (either a bug such as a programmer error or a situation it doesn't know how to handle, or an internal problem inside a plugin). You should marshall this into a `ContractCaseCoreError`. You should unmarshall this into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_FAILED_ASSERTION_ERROR` - this is returned when the tests have failed and ContractCase wants the DSL to fail the currently running test suite. You should unmarshall this into a `ContractCaseExpectationsNotMet` error.

Additionally, these types might have alternative representations in the future:

- `BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR` - The user-provided verification function (testResponse or testErrorResponse) failed. This should be unmarshalled into a `ContractCaseExpectationsNotMet`.
- `BoundaryFailureKindConstants.CASE_BROKER_ERROR` - There was an error contacting the broker. Currently this should be unmarshalled into a `ContractCaseConfigurationError`
- `BoundaryFailureKindConstants.CASE_TRIGGER_ERROR` - The user-provided trigger failed when it was not expected to do so. Currently this should be unmarshalled into a `ContractCaseConfigurationError`
- Any other types are an error, and you should marshall them into a `ContractCaseCoreError`

Now update the exception mapper you created earlier to map your
`ContractCaseConfigurationError` and `ContractCaseCoreError` and
`ContractCaseExpectationsNotMet` into equivalent `BoundaryFailure` types. Make
sure you respect and pass along the `location` property.

##### Implementing the `ContractVerifier` class

Create a `ContractVerifier` class. It must:

1. Have a constructor that takes a `ContractCaseConfig`, and instantiates a private
   `BoundaryContractVerifier`, with a mapped version of the config.
2. Create a class or type for `RunTestCallback`. This is called when ContractCase wants to run a single example during the verification. In this callback, you should:
   - (if possible) Tell your test framework it is running a test with the name from the parameter
   - Call the `invoker` passed in, this will run the test. Map any `BoundaryFailure` or `BoundarySuccess` appropriately. A `BoundaryFailure` should fail the running test.
   - Map any further exceptions (there should be none possible, but map them anyway to catch a programmer error in your DSL) to a `BoundaryFailure`
   - Return `BoundarySuccess` on success.
3. Expose the `runVerification` method. In this method:
   - map the configOverrides, and call the boundary verifier `runVerification` method.
   - Parse the returned `BoundaryResult` type and map to an exception if appropriate
4. Expose the `availableContractDescriptions` method.
   - Parse the returned `BoundaryResult` type and map to an exception if appropriate, otherwise map to an object that matches `ContractDescription` objects.

##### Expose the DSL for matchers, mocks and states

TODO describe

##### Implement crash message printing

Implement crash message printing TODO describe
