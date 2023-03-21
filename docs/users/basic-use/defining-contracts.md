# Defining contracts

In Case, a contract is a series of examples, not a specification. Each example
is independent. To achieve this independence, any preconditions are handled by
state setup functions.

Case has two main modes of running tests:

- **Contract Definition** - in which you define a number of case examples, and test
  them against one side of the communication boundary. If you are testing an http
  client, contract definition means that you write a series of request and
  response pairs, and you ensure that your client can send the defined requests,
  and understand the defined responses. Or, if you are defining a contract for an http
  server, you would still write a series of request and response pairs, but then
  you would confirm that your server can understand those requests, and can
  generate those responses.
- **Contract Verification** - During contract verification, you take a list of
  examples (the contract file) written by a service that your service communicates
  with, and you confirm that it meets the expectations of the contract.
  Together, these form two halves of the same test. With an HTTP client
  defining the contract, in contract _definition_ you confirm that the client can
  generate a specific request, and understand a particular response. In contract
  _verification_ you confirm that the server can understand the request, and
  generate a particular response.

This document describes how to write contracts, and details the lifecycle of an example
during contract definition. If you already have a contract,
and you want to know how to verify
it, you can skip to [contract verification](./verifying-contracts.md).

## Creating a contract:

A contract starts with a `defineContract` call. For example, in Jest, it might look like:

```ts
defineContract(
  {
    consumerName /* The name of the service writing the contract */,
    providerName /* The name of the service that will verify the contract */,
    config: {
      /* Any additional CaseConfig */
    },
  },
  (contract: ContractDefiner) => {
    describe('some API method', () => {
      describe('with a valid access token', () => {
        it('behaves as expected', async () => {
          await contract.runExample(/* described below */);
        });
      });

      describe('with no access token', () => {
        it('throws an error', async () => {
          await contract.runRejectingExample(/* described below */);
        });
      });
    });
    /* arbitrary other contract examples */
  }
);
```

In a contract, you can have as many `runExample` and `runRejectingExample`
calls as you like. When all the tests are over, Case will write the contract to
disk (this is handle automatically by the `defineContract` DSL).

> Note: If you are coming from other contract testing frameworks like Pact, be
> aware that a Consumer is Case is not always a synonym for "client", and
> provider is not always a synonym for "server". For example, you
> might be writing the contract on the server side, which means you are defining
> the consumer of HTTP requests, not the consumer of responses.

Next, we will discuss how to define examples inside `runExample` and `runRejectingExample`

## Lifecycle of an Example

The general lifecycle for all Case Examples is:

1. Define example
2. Set up mock
   1. Call state setup handlers (if any)
3. Invoke `trigger` to call mock
   1. Compare mock expectations
   2. Return appropriate response
4. Invoke `testResponse` or `testErrorResponse` function
5. If everything was successful, record successful example in contract.
   If any of the steps or comparisons failed, the whole contract is failed.
   1. Call state teardown handlers (if any)
6. (Later, at the provider side, during verification) re-run steps 2-5.

Case handles most of the lifecycle for you. Not all Case Example types need to have all
lifecycle steps defined by the user - for example, Case defines and invokes its
own triggers when testing HTTP servers. For information on which lifecycle you
should define in each Case Example type, see the [example types](./example-types.md) documentation.

## Defining an example

In Case, a contract is a series of examples. Each example is independent - for
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
                        // that your consumer actually needs.
                        // The real response might have more elements,
                        // but if your consumer doesn't need them,
                        // don't put them in the contract.
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

See below for more on state handlers.

### Testing a success response

