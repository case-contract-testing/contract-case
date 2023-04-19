---
sidebar_position: 3
---

# Defining a ContractCase Example

In ContractCase, a contract is a series of examples. Each example is independent - for
example: "a getUser request looks like $X, and a success response looks like $Y":

```ts
    it('behaves as expected', async () => {
        await contract.runExample({
            definition: willSendHttpRequest({
                request: {
                    method: 'GET',
                    path: '/users/foo',
                },
                response: {
                    status: 200,
                    body: {
                        // Note that we only describe the fields
                        // that your consumer actually needs for
                        // this particular test.  The real response
                        // might have more elements, but if your
                        // consumer doesn't need them, you don't
                        // need to put them in the contract.
                        userId: 'foo'
                        name: 'john smith',
                    },
                },
            }),
        })
    })
```

Any preconditions needed to set up the examples are handled with state - for
example: "when a user with ID 'foo' exists, a getUser request looks like $X, and
a success response looks like $Y":

```ts
await contract.runExample({
    states: [
        inState('Server is up'),
        inState('A user with id "foo" exists'),
    ],
    definition: willSendHttpRequest({
        request: {
            method: 'GET',
            path: '/users/foo',
        },
        response: {
            status: 200,
            body: {
                userId: 'foo'
                name: 'john smith',
            },
        },
    }),
})
```

Additionally, you can override the configuration for this test by providing an optional `ContractCaseConfig` object as the final argument. See [the configuration options reference](/docs/reference/configuring) for details:

```ts
  await contract.runExample(
    {
      states: /* as above */
      definition: /* as above */
    },
    {
      logLevel: debug,
    }
  );
```  


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

See the [state handlers](/docs/reference/state-handlers) section for more on state handlers.



### Next steps

Next, set up your state [state definitions](./state-definitions). 