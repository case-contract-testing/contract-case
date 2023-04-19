# Test Equivalence Matchers

:::caution DRAFT

While case is in beta, some of the documentation is incomplete or bullet points only. 

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

In ContractCase, a Test Equivalence Matcher makes the promise "this specific example covers all cases where the request / response / message (etc) passes this matcher"

These matchers aren’t for describing the entire request/response schema, they’re for making it easier to
write tests. They’re a convenience, so you don’t have to have the same exact
test data on both sides.
If you say `{ name: anyString("Steve")}`, you’re saying “this particular test case covers all possible responses where the name field is a string”