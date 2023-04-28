## Package structure

- contract-case-${LANGUAGE} - The layer that users will actually use. Contains no features except for making Case idiomatic for that language. Mostly just a wrapper for Case-Boundaries to make error handling nice.
  - depends on case-boundary-internal and possibly the other JSii layers
  - does NOT depend on case-core

### Monorepo contains:

- Case-Boundary (the JSii layer that is the exported interface)
  - depends on case-core
- Case-CLI (Compiles to a cross platform CLI for contract manipulation with the broker)
  - depends on case-core
- Case-Example-Mock-types (the JSii layer that just describes the mock descriptions - separate because otherwise people might call the wrong thing in the boundaries layer)
- Case-Test-Equivalence-Matchers (the JSii layer that just describes the matcher contents - separate because otherwise people might call the wrong thing in the boundaries layer)
  - depends on case-entities and case-core
- Case-Core (implements the actual matching + core)
  - depends on case-entities
- Case-entities (typescript types and helpers imported by both core and boundaries. Separate to avoid a circular dependency)
