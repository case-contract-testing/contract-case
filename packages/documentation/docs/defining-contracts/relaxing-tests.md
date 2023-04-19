---
sidebar_position: 6
---


# Introduction to Test Equivalence Matchers

When the contract is run against the provider, it's nice if the test data
doesn't have to match exactly. This means that you don't have to keep test data
in sync between the contract definition and the contract verification. You can
use [Test Equivalence Matchers](/docs/reference/matchers) and [state variables](./state-definitions)
to do this.

## Test Equivalence Matchers

For example, during a test for a client's getUser call, we don't mind what the
specific name of the user is. We just need an example because we _do_ need to confirm that
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

## Parametrising the test with state variables

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
        // inState(
        //    stateName: string, 
        //    defaultValues: Record<string, AnyConstraintOrData>
        // )
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


### Improving your contract

ContractCase has a number of convenience methods and approaches for writing tests concisely and without need for intensive maintenance effort.
See the [convenience methods for easy contract writing](/docs/best-practices/convenient-definitions) section if you'd like to read more.

### Next steps

If you are defining a contract from an HTTP client, you will need to provide [triggers](/docs/reference/triggers) to allow ContractCase to invoke your code.

If you are defining a contract from an HTTP server, you will need to provide [state handlers](/docs/reference/state-handlers) to allow ContractCase to set up any preconditions.

Once you have created your contract, you'll want to [upload it to a broker](./brokers).
