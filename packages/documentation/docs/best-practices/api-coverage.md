# Contract testing and coverage

:::caution INCOMPLETE DOCUMENT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

- Because not all API client code will be 100% covered during a contract test. For example, your API client might handle unexpected error scenarios that the server never produces
- Unit test coverage tools will have full coverage of some parts of the communication code.
- Contract testing only covers what the consumer is using
