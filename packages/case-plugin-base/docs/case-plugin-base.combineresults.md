<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-plugin-base](./case-plugin-base.md) &gt; [combineResults](./case-plugin-base.combineresults.md)

## combineResults() function

> Warning: This API is now obsolete.
> 
> Prefer [combineResultPromises()](./case-plugin-base.combineresultpromises.md)
> 

Combines multiple [MatchResult](./case-plugin-base.matchresult.md) objects into one match result object

**Signature:**

```typescript
combineResults: (...results: MatchResult[]) => MatchResult
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

results


</td><td>

[MatchResult](./case-plugin-base.matchresult.md)<!-- -->\[\]


</td><td>

MatchResult or `Promise<MatchResult>` objects


</td></tr>
</tbody></table>

**Returns:**

[MatchResult](./case-plugin-base.matchresult.md)

combined Match Results.

