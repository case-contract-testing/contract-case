# Writing state handlers

Like [triggers](./triggers), not all example types need state handlers during
contract definition. For example, if your service under test is an HTTP client, the
default state variables are used and you don't need to define state handlers. If
your service under test is an HTTP server, you will need to provide state handlers.

State handlers are defined with the `stateHandlers` key on the `ContractCaseConfig` object. The `stateHandlers` object is keyed by the state name.

## When are state handlers invoked?

State handlers are invoked by ContractCase during setup for Examples that were defined
with states (see the [ContractCase Example Lifecycle](/docs/defining-contracts/lifecycle)).
The order of execution of state handlers is the same as the order that the states
were defined in.

If you haven't defined states first, read the section on [defining
states](/docs/defining-contracts/state-definitions), which must be done during contract definition.

## What should a state handler do?

State handlers are invoked to set some preconditions for your service. This
means that each Example is able to be independent, allowing your tests to be
specific and easily repeatable.

A state handler is a function that is able to modify the state of a
running service. This is usually done by mocking the repository layer of your
service, but it can also be done by inserting into a database, or mocking at the
equivalent of the controller layer of your service. For more discussion, see the
section on [best practices for state handlers](/docs/best-practices/where-to-mock).

Optionally, a state handler can provide a teardown function too. This is
provided in case you need to undo the precondition setup (removing records from
the database, changing the mock back to a default, etc)

During verification of the contract above, a state handler would need to be written:

```ts
const stateHandlers = {
  // State handlers are keyed by the name of the state.
  // This must match exactly.

  // When the states don't have variables, there are two possible
  // signatures for a state handler:
  // Either
  //   () => Promise<void> | void
  // or
  //  {
  //    setup:    () => Promise<void> | void
  //    teardown: () => Promise | void
  //  }
  //
  // There are also state
  'Server is up': () => {
    // Any setup goes here
  },

  'A user with id "foo" exists': {
    setup: () => {
      // Any setup goes here
    },
    teardown: () => {
      // Any teardown goes here
    },
  },
};
```

### Setup state handlers

A setup state handler is is only invoked during the state setup lifecycle phase.

It can be defined as simple function:

```ts
stateHandlers: {
    'Server is up': () => {
       // Configure your running server to appear to be up here
    },
},
```

Or as a `setup` key on the stateHandler value:

```ts
stateHandlers: {
    'Server is up': {
        setup: () => {
            // Configure your running server to appear to be up here
        },
    }
},
```

If your function needs to be asynchronous, you can return a `Promise` or make it `async`.

```ts
stateHandlers: {
    'Server is up': {
        setup: async () => {
            // Configure your running server to appear to be up here
        },
    }
},
```

### Returning variables from state setup

If the state has variables, your state setup function must return an object keyed by variable name,
where each value is the variable value. You must provide a value for all
variables, and those values must match any Test Equivalence Matchers set on the
variable when it was set up.

```ts
stateHandlers: {
    // assuming inState('A user exists', { userId: 'foo' })
    'A user exists': async () => {
        const userId: string = await insertUser({ .... });
        return { userId };
    },

    // .... etc
},
```

### State teardown functions

State teardown functions are run after the Example has completed execution (see
the [Example Lifecycle documentation](/docs/defining-contracts/lifecycle) for
more information).

State teardown functions are specified with the `teardown` key on a state setup object:

```ts
stateHandlers: {
    'A user exists': {
        setup:  async () => {
            const userId: string = await insertUser({ .... });
            return { userId };
        },
        teardown: async () => {
            await removeUsers();
        }
    }
},
```

State teardown functions do not need to return anything.
