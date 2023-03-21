# Case Example Types

This document describes the different Case Example types, and which lifecycle steps apply to each.

> ⚠️ INCOMPLETE: _This document is draft / bullet points only. While case is in beta, the documentation is incomplete. Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using Case or you would like a particular document prioritised, please [open an issue](https://github.com/TimothyJones/case/issues/new)_

When an HTTP client is under test (either writing the contract, or reading a contract from a server)

- No state handlers, state variables are defaults
- Triggers and testResponse functions need to be provided

When an HTTP server is under test (either writing the contract, or reading a contract from a server)

- State handlers must be provided
- No triggers or testResponse functions are needed (Case generates these)
