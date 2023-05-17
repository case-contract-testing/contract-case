---
sidebar_label: Command Line Interface (CLI)
---

# Command Line Interface (CLI)

ContractCase has a CLI that can be used to interact with a contract broker (such as the [Pact](https://docs.pact.io/pact_broker/docker_images) or [Pactflow](https://pactflow.io/) brokers).

You can install it with:

```bash
$ npm install @contract-case/cli
```

This installs a binary called `ContractCase`.

## Configuration

All of the environment variables in [the configuration documentation](./configuring) apply to configuring the command line. Additionally, some parameters may be specified via options to the individual commands. See below for details

## Command reference

Here we list the commands supported by the CLI.

### Downloading contracts

You can download contracts for verification using the `download-contracts` command:

```bash
# From shell
# replace [options] with any of the options below
# replace <SERVICE NAME> with the name of the service that you are about to test
npx @contract-case/cli download-contracts [options] <SERVICE NAME>
```

```json
// From package.json
"scripts": {
    // replace [options] with any of the options that you want to pass to the downloader
    // replace <SERVICE NAME> with the service that you are about to test
    "download-contracts": "ContractCase download-contracts [options] $SERVICE_NAME"
}
```

Options:

- `-l, --log-level <level>`: Sets the log level (string). See the [the
  configuration reference](./configuring#loglevel-none--error--warn--debug--maintainerdebug) for possible log level options and the
  default values.
