<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [mocks](./case-definition-dsl.mocks.md) &gt; [base](./case-definition-dsl.mocks.base.md) &gt; [ContractCaseCoreBehaviour](./case-definition-dsl.mocks.base.contractcasecorebehaviour.md) &gt; [mockType](./case-definition-dsl.mocks.base.contractcasecorebehaviour.mocktype.md)

## mocks.base.ContractCaseCoreBehaviour.mockType property

The type of this mock. Usually this is inverted on read vs write, for example, a written MOCK_HTTP_CLIENT might become a MOCK_HTTP_SERVER during reading.

This will almost always be the same as the top level type for your mock during read - but if it is different, ContractCase will respect this value.

**Signature:**

```typescript
readonly mockType: string;
```
