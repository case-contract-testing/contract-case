<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-plugin-base](./case-plugin-base.md) &gt; [MatcherExecutor](./case-plugin-base.matcherexecutor.md)

## MatcherExecutor interface

A MatcherExecutor contains the three functions needed to execute a matcher descriptor during a run.

**Signature:**

```typescript
export interface MatcherExecutor<MatcherType extends string, T extends IsCaseNodeForType<MatcherType>> 
```

## Remarks

All functions must have no side effects.

See the individual function types for more details.

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

[check](./case-plugin-base.matcherexecutor.check.md)


</td><td>


</td><td>

[CheckMatchFn](./case-plugin-base.checkmatchfn.md)<!-- -->&lt;T&gt;


</td><td>

Checks the matcher against some actual data


</td></tr>
<tr><td>

[describe](./case-plugin-base.matcherexecutor.describe.md)


</td><td>


</td><td>

[NameMatcherFn](./case-plugin-base.namematcherfn.md)<!-- -->&lt;T&gt;


</td><td>

Describes the matcher descriptor in english


</td></tr>
<tr><td>

[strip](./case-plugin-base.matcherexecutor.strip.md)


</td><td>


</td><td>

[StripMatcherFn](./case-plugin-base.stripmatcherfn.md)<!-- -->&lt;T&gt;


</td><td>

Strips the matchers from this descriptor, returning example data


</td></tr>
<tr><td>

[validate](./case-plugin-base.matcherexecutor.validate.md)


</td><td>


</td><td>

[ValidateMatcherFn](./case-plugin-base.validatematcherfn.md)<!-- -->&lt;T&gt;


</td><td>

Validate the configured arguments of this matcher


</td></tr>
</tbody></table>

