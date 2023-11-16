# Service State Best Practices

:::caution INCOMPLETE DRAFT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

This document is intended for people who already know [how to write state handlers](/docs/reference/state-handlers), and want to improve the way their state handlers are written.

When setting up a state handler, you may need to mock some of your service state. This document discusses the advantages of different options.

- If you mock at the controller, you only know that the service might produce the response you want, not that it actually does in at least one case
- If you insert into the database, your state setup knows too much about the database structure (which will be a pain to maintain, and you have the reverse problem, where you don’t know if that data ever gets in to the database).
- If you mock at the repository layer, then your mock is simple as it is expressed in domain concepts: when `"user '10' exists"` then `repo.getUser('10')` returns `<whatever>` etc, robust to implementation changes of the repository layer, and also those mocks can be used to check the contract tests for that layer too.

The argument for mocking at the controller is so that you don’t start driving
functional tests with your contract tests. Functional tests shouldn’t be driven
by your contract tests (this is also a maintenance issue, where the consumer
knows too much about the provider’s behaviour). It’s an advantage if your
contract tests have some functional coverage, where they would fail if that
specific behaviour broke.
