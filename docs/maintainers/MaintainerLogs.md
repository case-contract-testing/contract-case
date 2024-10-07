# Maintainer log levels

These are the guidelines for the maintainer log levels.

## MaintainerDebug

At this level, logs should not be useful for users. Things to log:

- General control flow
- Choices that ContractCase makes (what is happening)
- Context at creation time
- When throwing an error, log all information used to decide to throw that error.

## Deep Maintainer debug

At this level, logs can be super verbose.

- Detailed matching information
- Detailed request and responses for the broker

## Connector maintainer debug

If you need to debug the connector layer, you can set the environment variable
`CASE_CONNECTOR_DEBUG` to `true`. This is a separate log stream to the
usual config `logLevel` - it can be set independently. This will log the communication
and a few other things that have been useful during previous debug sessions. It
will be sent to the connector process' standard error stream.

At this log level, most of the communication between the core connector and the host
language client is logged.

### Deep connector maintainer debug

With `CASE_CONNECTOR_DEBUG=true`, the majority of communication that is to do
with logging and printing test output is still not printed. If you really need
to log everything, set `CASE_CONNECTOR_DEBUG` to `deep` or `deepMaintainerDebug`.
This is extremely verbose, and mostly useful when first implementing a new
language's connector.
