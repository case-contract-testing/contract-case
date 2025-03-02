Once you've written your contract, you'll want to verify it against the provider.

## Downloading contracts to verify

To verify a contract, you will need to download contracts first:

```bash
export CASE_BROKER_CI_TOKEN="$YOUR_BROKER_CI_TOKEN"
export CASE_BROKER_BASEURL="https://$YOUR_BROKER_BASE_URL"

npx @contract-case/cli download-contracts "$YOUR_SERVICE_NAME"
```

Alternatively, it can be used directly in a script in your package.json:

```
  "pretest": "ContractCase download-contracts \"$YOUR_SERVICE_NAME\""
```

Note that currently the downloader only downloads contracts with the following selectors:

```
    {
        mainBranch: true,
    },
    {
        deployedOrReleased: true,
    },
    { latest: true },
```

The downloaded contracts will be in `./temp-contracts`

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
