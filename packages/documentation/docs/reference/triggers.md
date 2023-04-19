# Triggers, testResponse and testErrorResponse functions

If ContractCase needs to invoke your code during a test, then you will need to define a `trigger`, and either a `testResponse` or `testErrorResponse` function.

You will need a trigger function if your test requires a function or method call
to kick off your consumer test (eg, if you are writing a contract for an HTTP
client). If you're writing a contract for a consumer that is externally called
(for example, if the code under test is an HTTP server), then you will need
triggers at verification time. For more details, check the [ContractCase Example
Types](/docs/reference/example-types) documentation.

## Definitions

```ts
type TriggerFunction = <TriggerReturnType>(config: MockConfig): TriggerReturnType
```

The trigger function is called by case. You should call your real client code
here, and return the response that your client returns. The `MockConfig` object
contains the details of the mock that ContractCase has set up. `TriggerReturnType` is an
implicit type parameter, and is only used to type `testResponse`


```ts
testResponse = 
    (response: TriggerReturnType, config: MockConfig) 
       => Promise<unknown> | void
```

In this function you test the response object that your trigger returns. It is
separate from the trigger because it is called at a different part of the [ContractCase
Example Lifecycle](/docs/defining-contracts/lifecycle), and to help ensure that
you have confirmed that your code can understand the response. For more on this,
see the best practices section on [confirming that your code understands the
response](/docs/best-practices/confirm-understood-responses).

```ts
testErrorResponse: (error: Error, config: MockConfig): Promise<unknown> | void
```

This is equivalent to the `testResponse` function, but for `trigger` calls that are expected to fail with an error. See the [testing API error responses](/docs/best-practices/testing-error-responses) section for best practices.

## Providing triggers during contract definition

There are three ways to provide triggers during contract definition:

1. If your trigger is expected to return successfully, use `trigger` and `testResponse` in a `runExample` call
2. If your trigger is expected to throw an error (or reject a promise), use `trigger` and `testErrorResponse` in a `runRejectingExample` call
3. In a `triggers` object passed in the [ContractCaseConfig](./configuring), describing multiple triggers and test functions (see the section on contract verification below).

### With `runExample`

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
    // This is an important step, as without it, ContractCase can't be sure that your
    // calling code can understand the objects that your code is generating.
    //
    // It receives the object that was returned by your trigger
    // If your trigger throws an error, the test will fail
    testResponse: (user) => {
        expect(user).toEqual({ userId: 'foo', name: 'john smith' });
    }
})
```

### With `runRejectingExample`

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
  // This is an important step, as without it, ContractCase can't be sure that your
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

## Providing triggers in contract verification



### In CaseConfig

In both contract definition and contract verification, you can provide a `triggers` object to your `CaseConfig`.

This is an object keyed by request name, where each value is of type:

```ts
{
   trigger: TriggerFunction;
   testResponses: Record<string, TestResponseFunction>;
   testErrorResponses: Record<string, TestErrorResponseFunction>
}
```


If you provide this `triggers` object, ContractCase will first find the request trigger,
then find the matching `testResponse` or `testErrorResponse` function associated
with that trigger. The test functions are associated with the trigger because
sometimes the same response needs to be tested differently when it is received by
different triggers.

```ts
    triggers: {
        'an http "GET" request to "/health" without a body': {
          trigger: (config: HttpRequestConfig) => api(config.baseUrl).health(),
          testResponses: {
            'a (200) response with body an object shaped like {status: "up"}': (
              health
            ) => {
              expect(health).toEqual('up');
            },
            'a (200) response with body an object shaped like {status: <any string>}':
              (health) => expect(typeof health).toBe('string'),
          },
          testErrorResponses: {
            'a (httpStatus 4XX | 5XX) response without a body': (e) => {
              expect(e).toBeInstanceOf(ApiError);
            },
            'a (503) response with body an object shaped like {status: "down"}':
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              },
          },
        },
        'an http "GET" request to "/health" with the following headers {accept: "application/json"} without a body':
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).health(),
            testResponses: {
              'a (200) response with body an object shaped like {status: "up"}':
                (health) => {
                  expect(health).toEqual('up');
                },
            },
          },
    },
```
