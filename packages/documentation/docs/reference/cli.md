---
sidebar_label: Command Line Interface (CLI)
sidebar_position: 9
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

Additional options can be specified via the following options, or using any of
the environment variables or other configuration files described in the [the
configuration reference](./configuring). For additional information on any of
the options, see the configuration reference for the option of the same name.

Options:

- `--broker-ci-access-token`: Access token for connecting to the broker. This is
  recommended over the basic authentication (username + password), and cannot be
  specified along with a username and password. You can also specify this with the environment variable `CASE_BROKER_CI_TOKEN`.
  (note, if you are only downloading the contracts, you could supply a non-CI token here).
- `--broker-base-url`: The base URL (including `https://`) for connecting to your broker instance. You can also specify this with the environment variable `CASE_BROKER_CI_TOKEN`
- `--broker-username`: Broker username for basic authentication. Don't supply this if you are also using a broker CI token. If you supply a username, you also have to supply a password. See `--broker-password`
- `--broker-password`: Broker password for basic authentication. Don't supply this if you are also using a broker CI token. You also have to specify a username too (see `--broker-username` above).
- `--contract-dir`: Sets the directory to download contracts to. Default is `./case-contracts`

* `-l, --log-level <level>`: Sets the log level (string). See the [the
  log level option](./configuring#loglevel-none--error--warn--debug--maintainerdebug--deepmaintainerdebug) for possible log level options and the
  default values.

### Generating plugin DSLs

If you're the author of a [ContractCase plugin](../plugins/), you can generate
the user-facing DSL classes declared by your plugin's
[DSL declaration](../plugins/dsl-generation) with the `generate-plugin-dsl`
command:

```bash
# replace <PLUGIN PACKAGE> with the name of the plugin package to generate for.
# It must be installed in the current project.
npx @contract-case/cli generate-plugin-dsl [options] <PLUGIN PACKAGE>
```

Options:

- `--languages <languages>`: A comma separated list of the languages to
  generate. Currently `java` and `ts` are supported. Default: `java,ts`.
- `--output-dir <dir>`: The base directory to generate into. Files are
  written to conventional paths beneath this directory (eg
  `src/main/java/...` for Java), so it should be the root of the package that
  the generated files will belong to. Default: the current directory.

See [Declaring your DSL](../plugins/dsl-generation) for details of how
plugins declare the classes this command generates.
