In [contract definition](../defining-contracts/), we produced a contract made of expected request / response pairs,
and confirmed that the consumer works correctly if those expectations are met by the provider.

Contract **verification** (described in this section) confirms that the provider
actually meets those expectations. The output of contract verification is
the information that this version of the provider is compatible with the consumer(s)
which generated the contract.

:::tip What does verification mean?
Because contract verification checks that a provider meets the expectations of a given contract,
you can think of contract verification as asking "can these two services communicate with each other?"
:::

Because contracts often don't change between versions, it's normal for multiple
versions of the consumer to be covered by one contract. You don't need to
de-duplicate contracts - ContractCase will hash them for you automatically.

Note that by default during verification, a failed verification doesn't
throw an error, but failed configuration or core bugs will. This is
the intended default behaviour - as a failed verification doesn't
necessarily indicate a problem in the code that is being verified, it might
be an expectation that is just not implemented yet, or it might be an old
contract.

## Multiple verifications.

Even if you have only one consumer,
It's common to verify more than one contract at once - usually you want the
contracts currently deployed in each environment, and the last N versions (to enable safe rollbacks). For convenience, ContractCase will verify all available contracts for the configured
provider during a single `verifyContract` call.

If you have multiple consumers, you would run verifications for all consumers of the current provider too. For convenience, you can leave out the `consumerName` during a `verifyContract` call, and ContractCase will verify all contracts for this provider.

## Verifying a contract

Depending on what is in your contract, you may need to set triggers or state
handlers.

If you need to set these, and don't, then ContractCase will fail with
a configuration error.

```ts
verifyContract(
  {
    providerName: YOUR_SERVICE_NAME,
    contractDir: './temp-contracts', // The downloader can currently only download contracts to `temp-contracts`
  },
  (verifier) => {
    // perform any setup
    // Start your service here (if necessary)

    verifier.runVerification(/* any additional config eg triggers or state handlers goes in here */);
  },
);
```

- By default, verification results are uploaded to a broker if the broker access tokens and baseUrl are set and the run is in CI. Set the option `publish: true` or `publish: false` to override this
- By default, verification failures will not throw errors. This can be overridden with `throwOnFail: true` in the options.
- You will need to add [deployment checks](../deployment-checks) before you get the deployment safety
