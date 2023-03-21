# Case Best Practices

> ⚠️ INCOMPLETE: _This document is draft / bullet points only. While case is in beta, the documentation is incomplete. Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using Case or you would like a particular document prioritised, please [open an issue](https://github.com/TimothyJones/case/issues/new)_

# General API design

- Separate your API code from the code that needs it (eg your UI code)so that:
  - You can comfortably call it from tests.
  - You can inject configuration parameters (eg baseURL for http APIs)

# Use of Case

- Use the same objects you test in your `testResponse` and `testErrorResponse` code in any tests that mock your API code.
- Case is not a full description of the entire API - it is a description of only the bits your consumer needs to operate.
- Case is not a substitute for communicating with other teams
