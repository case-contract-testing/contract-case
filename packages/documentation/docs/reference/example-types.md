---
sidebar_position: 3
---

# ContractCase Example Types

This document describes the different ContractCase Example types, and which lifecycle steps apply to each.

:::caution DRAFT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

When an HTTP client is under test (either writing the contract, or reading a contract from a server)

- No state handlers, state variables are defaults
- Triggers and testResponse functions need to be provided

When an HTTP server is under test (either writing the contract, or reading a contract from a server)

- State handlers must be provided
- No triggers or testResponse functions are needed (ContractCase generates these)
