<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [modifiers](./case-definition-dsl.matchers.modifiers.md) &gt; [ExactlyLike](./case-definition-dsl.matchers.modifiers.exactlylike.md) &gt; [(constructor)](./case-definition-dsl.matchers.modifiers.exactlylike._constructor_.md)

## matchers.modifiers.ExactlyLike.(constructor)

Everything inside this matcher will be matched exactly, unless overridden with a generic matcher (eg `AnyString` or` ShapedLike`<!-- -->). Use this to switch out of `shapedLike` and back to the default exact matching.

**Signature:**

```typescript
constructor(content: AnyMatcherOrData);
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

content

</td><td>

AnyMatcherOrData

</td><td>

The object, array, primitive or matcher to match exactly

</td></tr>
</tbody></table>
