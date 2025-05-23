<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [interactions](./case-definition-dsl.interactions.md) &gt; [base](./case-definition-dsl.interactions.base.md) &gt; [AnyInteractionDescriptor](./case-definition-dsl.interactions.base.anyinteractiondescriptor.md)

## interactions.base.AnyInteractionDescriptor class

The base class for all ContractCase Mock Descriptors. Extend this if you are implementing your own mock type.

If you are using the included example types from ContractCase (or any extension libraries), you do not need to read the documentation for this class.

Mock description type strings beginning with `_case:` are reserved for the default ContractCase matchers. Only use a types prefixed with `_case:` if you wish to create a DSL for a special case for a matching behaviour that is already provided by a core ContractCase mock.

**Signature:**

```typescript
export declare abstract class AnyInteractionDescriptor
```

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[(constructor)(mockType, setup)](./case-definition-dsl.interactions.base.anyinteractiondescriptor._constructor_.md)

</td><td>

</td><td>

The base class for all ContractCase Mock Descriptors. Extend this if you are implementing your own mock type.

If you are using the included example types from ContractCase (or any extension libraries), you do not need to read the documentation for this class.

Mock description type strings beginning with `_case:` are reserved for the default ContractCase matchers. Only use a types prefixed with `_case:` if you wish to create a DSL for a special case for a matching behaviour that is already provided by a core ContractCase mock.

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

[stringify()](./case-definition-dsl.interactions.base.anyinteractiondescriptor.stringify.md)

</td><td>

</td><td>

This method returns the entire example as a JSON string, as a convenience so that wrapper libraries don't need to figure out how to walk a tree of example objects.

You shouldn't need to override this method.

</td></tr>
<tr><td>

[toJSON()](./case-definition-dsl.interactions.base.anyinteractiondescriptor.tojson.md)

</td><td>

</td><td>

Only override this method if you are writing a matcher in a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

It isn't called by any implementation directly, it's used on the javascript side by `JSON.stringify()`<!-- -->.

Calling it from a wrapper library will return unhelpful results, as JSii can't map all objects that it returns.

WARNING: Do not return a string from this method. You must instead return an object that can be serialised to JSON following the matcher format described in \[Extending ContractCase\](https://case.contract-testing.io/docs/reference/plugin-framework).

</td></tr>
</tbody></table>
