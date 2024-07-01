<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [states](./case-definition-dsl.states.md) &gt; [InStateWithVariables](./case-definition-dsl.states.instatewithvariables.md) &gt; [(constructor)](./case-definition-dsl.states.instatewithvariables._constructor_.md)

## states.InStateWithVariables.(constructor)

Constructs a new state descriptor with the given variables.

**Signature:**

```typescript
constructor(stateName: string, variables: Record<string, AnyMatcherOrData>);
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

stateName

</td><td>

string

</td><td>

The name of the state used by this example. This must match one of the state handlers provided in the configuration during the example run.

</td></tr>
<tr><td>

variables

</td><td>

Record&lt;string, AnyMatcherOrData&gt;

</td><td>

A object where the keys are variable names, mapped to any data or matcher objects.

</td></tr>
</tbody></table>