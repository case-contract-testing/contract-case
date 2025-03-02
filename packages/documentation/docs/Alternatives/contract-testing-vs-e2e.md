# vs end-to-end tests

If you want to do end-to-end tests for confidence that you can safely deploy
service X, then you need to do an end-to-end test with exactly what will be in
production at the time that service X will deploy.

Most teams doing end-to-end tests at scale keep a copy of the production
environment they can stage their deployments in.
This staging environment is usually not exactly the same asa
what will be in production at deployment time - as other teams may be staging releases at the same time.

This means that full confidence is usually impractical - if you wanted to do a
full deploy confidence test, you'd need to freeze the environment (and any other
deploys) each time you want to try to deploy something. Then you'd run all the tests, and if they passed, you could
only unfreeze the environment once the service has
been deployed to production. If the tests fail, you'd have to roll back staging
to the copy of production again, and try the next service. For most teams, this turns out to be prohibitively expensive.

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
