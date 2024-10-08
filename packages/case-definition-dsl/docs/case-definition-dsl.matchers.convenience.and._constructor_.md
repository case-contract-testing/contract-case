<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [convenience](./case-definition-dsl.matchers.convenience.md) &gt; [And](./case-definition-dsl.matchers.convenience.and.md) &gt; [(constructor)](./case-definition-dsl.matchers.convenience.and._constructor_.md)

## matchers.convenience.And.(constructor)

Matches all of the provided matchers. Useful for combining restrictions provided by different matchers, or creating new matchers without needing plugins.

For best results, wrap the And matcher in a WithExample matcher.

**Signature:**

```typescript
constructor(matchers: AnyMatcherOrData[]);
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

matchers

</td><td>

AnyMatcherOrData\[\]

</td><td>

An array of the matchers to run against this particular spot in the tree

</td></tr>
</tbody></table>
