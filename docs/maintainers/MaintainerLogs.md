# Maintainer log levels

These are the guidelines for the maintainer log levels.

## MaintainerDebug

At this level, logs should not be useful for users. Things to log:

- General control flow
- Choices that ContractCase makes (what is happening)
- Context at creation time

## Deep Maintainer debug

At this level, logs can be super verbose.

- Detailed matching information
- Detailed request and responses for the broker
