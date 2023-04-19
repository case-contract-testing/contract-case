# vs end-to-end tests

:::caution INCOMPLETE DOCUMENT

While case is in beta, some of the documentation is incomplete or bullet points only. 

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

If you want to do end-to-end tests for confidence that you can safely deploy
service X, then, you need to do an end-to-end test with exactly what will be in
production at the time that service X will deploy. Most teams doing this at
scale keep a copy of th production environment, which is usually not the same
as what will be in production at deployment time (because of other deployments
and race conditions in the pipeline).

Additionally, contract testing has the following advantages:

- Significantly faster turnarounds. A contract test is run during the build of each separate service, asynchronously.
- No need to do expensive or time-costly deployments
- No need to book environments or block other teams
- Clear indication of what is broken if there is a contract problem, whereas
  when an end-to-end test fails, it can be time consuming to find out what broke

End to end testing provides the following advantages over contract testing:

- Functional tests
- (in some circumstances) Ability to test configuration errors (eg, an incorrect base URL for a dependency)

Contract testing doesn't obviate the need for end-to-end tests, but it can make them significantly cheaper, as you can do light touch feature tests instead of needing to exercise the entire contract.
 