If we define this example at the client side, we will also need a trigger, and a way to test the response object:

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
    // The trigger is the invocation of your client code
    // It receives some configuration with details of how to contact the mock
    // This function should return the business object that your API returns
    trigger: (config: HttpRequestConfig) =>
        new YourApi(config.baseUrl).getUser('foo'),
    // The testResponse function is used to check the business object.
    // This is an important step, as without it, Case can't be sure that your
    // calling code can understand the objects that your code is generating.
    //
    // It receives the object that was returned by your trigger
    // If your trigger throws an error, the test will fail
    testResponse: (user) => {
        expect(user).toEqual({ userId: 'foo', name: 'john smith' });
    }
})
```

### Testing a failed response

If your API is expected to throw an error during the invocation, then you should use `runRejectingExample` instead of `runExample`, and use `testErrorResponse` instead of `testResponse`:

```ts
await contract.runRejectingExample({
  states: [inState('Server is up'), inState('No users exist')],
  definition: willSendHttpRequest({
    request: {
      method: 'GET',
      path: '/users/foo',
    },
    response: {
      status: 404,
    },
  }),
  // The trigger is the invocation of your client code
  // It receives some configuration with details of how to contact the mock
  // This function should return the business object that your API returns
  trigger: (config: HttpRequestConfig) =>
    new YourApi(config.baseUrl).getUser('foo'),
  // The testErrorResponse function is used to check the business object.
  // This is an important step, as without it, Case can't be sure that your
  // calling code can understand the objects that your code is generating.
  //
  // It receives the object that was thrown by your trigger.
  // If your trigger does not throw an error, the test will fail
  testErrorResponse: (e) => {
    expect(e).toBeInstanceOf(UserNotFoundError);
  },
});
```

Triggers and `testResponse`/`testErrorResponse` functions are not written to the contract.

### Making it easy on the provider team

When the contract is run against the provider, it's nice if the test data
doesn't have to match exactly. This means that you don't have to keep test data
in sync between the contract definition and the contract verification. You can
use [Test Equivalence Matchers](./matchers.md) and [state variables](./state-handlers.md)
to do this.

### Relaxing the constraints with test equivalence matchers

For example, during our consumer test, we don't mind what the name of the user
is. We just need an example because we _do_ need to confirm that
we read it correctly in the `testResponse` function. In our case, we used `john smith`.
At provider time, we would be happy to accept any example that was a string, and
we would be quite confident that we are still contract compliant.

We can express this with the `anyString(example?: string)` Test Equivalence Matcher:

```ts
body: {
    userId: 'foo'
    // You can read this as
    //   "this test covers any name property that is a string (eg 'john smith').
    name: anyString('john smith'),
},
```

### Parametrising the test with state variables

Sometimes, there are constraints on the provider team that are hard to know from
the consumer side. For example, perhaps their test data is constrained in some
way, and so it is hard to set up a user with the ID `'foo'`. To allow them to
specify some of the state, state variables can be used. Instead of:

```ts
        inState('A user with id "foo" exists'),
```

you can provide a state variable (and a default value) by providing an object
keyed by the variable name:

```ts
        // inState(stateName: string, defaultValues: Record<string, AnyConstraintOrData>)
        inState('A user exists', { userId: '123' }),
```

This can later be accessed using the `stateVariable(name: string)` Test
Equivalence Matcher. You can also access the variables using the config object passed
to the `trigger` and `testResponse` functions:

```ts
await contract.runExample({
  states: [
    inState('Server is up'),
    inState('A user exists', { userId: '123' }),
  ],
  definition: willSendHttpRequest({
    request: {
      method: 'GET',
      path: '/users',
      query: { id: stateVariable('userId') },
    },
    response: {
      status: 200,
      body: responseBody,
    },
  }),

  trigger: (config: HttpRequestConfig) =>
    new YourApi(config.baseUrl).getUser(config.variables['userId']),

  testResponse: (user, config) => {
    expect(user).toEqual({
      userId: config.variables['userId'],
    });
  },
});
```

The default value passed to the state variable can be a Test Equivalence Matcher, so you could add additional constraints:

```ts
inState('a user has a score that is an integer', { userScore: anyInteger(10) });
```

This would prevent the state handler from returning any `userScore` value that doesn't pass the `anyInteger` constraint.

> Note: Remember that the goal here is not to describe the API, it's to describe the
> constraints of the service defining the contract. So, if the `userScore` field
> _is_ an integer, but the client would actually be happy with any number, you don't need to constrain it.

As a convenience, all default values passed to state variables are automatically
wrapped in a `shapedLike()` constraint. This means that `userId: 'foo'` will
accept any `string` value, and not just the exact string `'foo'`.

### Next steps

Case has a number of convenience methods and approaches for writing tests concisely and without need for intensive maintenance effort.
See the [convenience methods for easy contract writing](/docs/users/intermediate-use/convenient-definitions.md) section if you'd like to read more.

Once you have created your contract, you'll want to [upload it to a broker](./brokers.md).
