# How to add a new configuration option

Follow this guide when you want to add a new configuration option to configure the core behaviour of ContractCase.

## Design

ContractCase can take configuration options that change the core behaviour of the matching engine, test runner, contract writing, and broker configuration (etc).

### Ultimately, configuration is context

The configuration itself isn't passed around, instead it becomes properties on
the context object (RunContext) that tells ContractCase how it is running.

This flattening into one object allows ContractCase to be agnostic to how it was
configured, and consistent about precedence of configuration methods.

Note that configuration should be in the `_case:currentRun:context:` namespace and not the `_case:context:` namespace. This is because `_case:context:` properties are able to be overwritten by matchers - which generally isn't desirable for configuration.

### Context should generally be facts

Ideally, it's best if ContractCase can check one value in the configuration to determine how one setting should behave, instead of needing to check multiple different values.

This means that you may want to add a composite property to the context instead of a property that's the same as the configuration setting.

### Defaults should be explicit, and applied before the context is created

Don't spread defaults throughout the code.

### Note: The configuration options described here aren't for interaction behaviour

If you're wanting to configure a particular interaction type, then instead refer
to the interaction plugin definitions (eg MockConfig).

## Step 1: Add to Core

The core needs to know your configuration property

1. Add your property to the core's `CaseConfig` (usually `BaseCaseConfig`).
   If your property is required for ContractCase to operate, then make it required here (even if users aren't expected to specify it)
2. Add the option to the `RunContext` type. This is made of a few different sub-contexts, for use by parts of the ecosystem that don't have access to the full config object. It may be appropriate to add it to one of the sub-contexts instead of directly. Note that you might want to add a composite property here instead.
3. Ensure the value is mapped between `CaseConfig` and `RunContext` appropriately. For most configuration properties, the method `configToRunContext` is sufficient and doesn't need to be modified.
4. If your config has default values, add them to DEFAULT_CONFIG / dependencies.ts as appropriate

## Step 2: Add to the CaseConnector packages

1. Add it to `ContractCaseBoundaryConfig`. This should only contain primitive types, so that different connector implementations are possible. Keep this defined in the same order as the CaseConfig object. This object should be documented, and should specify what the default is.
2. Add it to the `convertConfig` function. This function should validate the values can be assigned to the typescript CaseConfig, but do no other validation. It may also normalise if the result is unambiguous (eg, you can interpret `someProperty` as `SOME_PROPERTY`)
3. Add it to the `.proto` version of the config object in `case-connector-proto`, then run `npm run build:proto` and `npm run lint:fix:proto=` in that package.
4. Add it to `ContractCaseConnectorConfig`, using the same rules as the boundary config. TODO: Replace the boundary config with the connector config so that we only have to do one mapping here.
5. Add it to `mapAllConfigFields` in the grpc connector

## Step 3: Add it to the DSL packages

1. For JS, this is `ContractCaseConfig` and the associated mapper to `ContractCaseBoundaryConfig`
2. For Java, this is `ContractCaseConfig`, `IndividualFailedTestConfig`, `IndividualSuccessTestConfig`, `ContractCaseConnectorConfig`, and their associated builders. You will also need to add mappers in `ConnectorConfigMapper` and `ConnectorOutgoingMapper`.

## Step 4: Add it to the documentation

Add it to the configuration page in the reference section in `/packages/documentation` and and other pages.
