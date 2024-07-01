<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [arrays](./case-definition-dsl.matchers.arrays.md) &gt; [ArrayLengthOptions](./case-definition-dsl.matchers.arrays.arraylengthoptions.md)

## matchers.arrays.ArrayLengthOptions interface

Options for the `ArrayLength` matcher

**Signature:**

```typescript
export interface ArrayLengthOptions
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

[maxLength?](./case-definition-dsl.matchers.arrays.arraylengthoptions.maxlength.md)

</td><td>

`readonly`

</td><td>

number

</td><td>

_(Optional)_ The maximum length for the array - must be greater than minimum length

Default infinity.

</td></tr>
<tr><td>

[minLength?](./case-definition-dsl.matchers.arrays.arraylengthoptions.minlength.md)

</td><td>

`readonly`

</td><td>

number

</td><td>

_(Optional)_ The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents.

Default 1.

</td></tr>
</tbody></table>