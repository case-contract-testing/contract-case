<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [internals](./case-definition-dsl.matchers.internals.md) &gt; [AnyMatcherWithExample](./case-definition-dsl.matchers.internals.anymatcherwithexample.md)

## matchers.internals.AnyMatcherWithExample class

The base class for all Test Equivalence Matchers that have examples provided. Extend this if your matcher knows what the example will be. Otherwise, use `matchers.AnyMatcher`

**Signature:**

```typescript
export declare abstract class AnyMatcherWithExample extends AnyMatcher
```

**Extends:** [AnyMatcher](./case-definition-dsl.matchers.internals.anymatcher.md)

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[(constructor)(matcherType, example)](./case-definition-dsl.matchers.internals.anymatcherwithexample._constructor_.md)

</td><td>

</td><td>

Constructs a new instance of the `AnyMatcherWithExample` class

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

[toJSON()](./case-definition-dsl.matchers.internals.anymatcherwithexample.tojson.md)

</td><td>

</td><td>

For non-TypeScript implementations (see `AnyMatcher.toJSON`<!-- -->)

</td></tr>
</tbody></table>