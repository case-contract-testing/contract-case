## Package structure

- dsl-${LANGUAGE}-${FRAMEWORK} - The layer that users will actually use. Contains no features except for making Case idiomatic for that language.
  - generally depends on case-connector, and knows how to start the server. See [adding DSLs](./AddingDsl.md) for details.

### Monorepo contains:

- case-connector: The gRPC connector that can be used as a server to call contract-case from other languages.
- case-core: Implements the actual matching and core contract testing engine
- case-core-plugin-http: Implements the behaviour for the HTTP Rest plugin (mock client, mock server, and any HTTP related matchers)
- case-core-plugin-dsl: Exposes the shared types for the http plugin
- case-definition-dsl: The JSii layer that just describes the definition language for defining examples to be run. It includes the matchers and the state definers. It currently re-exports the http-plugin-dsl types
- case-entities: Base types and helpers imported by several packages. Separate to avoid circular dependencies.
- case-maintainer-config: Common settings for maintaining packages (doesn't include the eslint config, as it needs specific naming conventions).
- case-plugin-base: Base types needed to implement plugins for ContractCase
- Contract-Case-CLI: The cross platform CLI used for contract manipulation and contacting the broker.
- contract-case-jest: The user-facing Jest DSL for ContractCase. (_TODO: This should be renamed to `dsl-javascript-jest`_)
- documentation: The documentation website
- dsl-java: The user-facing Java DSL for ContractCase
- eslint-config-case-maintainer: Common eslint settings for all typescript packages
