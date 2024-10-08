<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [convenience](./case-definition-dsl.matchers.convenience.md) &gt; [WithExample](./case-definition-dsl.matchers.convenience.withexample.md)

## matchers.convenience.WithExample class

Adds an example to the provided matcher. Useful when you have a complicated set of constraints and ContractCase can't figure out what the best example should be.

Note that providing any example will override examples provided further down the tree.

**Signature:**

```typescript
export declare class WithExample extends CascadingContextMatcher
```

**Extends:** CascadingContextMatcher

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[(constructor)(matcher, example)](./case-definition-dsl.matchers.convenience.withexample._constructor_.md)

</td><td>

</td><td>

Adds an example to the provided matcher. Useful when you have a complicated set of [matchers.convenience.And](./case-definition-dsl.matchers.convenience.and.md) constraints and ContractCase can't figure out what the best example should be.

Note that providing any example will override examples provided further down the tree.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[toJSON()](./case-definition-dsl.matchers.convenience.withexample.tojson.md)

</td><td>

</td><td>

For non-TypeScript implementations (see `AnyMatcher.toJSON`<!-- -->)

</td></tr>
</tbody></table>
