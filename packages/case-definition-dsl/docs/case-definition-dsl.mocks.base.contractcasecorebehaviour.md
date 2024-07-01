<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [mocks](./case-definition-dsl.mocks.md) &gt; [base](./case-definition-dsl.mocks.base.md) &gt; [ContractCaseCoreBehaviour](./case-definition-dsl.mocks.base.contractcasecorebehaviour.md)

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

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[mockType](./case-definition-dsl.mocks.base.contractcasecorebehaviour.mocktype.md)

</td><td>

`readonly`

</td><td>

string

</td><td>

The type of this mock. Usually this is inverted on read vs write, for example, a written MOCK_HTTP_CLIENT might become a MOCK_HTTP_SERVER during reading.

This will almost always be the same as the top level type for your mock during read - but if it is different, ContractCase will respect this value.

</td></tr>
<tr><td>

[stateVariables](./case-definition-dsl.mocks.base.contractcasecorebehaviour.statevariables.md)

</td><td>

`readonly`

</td><td>

string

</td><td>

Whether or not this mock mode will invoke state handlers. If set to `"default"` then ContractCase will not invoke or require the state handlers and will use the default values for all state variables. If set to `"state"`<!-- -->, then ContractCase will invoke the state handlers and require the expected variables to be returned.

All other values are errors.

</td></tr>
<tr><td>

[triggers](./case-definition-dsl.mocks.base.contractcasecorebehaviour.triggers.md)

</td><td>

`readonly`

</td><td>

string

</td><td>

Whether or not this mock mode needs to be triggered by user-provided code. If `"provided"` then ContractCase will require the user to provide a trigger and a test function (eg, for testing an HTTP Client, code that will invoke it must be provided). If `"generated"`<!-- -->, then ContractCase will not require user provided triggers as it will generate them (eg, if the system under test is an HTTP server, ContractCase will generate client calls).

</td></tr>
</tbody></table>