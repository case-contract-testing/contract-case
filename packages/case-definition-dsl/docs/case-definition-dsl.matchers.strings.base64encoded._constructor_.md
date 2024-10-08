<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [strings](./case-definition-dsl.matchers.strings.md) &gt; [Base64Encoded](./case-definition-dsl.matchers.strings.base64encoded.md) &gt; [(constructor)](./case-definition-dsl.matchers.strings.base64encoded._constructor_.md)

## matchers.strings.Base64Encoded.(constructor)

Transformation matcher that matches a base64 encoded version of the given string or string matcher

WARNING: Since many strings are accidentally decodable as base64, this matcher is best combined with a more restrictive string matcher (eg `StringifiedJson`<!-- -->).

**Signature:**

```typescript
constructor(child: AnyMatcherOrData);
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

child

</td><td>

AnyMatcherOrData

</td><td>

The string or string matcher that would match the decoded string

</td></tr>
</tbody></table>
