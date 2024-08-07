<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [mocks](./case-definition-dsl.mocks.md) &gt; [base](./case-definition-dsl.mocks.base.md) &gt; [ContractCaseCoreBehaviour](./case-definition-dsl.mocks.base.contractcasecorebehaviour.md) &gt; [triggers](./case-definition-dsl.mocks.base.contractcasecorebehaviour.triggers.md)

## mocks.base.ContractCaseCoreBehaviour.triggers property

Whether or not this mock mode needs to be triggered by user-provided code. If `"provided"` then ContractCase will require the user to provide a trigger and a test function (eg, for testing an HTTP Client, code that will invoke it must be provided). If `"generated"`<!-- -->, then ContractCase will not require user provided triggers as it will generate them (eg, if the system under test is an HTTP server, ContractCase will generate client calls).

**Signature:**

```typescript
readonly triggers: string;
```
