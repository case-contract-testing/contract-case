<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Testing Guidelines

When writing tests, especially for matchers and plugins, follow these guidelines:

- **Avoid Jest Mocks for Complex Objects**: Do not use `jest.fn()` or `jest.mock()` for complex context objects like `MatchContext`. Instead, create plain JavaScript objects/functions that return the desired values.
- **Immutable Test State**: Do not use mutable global state variables (like `let mockState = ...`). Instead, create a factory function (e.g., `createMockMatchContext`) that accepts the state as a parameter and returns a new context instance.
- **Behavior Verification**: Focus on verifying the _result_ of the function under test, rather than verifying interactions (e.g., avoid `toHaveBeenCalledWith`).
- **Nested Describe Blocks**: Use nested `describe` blocks to group tests by condition (e.g., `describe('when actual is missing', ...)`).
- **Setup in `beforeEach`**: Move setup code (like creating the mock context) into `beforeEach` blocks within the relevant `describe` scope.
