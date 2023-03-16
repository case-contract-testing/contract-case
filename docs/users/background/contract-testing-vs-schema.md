# Contract testing compared to schema tests

> ⚠️ INCOMPLETE: _This document is draft / bullet points only. While case is in beta, the documentation is incomplete. Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete_

- Still need a way to know if the schemas used in each service deployed are compatible
- Need strict definitions of breaking changes
- Many schema expressibility problems:
  - Optional fields when presence actually depends on another field's value
  - Implied defaults meaning that a message might have a different meaning than expected
  - Just because a change isn't _schema_ breaking doesn't mean the two can communicate. Just because your service can parse a message without failing, it doesn't mean it understands it.
  - Sometimes "string" is used when the type is really `"admin" | "user"` - which means that `Administrator` would not be valid, but would pass the schema
