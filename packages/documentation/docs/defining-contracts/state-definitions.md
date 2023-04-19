---
sidebar_position: 5
---
# Defining service states

Since each Example in ContractCase is defined and verified independently, you may need to indicate preconditions that must be true for the example to be valid. This is done using service states.

Each state is identified with a name string. The best practice is to use a human
readable, descriptive string - for example: 

```ts
    inState('Server is up'),
    inState('A user with id "foo" exists'),
```

There are two parts to service states: 

1. **State definitions** - A state definition indicates the need for a precondition with the `inState()` DSL function at contract definition time (like the example above)
2. **State handlers** - A state handler is a function keyed by the state name that can be called to set up the service in that state.

Whether or not you also need to provide a state handler depends on the Example type that
you're defining. For example, with HTTP Examples, state handlers are only
required at the server side. So: 

* A contract defined by an HTTP client will need state handlers during contract verification.
* A contract defined by an HTTP server will need state handlers during contract definition.

For a full list of the Example types and when state handlers are required, see [the Example types reference](/docs/reference/example-types). ContractCase will warn helpfully if you need state handlers and do not provide them.

## Order of execution

States are guaranteed to be executed in the order that the states are defined in the Example:

```ts
await contract.runExample({
    states: [
        inState('Server is up'), // This one runs first
        inState('A user with id "foo" exists'), // This one runs second
    ],
    ...
});
```

## State definition types

There are two types of state definitions - name-only states and states with
variables. 

### Name-only states

The state name describes the precondition needed for your Example to be valid. It is used as a key between the consumer and the provider to set up the preconditions.

Good state names are short, but descriptive. It should be possible to read the
state name and know what the precondition is. For example, the state "a user
with id='foo' exists" implies that there's a user object retrievable with
id=`'foo'`. If your example needs additional properties on that user, you should ideally include it in the state name (eg `"a user with id 'foo' who has purchased some books"`).

State names need to be shared between the consumer and provider teams.
### States with variables

Sometimes it's not possible to predict the result of 
a precondition - for example, it's not always possible to know what user ID the next created user will have. In these cases, 
cases, the state handler can return variables.

States with variables are an extension of name-only states - they have
all of the same properties as name-only states, but can return variables too:


To define a state with variables, provide an object keyed by variable names, where the values are the default values for the variables:

```
    inState('A user exists', { userId: 'foo' }),
```

This defines a state with the name `"A user exists"`, which is expected to
return a variable called `userId`. The default value for this variable is
`"foo"`, which will be used when state handlers are not used (for example, in
HTTP contracts, state handlers are only used to set up preconditions for the
server. When the HTTP client is under test, the default state variables are
used).

Defaults are not constrained to be primitive types, but it is generally best practice to avoid passing complicated objects. 


:::tip
The default variable value is _also_ a matcher, automatically wrapped in
`shapedLike()`. This will be checked against the variable returned by the state
handler later, so a default value of `"foo"` will not match `12`, as a number
does not match the string provided in the variable. Defaults are not constrained
to be primitive types, but generally. 
:::

These state variables are available via the `stateVariable()` test equivalence matcher:

```ts
await contract.runExample({
    states: [
        inState('Server is up'),
        inState('A user exists', { userId: '123' }),
    ],
    definition: willSendHttpRequest({
        request: {
        method: 'GET',
        path: stringPrefix('/users/', stateVariable('userId')),
        },
        response: {
        status: 200,
        body: responseBody,
        },
    }),
    /* ... */
});
```

### Next steps

Next, read about how to [relax the test constraints](./relaxing-tests) to make it easy for your contract to be verified.