---
sidebar_position: 9
---

# Uploading your contract to a broker

The last step in the defining contracts lifecycle is to upload the contract to the broker. This is important, because otherwise the other side of your contract can't be verified:

## ContractCase Case Files

The Case File is the description of the contract, containing all of the examples
you've defined. It can only be written or published if the tests pass. This file is the source for the examples run during contract verification.

## What is the broker for

The broker records:

- The contract files for each version of each consumer application
- The verification status for each version of each provider application
- The environments and other information about which versions are deployed and released

It's necessary to use a broker to get the deployment confidence we promised you in the introduction. However, if you're just getting started or spiking a deploy, you can try sharing the contracts directory (see the end of this section for details).

## Setting up a broker

ContractCase is compatible with the Pact contract broker ([see here](https://docs.pact.io/pact_broker), which has a [docker image](https://hub.docker.com/r/pactfoundation/pact-broker) you can use to get started). Alternatively, if you prefer a fully supported SaaS solution, you can use the excellent [Pactflow](https://pactflow.io/).

Everywhere in the broker documentation that refers to Pact flies or Contracts equally applies to ContractCase Case File contracts too.

## Publishing a ContractCase Case File

By default, ContractCase publishes all contracts that are defined in CI. This means you'll need to configure:

- The broker base URL
- Either broker basic auth, or a broker access token

See the [configuration options](../reference/configuring) for details.

If you need to override this behaviour, you can set `publish` to either `"ALWAYS"` or `"NEVER"`.

## Contract directory

In addition to publishing contracts, ContractCase writes a contract file (a Case File) to the
contract directory. By default this is
`${CURRENT_WORKING_DIRECTORY}/case-contracts`, but you can change this with the
`contractDir` [configuration option](../reference/configuring).

Make sure you clear out this directory before each run.

This directory is useful if you are spiking a

## Next steps

Next, you'll want to [verify the contract](../verifying-contracts).
