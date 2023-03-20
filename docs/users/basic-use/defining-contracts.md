# Defining contracts

> ⚠️ INCOMPLETE: _This document is draft / bullet points only. While case is in beta, the documentation is incomplete. Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete_

In Case, a contract is a series of examples. Each example is independent - for
example: "a getUser request looks like X, and a success response looks like Y".
Any preconditions needed to set up the examples are handled with state - for
example: "when a user with ID 'foo' exists, a getUser request looks like X, and
a success response looks like Y".

Case life cycle:

- Define example
- Set up mock
- Call state handlers
- Invoke trigger
- Record behaviour at mock, and return appropriate response
- Compare mock expectations
- Invoke verification function
