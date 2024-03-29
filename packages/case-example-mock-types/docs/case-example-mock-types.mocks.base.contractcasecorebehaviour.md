<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-example-mock-types](./case-example-mock-types.md) &gt; [mocks](./case-example-mock-types.mocks.md) &gt; [base](./case-example-mock-types.mocks.base.md) &gt; [ContractCaseCoreBehaviour](./case-example-mock-types.mocks.base.contractcasecorebehaviour.md)

## mocks.base.ContractCaseCoreBehaviour interface

This type defines the core behaviour that ContractCase has with this mock.

If you are using the included example types from ContractCase (or any extension libraries), you do not need to use this class (or understand this documentation).

This documentation is only necessary for people extending ContractCase to include new mock types.

See the definitions in the case-entities-internal package for more details.

**Signature:**

```typescript
export interface ContractCaseCoreBehaviour
```

## Properties

| Property                                                                                           | Modifiers             | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------- | --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mockType](./case-example-mock-types.mocks.base.contractcasecorebehaviour.mocktype.md)             | <code>readonly</code> | string | <p>The type of this mock. Usually this is inverted on read vs write, for example, a written MOCK_HTTP_CLIENT might become a MOCK_HTTP_SERVER during reading.</p><p>This will almost always be the same as the top level type for your mock during read - but if it is different, ContractCase will respect this value.</p>                                                                                                                                                                         |
| [stateVariables](./case-example-mock-types.mocks.base.contractcasecorebehaviour.statevariables.md) | <code>readonly</code> | string | <p>Whether or not this mock mode will invoke state handlers. If set to <code>&quot;default&quot;</code> then ContractCase will not invoke or require the state handlers and will use the default values for all state variables. If set to <code>&quot;state&quot;</code>, then ContractCase will invoke the state handlers and require the expected variables to be returned.</p><p>All other values are errors.</p>                                                                              |
| [triggers](./case-example-mock-types.mocks.base.contractcasecorebehaviour.triggers.md)             | <code>readonly</code> | string | Whether or not this mock mode needs to be triggered by user-provided code. If <code>&quot;provided&quot;</code> then ContractCase will require the user to provide a trigger and a test function (eg, for testing an HTTP Client, code that will invoke it must be provided). If <code>&quot;generated&quot;</code>, then ContractCase will not require user provided triggers as it will generate them (eg, if the system under test is an HTTP server, ContractCase will generate client calls). |
