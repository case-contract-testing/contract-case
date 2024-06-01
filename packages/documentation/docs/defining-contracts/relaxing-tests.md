---
sidebar_position: 6
---

# Test data

By default, the data used in an example is strictly matched. However, this can be inconvenient for many provider teams. For example, sometimes it's not possible to know user IDs before the users have been created. Alternatively, it can be frustrating to have to maintain the exact same test data between the consumer test and the provider verification.

You can use [Test Equivalence Matchers](/docs/reference/matchers) and [state variables](./state-definitions)
to avoid needing to keep the test data in sync between the contract definition and verification.

## Test Equivalence Matchers

A test equivalence matcher says "this test is equivalent to one that passes this matcher"

For example, during a test for a client's getUser call, we might not mind what the
specific name of the user is, just that the user name was a valid, non-empty string.

At definition time, we need a specific example because we _do_ need to confirm that
we read it correctly in the `testResponse` function. However, we might not need to use the same example at verification time.

In the examples in the earlier sections, we used `john smith` as the example username.
At provider time, we would be happy to accept any example that was a string, and
we would be quite confident that the contract was still satisfied.

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
      body: {
        userId: stateVariable('userId'),
        name: anyString('John Smith')
      },
    },
  }),
  {
    trigger: (config: HttpRequestConfig) =>
      new YourApi(config.baseUrl).getUser(config.variables['userId']),

    testResponse: (user, config) => {
      expect(user).toEqual({
        userId: config.variables['userId'],
        name: 'John Smith'
      });
    },
  }
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

ContractCase has a number of convenience methods and approaches for writing tests concisely and without need for intensive maintenance effort. See the section on [convenient definitions](./convenient-definitions.md) for more information.

### Next steps

If you are defining a contract from an HTTP client, you will need to provide [triggers](/docs/reference/triggers) to allow ContractCase to invoke your code.

If you are defining a contract from an HTTP server, you will need to provide [state handlers](/docs/reference/state-handlers) to allow ContractCase to set up any preconditions.

Once you have created your contract, you'll want to [upload it to a broker](./brokers).
