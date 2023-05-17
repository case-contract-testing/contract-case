# vs schema tests

:::caution INCOMPLETE DOCUMENT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

- Still need a way to know if the schemas used in each service deployed are compatible
- Need strict definitions of breaking changes
- Many schema expressibility problems:
  - Optional fields when presence actually depends on another field's value
  - Implied defaults meaning that a message might have a different meaning than expected
  - Just because a change isn't _schema_ breaking doesn't mean the two can communicate. Just because your service can parse a message without failing, it doesn't mean it understands it.
  - Sometimes "string" is used when the type is really `"admin" | "user"` - which means that `Administrator` would not be valid, but would pass the schema

The point of a contract test is to be certain that two services can communicate with each other. With a spec-driven approach, the best you can get is “they’re not definitely incompatible”
