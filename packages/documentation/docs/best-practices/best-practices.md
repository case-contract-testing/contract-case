---
sidebar_position: 6
---

# Best Practices

:::caution INCOMPLETE DOCUMENT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

## General API design

- Separate your API code from the code that needs it (eg your UI code)so that:
  - You can comfortably call it from tests.
  - You can inject configuration parameters (eg baseURL for http APIs)
  - Don't emit API specific types (eg http Response objects from your API).
    your API should unbox and handle the response object, and return a business object instead.

## Use of ContractCase

- Use the same objects you test in your `testResponse` and `testErrorResponse` code in any tests that mock your API code.
- ContractCase is not a full description of the entire API - it is a description of only the bits your consumer needs to operate.
- ContractCase is not a substitute for communicating with other teams
