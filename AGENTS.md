<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.

<!-- nx configuration end-->

# Testing Guidelines

When writing tests, especially for matchers and plugins, follow these guidelines:

- **Avoid Jest Mocks for Complex Objects**: Do not use `jest.fn()` or `jest.mock()` for complex context objects like `MatchContext`. Instead, create plain JavaScript objects/functions that return the desired values.
- **Immutable Test State**: Do not use mutable global state variables (like `let mockState = ...`). Instead, create a factory function (e.g., `createMockMatchContext`) that accepts the state as a parameter and returns a new context instance.
- **Behavior Verification**: Focus on verifying the _result_ of the function under test, rather than verifying interactions (e.g., avoid `toHaveBeenCalledWith`).
- **Nested Describe Blocks**: Use nested `describe` blocks to group tests by condition (e.g., `describe('when actual is missing', ...)`).
- **Setup in `beforeEach`**: Move setup code (like creating the mock context) into `beforeEach` blocks within the relevant `describe` scope.
