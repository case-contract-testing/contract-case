# Ubiquitous Language

> Note: this glossary was extracted from the ContractCase documentation and code
> rather than from the originating conversation, which contained no domain
> discussion. Treat the canonical-term choices below as proposals — correct any
> that don't match how the team actually speaks.

## Contract lifecycle

| Term                      | Definition                                                                                       | Aliases to avoid                  |
| ------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------- |
| **Contract**              | A record of the agreed interactions between one consumer and one provider                        | Pact, spec, agreement             |
| **Contract definition**   | The phase in which the consumer is tested against a mock provider, producing the contract file   | Recording, authoring, writing     |
| **Contract verification** | The phase in which the contract file is replayed against the real provider using a mock consumer | Validation, replay, checking      |
| **Contract file**         | The on-disk artefact written at the end of definition and consumed during verification           | Output, JSON, the pact            |
| **Interaction**           | A single unit of a contract — one request/response (or message) pairing, defined by example      | Test case, scenario               |
| **Example**               | The act of specifying an interaction by giving a concrete instance; "definition by example"      | Sample (when meaning Interaction) |

## Services and roles

| Term                | Definition                                                                                  | Aliases to avoid          |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------------- |
| **Service**         | Any communicating participant — client, server, message producer, or consumer               | App, system, microservice |
| **Consumer**        | The service whose expectations drive the contract (it consumes requests or responses)       | Client, caller            |
| **Provider**        | The service whose behaviour the contract describes and which is verified against            | Server, producer, API     |
| **Consumer-driven** | The principle that the consumer's expectations define the contract, regardless of direction | Client-led                |

## Mocks

| Term              | Definition                                                                                                                                                  | Aliases to avoid                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Mock**          | A replayable stand-in for the service on the other side of an interaction                                                                                   | Stub, fake, double                                 |
| **Mock provider** | The mock standing in for the provider while the real consumer is exercised. May be a mock server or a mock client, depending on the interaction's direction | Mock server (the role is _provider_, not _server_) |
| **Mock consumer** | The mock that reproduces the consumer's recorded behaviour while the real provider is exercised                                                             | Mock client (the role is _consumer_, not _client_) |

## Matchers

| Term        | Definition                                                                                                          | Aliases to avoid        |
| ----------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Matcher** | A Test Equivalence Matcher: an assertion that this example covers every case passing the matcher (e.g. `anyString`) | Rule, validator, schema |

## States

| Term                 | Definition                                                                                                                                                                                                             | Aliases to avoid                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **State**            | A named precondition under which an interaction produces a particular response                                                                                                                                         | Status, mode, fixture           |
| **State definition** | A declaration that an interaction requires a given state, referenced via `inState()`                                                                                                                                   | State setup (when declaring)    |
| **State handler**    | A function that puts a real service into a given state. Runs on whichever side hosts the real service — the provider at verification, or the consumer at definition when the contract is authored from the server side | State setup (when implementing) |

## Triggers

| Term              | Definition                                                                                    | Aliases to avoid                                            |
| ----------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Trigger**       | A function that invokes the real consumer code so its request can be checked against the mock | Driver, invoker                                             |
| **Trigger group** | A trigger bundled with the `testResponse`/`testErrorResponse` functions for one named request | Trigger map (the whole collection is the `TriggerGroupMap`) |
| **Test response** | A function that asserts on the response a trigger received for a successful interaction       | Assertion, check                                            |

## Distribution

| Term       | Definition                                                                         | Aliases to avoid |
| ---------- | ---------------------------------------------------------------------------------- | ---------------- |
| **Broker** | A service that hosts and shares contract files between consumer and provider teams | Registry, hub    |

## Relationships

- A **Contract** is for exactly one **Consumer**/**Provider** pair and is a series of **Interactions**.
- Each **Interaction** is defined by **Example** and runs independently during **Contract definition**.
- **Contract definition** produces a **Contract file**; **Contract verification** consumes it.
- A **Mock provider** is used during definition; a **Mock consumer** is used during verification.
- A **State definition** declares a required **State**; a matching **State handler** sets the real service into it — on the provider at verification, or on the consumer at definition when authoring from the server side.
- A **Trigger** invokes the real **Consumer**; its **Trigger group** routes the result to the right **Test response**.

## Example dialogue

> **Dev:** "When I write an **interaction** for the HTTP client, am I testing against the real **provider**?"

> **Domain expert:** "No — during **contract definition** you test your real **consumer** against a **mock provider**. That confirms your client really sends the request you claimed, and writes the **contract file**."

> **Dev:** "So where does the real **provider** come in?"

> **Domain expert:** "**Contract verification**. We replay the **contract file** against the real **provider**, using a **mock consumer** that behaves exactly like the consumer did in step one."

> **Dev:** "And if an **interaction** needs a user to already exist?"

> **Domain expert:** "You add a **state definition** with `inState()`. Whoever runs the real service writes a matching **state handler** for that **state** — usually the provider team at verification."

> **Dev:** "But what if my **consumer** is itself a server — am I defining the contract from the server side?"

> **Domain expert:** "Right. **Consumer** and **provider** are roles, not client-vs-server. When you author from the server side, the real **consumer** runs at **contract definition**, so the **state handlers** live there, and the **mock** is on the other side."

## Flagged ambiguities

- **"Consumer" ≠ "client" and "Provider" ≠ "server".** These are roles defined by who drives the contract, not by network direction — a **Consumer** can be an HTTP server consuming requests. Consequently **mocks** and **state handlers** are _not_ pinned to a phase: they land on whichever side runs the real service, so a contract authored from the server side puts **state handlers** at **contract definition**, not verification.
- **"Mock"** is used for two opposite things: the **mock provider** stands in for the provider while the real consumer is exercised, while the **mock consumer** reproduces the consumer while the real provider is exercised. Always qualify which one, and don't equate either with "mock server"/"mock client" — the mock's network role depends on the interaction's direction.
- **"Example" vs "Interaction"** are used near-interchangeably in the docs ("a contract is a series of interactions, defined by example"). Recommend reserving **Interaction** for the unit of a contract and **Example** for the _act/style_ of defining one — don't say "an example" to mean "an interaction".
- **"State"** spans three distinct things: the precondition concept (**State**), its declaration (**State definition**), and the function that realises it (**State handler**). "Set up the state" is ambiguous about which artefact you mean — name it.
- **"Service"** is the deliberately neutral umbrella term (client/server/producer/consumer). Don't narrow it to "server" — that collides with **Provider**.
