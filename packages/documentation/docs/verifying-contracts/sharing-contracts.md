---
sidebar_position: 2
---

# Sharing contracts

There are two main ways to find contracts to verify:

- Shared directory (this approach works well for a monorepo)
- Using a contract broker (this approach works well for separate repositories)

## Sharing with a monorepo

In a monorepo, you can share contracts by using a common `contractDir`.

The structure of a contract directory is `${consumerName}/${providerName}/${contractFile}`

ContractCase will read contracts from this directory recursively, and will ignore any contracts that aren't for the provider being verified.

## Sharing with a broker

To verify a contract from a broker, you will need to download it before running verification. ContractCase has a node package that exposes a CLI for this:

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

You can specify where to download contracts to with `--contract-dir`. See the [CLI reference](../reference/cli.md) for more information on configuring the CLI.

The downloaded contracts will be in `./temp-contracts`
