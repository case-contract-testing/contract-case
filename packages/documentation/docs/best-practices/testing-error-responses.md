# Testing error responses

:::caution DRAFT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

- Don't pass back API framework error responses out of your client code, wrap them in a business error. For example, instead of throwing an HTTP 404 error from an HTTP client, instead throw a custom business error type like `UserNotFound`.
