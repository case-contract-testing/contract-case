<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [convenience](./case-definition-dsl.matchers.convenience.md) &gt; [ChangeLogLevel](./case-definition-dsl.matchers.convenience.changeloglevel.md)

## matchers.convenience.ChangeLogLevel class

Alters the ContractCase log level below this matcher. Useful for debugging.

This has no effect on matching.

Note that this log level matcher will be saved into the contract, so it will also affect the log level during verification. Usually you will want to remove the use of this matcher before saving the contract.

**Signature:**

```typescript
export declare class ChangeLogLevel extends CascadingContextMatcher
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

[(constructor)(logLevel, child)](./case-definition-dsl.matchers.convenience.changeloglevel._constructor_.md)

</td><td>

</td><td>

Alters the ContractCase log level below this matcher. Useful for debugging.

This has no effect on matching.

Note that this log level matcher will be saved into the contract, so it will also affect the log level during verification. Usually you will want to remove the use of this matcher before saving the contract.

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

[toJSON()](./case-definition-dsl.matchers.convenience.changeloglevel.tojson.md)

</td><td>

</td><td>

For non-TypeScript implementations (see `AnyMatcher.toJSON`<!-- -->)

</td></tr>
</tbody></table>
