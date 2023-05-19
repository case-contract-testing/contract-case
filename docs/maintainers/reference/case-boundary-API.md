# Case-Boundary-Internal

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-boundary/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-boundary/package.json)

This is the [JSii](https://aws.github.io/jsii/user-guides/lib-author/toolchain/jsii/) layer that is the exported interface for ContractCase.

Don't depend on this directly unless you are writing a custom wrapper for ContractCase.

[Start here instead](https://case.contract-testing.io/docs/intro)

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### BoundaryMockDefinition <a name="BoundaryMockDefinition" id="@contract-case/case-boundary.BoundaryMockDefinition"></a>

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.BoundaryMockDefinition.Initializer"></a>

```typescript
import { BoundaryMockDefinition } from '@contract-case/case-boundary'

const boundaryMockDefinition: BoundaryMockDefinition = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryMockDefinition.property.definition">definition</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryMockDefinition.property.states">states</a></code> | <code>any[]</code> | *No description.* |

---

##### `definition`<sup>Required</sup> <a name="definition" id="@contract-case/case-boundary.BoundaryMockDefinition.property.definition"></a>

```typescript
public readonly definition: any;
```

- *Type:* any

---

##### `states`<sup>Required</sup> <a name="states" id="@contract-case/case-boundary.BoundaryMockDefinition.property.states"></a>

```typescript
public readonly states: any[];
```

- *Type:* any[]

---

### ContractCaseBoundaryConfig <a name="ContractCaseBoundaryConfig" id="@contract-case/case-boundary.ContractCaseBoundaryConfig"></a>

Configure a ContractCase run.

See the [configuration documentation](https://case.contract-testing.io/docs/reference/configuring) for more details.

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.Initializer"></a>

```typescript
import { ContractCaseBoundaryConfig } from '@contract-case/case-boundary'

const contractCaseBoundaryConfig: ContractCaseBoundaryConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.providerName">providerName</a></code> | <code>string</code> | The name of the provider for this contract. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.testRunId">testRunId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.baseUrlUnderTest">baseUrlUnderTest</a></code> | <code>string</code> | The base URL for your real server, if you are testing an http server. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerBaseUrl">brokerBaseUrl</a></code> | <code>string</code> | The base URL for the contract broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerBasicAuth">brokerBasicAuth</a></code> | <code><a href="#@contract-case/case-boundary.UserNamePassword">UserNamePassword</a></code> | The basic authentication username and password to access the contract broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerCiAccessToken">brokerCiAccessToken</a></code> | <code>string</code> | The access token to use for the contract broker. Must have CI scope. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.consumerName">consumerName</a></code> | <code>string</code> | The name of the consumer for this contract. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.contractDir">contractDir</a></code> | <code>string</code> | The directory where the contract will be written. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.contractFilename">contractFilename</a></code> | <code>string</code> | The filename where the contract will be written. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.logLevel">logLevel</a></code> | <code>string</code> | logLevel - one of:. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.printResults">printResults</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.publish">publish</a></code> | <code>string</code> | Whether to publish contracts or verification results to the broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.stateHandlers">stateHandlers</a></code> | <code>{[ key: string ]: <a href="#@contract-case/case-boundary.BoundaryStateHandler">BoundaryStateHandler</a>}</code> | State setup and teardown handlers for any states this test requires (see [writing state handlers](https://case.contract-testing.io/docs/reference/state-handlers/)) for more details. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.throwOnFail">throwOnFail</a></code> | <code>boolean</code> | Whether or not the test should throw an error if the matching fails. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.triggerAndTest">triggerAndTest</a></code> | <code><a href="#@contract-case/case-boundary.ITriggerFunction">ITriggerFunction</a></code> | Call the native trigger and test function (if any) for this interaction pair. |
| <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig.property.triggerAndTests">triggerAndTests</a></code> | <code>{[ key: string ]: <a href="#@contract-case/case-boundary.ITriggerFunction">ITriggerFunction</a>}</code> | Call the native trigger and test function (if any) for this interaction pair. |

---

##### `providerName`<sup>Required</sup> <a name="providerName" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.providerName"></a>

```typescript
public readonly providerName: string;
```

- *Type:* string

The name of the provider for this contract.

---

##### `testRunId`<sup>Required</sup> <a name="testRunId" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.testRunId"></a>

```typescript
public readonly testRunId: string;
```

- *Type:* string

---

##### ~~`baseUrlUnderTest`~~<sup>Optional</sup> <a name="baseUrlUnderTest" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.baseUrlUnderTest"></a>

- *Deprecated:* This will be moved to a config property that allows configuration for arbitrary mocks

```typescript
public readonly baseUrlUnderTest: string;
```

- *Type:* string

The base URL for your real server, if you are testing an http server.

---

##### `brokerBaseUrl`<sup>Optional</sup> <a name="brokerBaseUrl" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerBaseUrl"></a>

```typescript
public readonly brokerBaseUrl: string;
```

- *Type:* string

The base URL for the contract broker.

---

##### `brokerBasicAuth`<sup>Optional</sup> <a name="brokerBasicAuth" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerBasicAuth"></a>

```typescript
public readonly brokerBasicAuth: UserNamePassword;
```

- *Type:* <a href="#@contract-case/case-boundary.UserNamePassword">UserNamePassword</a>

The basic authentication username and password to access the contract broker.

If this is specified along with brokerCiAccessToken, the basic auth is ignored.

---

##### `brokerCiAccessToken`<sup>Optional</sup> <a name="brokerCiAccessToken" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.brokerCiAccessToken"></a>

```typescript
public readonly brokerCiAccessToken: string;
```

- *Type:* string

The access token to use for the contract broker. Must have CI scope.

If this is specified along with brokerBasicAuth, the basic auth is ignored.

---

##### `consumerName`<sup>Optional</sup> <a name="consumerName" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.consumerName"></a>

```typescript
public readonly consumerName: string;
```

- *Type:* string

The name of the consumer for this contract.

---

##### `contractDir`<sup>Optional</sup> <a name="contractDir" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.contractDir"></a>

```typescript
public readonly contractDir: string;
```

- *Type:* string

The directory where the contract will be written.

If you provide this, ContractCase
will generate the filename for you (unless `contractFilename` is specified,
in which case this setting is ignored)

---

##### `contractFilename`<sup>Optional</sup> <a name="contractFilename" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.contractFilename"></a>

```typescript
public readonly contractFilename: string;
```

- *Type:* string

The filename where the contract will be written.

If you
provide this, `contractDir` is ignored

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

logLevel - one of:.

`"none"` - Print no logs (note, results may still be printed - see `printResults`)

`"error"` - Something has gone wrong during the execution of the test framework

`"warn"` - It seems likely that there is a misconfiguration

`"debug"` - Information to help users find out what is happening during their tests

`"maintainerDebug" | "deepMaintainerDebug"` - debugging information for ContractCase maintainers

---

##### `printResults`<sup>Optional</sup> <a name="printResults" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.printResults"></a>

```typescript
public readonly printResults: boolean;
```

- *Type:* boolean

---

##### `publish`<sup>Optional</sup> <a name="publish" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.publish"></a>

```typescript
public readonly publish: string;
```

- *Type:* string

Whether to publish contracts or verification results to the broker.

`"ONLY_IN_CI"` - only when in in CI according to https://github.com/watson/ci-info#supported-ci-tools
`"NEVER"` or `false` - never publish
`"ALWAYS"` or `true` - always publish (not recommended)

Default: `"ONLY_IN_CI"`

---

##### `stateHandlers`<sup>Optional</sup> <a name="stateHandlers" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.stateHandlers"></a>

```typescript
public readonly stateHandlers: {[ key: string ]: BoundaryStateHandler};
```

- *Type:* {[ key: string ]: <a href="#@contract-case/case-boundary.BoundaryStateHandler">BoundaryStateHandler</a>}

State setup and teardown handlers for any states this test requires (see [writing state handlers](https://case.contract-testing.io/docs/reference/state-handlers/)) for more details.

---

##### `throwOnFail`<sup>Optional</sup> <a name="throwOnFail" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.throwOnFail"></a>

```typescript
public readonly throwOnFail: boolean;
```

- *Type:* boolean

Whether or not the test should throw an error if the matching fails.

Note that any configuration errors will still fail the suite regardless of
this setting. This includes exceptions thrown during trigger functions, but
does not include exceptions thrown by testResponse functions.

Default: `true` in contract definition, `false` in contract verification

---

##### `triggerAndTest`<sup>Optional</sup> <a name="triggerAndTest" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.triggerAndTest"></a>

```typescript
public readonly triggerAndTest: ITriggerFunction;
```

- *Type:* <a href="#@contract-case/case-boundary.ITriggerFunction">ITriggerFunction</a>

Call the native trigger and test function (if any) for this interaction pair.

Keyed by `${requestName}::${responseName}`

---

##### `triggerAndTests`<sup>Optional</sup> <a name="triggerAndTests" id="@contract-case/case-boundary.ContractCaseBoundaryConfig.property.triggerAndTests"></a>

```typescript
public readonly triggerAndTests: {[ key: string ]: ITriggerFunction};
```

- *Type:* {[ key: string ]: <a href="#@contract-case/case-boundary.ITriggerFunction">ITriggerFunction</a>}

Call the native trigger and test function (if any) for this interaction pair.

Keyed by `${requestName}::${responseName}`

---

### PrintableMatchError <a name="PrintableMatchError" id="@contract-case/case-boundary.PrintableMatchError"></a>

Data class to hold data to print a message error during matching.

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.PrintableMatchError.Initializer"></a>

```typescript
import { PrintableMatchError } from '@contract-case/case-boundary'

const printableMatchError: PrintableMatchError = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.actual">actual</a></code> | <code>string</code> | A string representation of the actual data received (may contain newlines). |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.errorTypeTag">errorTypeTag</a></code> | <code>string</code> | The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for. |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.expected">expected</a></code> | <code>string</code> | A string representation of the expected data (may contain newlines). |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.kind">kind</a></code> | <code>string</code> | The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR". |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.location">location</a></code> | <code>string</code> | The location the error happened, for printing at the top of the error message. |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.locationTag">locationTag</a></code> | <code>string</code> | The tag line for the location the error happened, for printing after the error message. |
| <code><a href="#@contract-case/case-boundary.PrintableMatchError.property.message">message</a></code> | <code>string</code> | A summary of the error. |

---

##### `actual`<sup>Required</sup> <a name="actual" id="@contract-case/case-boundary.PrintableMatchError.property.actual"></a>

```typescript
public readonly actual: string;
```

- *Type:* string

A string representation of the actual data received (may contain newlines).

---

##### `errorTypeTag`<sup>Required</sup> <a name="errorTypeTag" id="@contract-case/case-boundary.PrintableMatchError.property.errorTypeTag"></a>

```typescript
public readonly errorTypeTag: string;
```

- *Type:* string

The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for.

---

##### `expected`<sup>Required</sup> <a name="expected" id="@contract-case/case-boundary.PrintableMatchError.property.expected"></a>

```typescript
public readonly expected: string;
```

- *Type:* string

A string representation of the expected data (may contain newlines).

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.PrintableMatchError.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR".

Could be any string.

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.PrintableMatchError.property.location"></a>

```typescript
public readonly location: string;
```

- *Type:* string

The location the error happened, for printing at the top of the error message.

---

##### `locationTag`<sup>Required</sup> <a name="locationTag" id="@contract-case/case-boundary.PrintableMatchError.property.locationTag"></a>

```typescript
public readonly locationTag: string;
```

- *Type:* string

The tag line for the location the error happened, for printing after the error message.

This might have more information than the `location` above.

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.PrintableMatchError.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

A summary of the error.

Could be any string.

---

### PrintableMessageError <a name="PrintableMessageError" id="@contract-case/case-boundary.PrintableMessageError"></a>

Data class to hold data to print a message error.

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.PrintableMessageError.Initializer"></a>

```typescript
import { PrintableMessageError } from '@contract-case/case-boundary'

const printableMessageError: PrintableMessageError = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.PrintableMessageError.property.errorTypeTag">errorTypeTag</a></code> | <code>string</code> | The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for. |
| <code><a href="#@contract-case/case-boundary.PrintableMessageError.property.kind">kind</a></code> | <code>string</code> | The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR". |
| <code><a href="#@contract-case/case-boundary.PrintableMessageError.property.location">location</a></code> | <code>string</code> | The location the error happened, for printing at the top of the error message. |
| <code><a href="#@contract-case/case-boundary.PrintableMessageError.property.locationTag">locationTag</a></code> | <code>string</code> | The tag line for the location the error happened, for printing after the error message. |
| <code><a href="#@contract-case/case-boundary.PrintableMessageError.property.message">message</a></code> | <code>string</code> | A summary of the error. |

---

##### `errorTypeTag`<sup>Required</sup> <a name="errorTypeTag" id="@contract-case/case-boundary.PrintableMessageError.property.errorTypeTag"></a>

```typescript
public readonly errorTypeTag: string;
```

- *Type:* string

The machine-readable type for the cause of this error, for printing after the error message to make it easy to search for.

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.PrintableMessageError.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

The red highlighted blob, eg "MATCHING ERROR" or "TRIGGER FUNCTION ERROR".

Could be any string.

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.PrintableMessageError.property.location"></a>

```typescript
public readonly location: string;
```

- *Type:* string

The location the error happened, for printing at the top of the error message.

---

##### `locationTag`<sup>Required</sup> <a name="locationTag" id="@contract-case/case-boundary.PrintableMessageError.property.locationTag"></a>

```typescript
public readonly locationTag: string;
```

- *Type:* string

The tag line for the location the error happened, for printing after the error message.

This might have more information than the `location` above.

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.PrintableMessageError.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

A summary of the error.

Could be any string.

---

### PrintableTestTitle <a name="PrintableTestTitle" id="@contract-case/case-boundary.PrintableTestTitle"></a>

Data class to hold data for a test title print line.

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.PrintableTestTitle.Initializer"></a>

```typescript
import { PrintableTestTitle } from '@contract-case/case-boundary'

const printableTestTitle: PrintableTestTitle = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.PrintableTestTitle.property.additionalText">additionalText</a></code> | <code>string</code> | Any additional text to print after the title (may include newlines). |
| <code><a href="#@contract-case/case-boundary.PrintableTestTitle.property.icon">icon</a></code> | <code>string</code> | An icon for the start of the line (usually a single character emoji, but could be any string). |
| <code><a href="#@contract-case/case-boundary.PrintableTestTitle.property.kind">kind</a></code> | <code>string</code> | Either 'success' to indicate success, or 'failure' to indicate failure. |
| <code><a href="#@contract-case/case-boundary.PrintableTestTitle.property.title">title</a></code> | <code>string</code> | The title to print (will not include newlines). |

---

##### `additionalText`<sup>Required</sup> <a name="additionalText" id="@contract-case/case-boundary.PrintableTestTitle.property.additionalText"></a>

```typescript
public readonly additionalText: string;
```

- *Type:* string

Any additional text to print after the title (may include newlines).

---

##### `icon`<sup>Required</sup> <a name="icon" id="@contract-case/case-boundary.PrintableTestTitle.property.icon"></a>

```typescript
public readonly icon: string;
```

- *Type:* string

An icon for the start of the line (usually a single character emoji, but could be any string).

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.PrintableTestTitle.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

Either 'success' to indicate success, or 'failure' to indicate failure.

---

##### `title`<sup>Required</sup> <a name="title" id="@contract-case/case-boundary.PrintableTestTitle.property.title"></a>

```typescript
public readonly title: string;
```

- *Type:* string

The title to print (will not include newlines).

---

### UserNamePassword <a name="UserNamePassword" id="@contract-case/case-boundary.UserNamePassword"></a>

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.UserNamePassword.Initializer"></a>

```typescript
import { UserNamePassword } from '@contract-case/case-boundary'

const userNamePassword: UserNamePassword = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.UserNamePassword.property.password">password</a></code> | <code>string</code> | The password for basic auth. |
| <code><a href="#@contract-case/case-boundary.UserNamePassword.property.username">username</a></code> | <code>string</code> | The username for basic auth. |

---

##### `password`<sup>Required</sup> <a name="password" id="@contract-case/case-boundary.UserNamePassword.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

The password for basic auth.

---

##### `username`<sup>Required</sup> <a name="username" id="@contract-case/case-boundary.UserNamePassword.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

The username for basic auth.

---

## Classes <a name="Classes" id="Classes"></a>

### BoundaryContractDefiner <a name="BoundaryContractDefiner" id="@contract-case/case-boundary.BoundaryContractDefiner"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryContractDefiner.Initializer"></a>

```typescript
import { BoundaryContractDefiner } from '@contract-case/case-boundary'

new BoundaryContractDefiner(config: ContractCaseBoundaryConfig, logPrinter: ILogPrinter, resultPrinter: IResultPrinter, parentVersions: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.config">config</a></code> | <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a></code> | - A ContractCaseBoundaryConfig object for the configuration. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.logPrinter">logPrinter</a></code> | <code><a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a></code> | - An ILogPrinter to enable printing logs. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.resultPrinter">resultPrinter</a></code> | <code><a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a></code> | - An IResultPrinter to enable printing results. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.parentVersions">parentVersions</a></code> | <code>string[]</code> | - The names version(s) of the package(s) calling this, where each entry in the array contains a name and version, with the first entry in the array being the furthest package up the call stack. |

---

##### `config`<sup>Required</sup> <a name="config" id="@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.config"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a>

A ContractCaseBoundaryConfig object for the configuration.

---

##### `logPrinter`<sup>Required</sup> <a name="logPrinter" id="@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.logPrinter"></a>

- *Type:* <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

An ILogPrinter to enable printing logs.

---

##### `resultPrinter`<sup>Required</sup> <a name="resultPrinter" id="@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.resultPrinter"></a>

- *Type:* <a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a>

An IResultPrinter to enable printing results.

---

##### `parentVersions`<sup>Required</sup> <a name="parentVersions" id="@contract-case/case-boundary.BoundaryContractDefiner.Initializer.parameter.parentVersions"></a>

- *Type:* string[]

The names version(s) of the package(s) calling this, where each entry in the array contains a name and version, with the first entry in the array being the furthest package up the call stack.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.endRecord">endRecord</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.runExample">runExample</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.runRejectingExample">runRejectingExample</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryContractDefiner.stripMatchers">stripMatchers</a></code> | *No description.* |

---

##### `endRecord` <a name="endRecord" id="@contract-case/case-boundary.BoundaryContractDefiner.endRecord"></a>

```typescript
public endRecord(): BoundaryResult
```

##### `runExample` <a name="runExample" id="@contract-case/case-boundary.BoundaryContractDefiner.runExample"></a>

```typescript
public runExample(definition: BoundaryMockDefinition, runConfig: ContractCaseBoundaryConfig): BoundaryResult
```

###### `definition`<sup>Required</sup> <a name="definition" id="@contract-case/case-boundary.BoundaryContractDefiner.runExample.parameter.definition"></a>

- *Type:* <a href="#@contract-case/case-boundary.BoundaryMockDefinition">BoundaryMockDefinition</a>

---

###### `runConfig`<sup>Required</sup> <a name="runConfig" id="@contract-case/case-boundary.BoundaryContractDefiner.runExample.parameter.runConfig"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a>

---

##### `runRejectingExample` <a name="runRejectingExample" id="@contract-case/case-boundary.BoundaryContractDefiner.runRejectingExample"></a>

```typescript
public runRejectingExample(definition: BoundaryMockDefinition, runConfig: ContractCaseBoundaryConfig): BoundaryResult
```

###### `definition`<sup>Required</sup> <a name="definition" id="@contract-case/case-boundary.BoundaryContractDefiner.runRejectingExample.parameter.definition"></a>

- *Type:* <a href="#@contract-case/case-boundary.BoundaryMockDefinition">BoundaryMockDefinition</a>

---

###### `runConfig`<sup>Required</sup> <a name="runConfig" id="@contract-case/case-boundary.BoundaryContractDefiner.runRejectingExample.parameter.runConfig"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a>

---

##### `stripMatchers` <a name="stripMatchers" id="@contract-case/case-boundary.BoundaryContractDefiner.stripMatchers"></a>

```typescript
public stripMatchers(matcherOrData: AnyMatcher): BoundaryResult
```

###### `matcherOrData`<sup>Required</sup> <a name="matcherOrData" id="@contract-case/case-boundary.BoundaryContractDefiner.stripMatchers.parameter.matcherOrData"></a>

- *Type:* @contract-case/test-equivalence-matchers.base.AnyMatcher

---




### BoundaryContractVerifier <a name="BoundaryContractVerifier" id="@contract-case/case-boundary.BoundaryContractVerifier"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer"></a>

```typescript
import { BoundaryContractVerifier } from '@contract-case/case-boundary'

new BoundaryContractVerifier(config: ContractCaseBoundaryConfig, callback: IRunTestCallback, logPrinter: ILogPrinter, resultPrinter: IResultPrinter, parentVersions: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.config">config</a></code> | <code><a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a></code> | - A ContractCaseBoundaryConfig object for the configuration. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.callback">callback</a></code> | <code><a href="#@contract-case/case-boundary.IRunTestCallback">IRunTestCallback</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.logPrinter">logPrinter</a></code> | <code><a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a></code> | - An ILogPrinter to enable printing logs. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.resultPrinter">resultPrinter</a></code> | <code><a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a></code> | - An IResultPrinter to enable printing results. |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.parentVersions">parentVersions</a></code> | <code>string[]</code> | - The names version(s) of the package(s) calling this, where each entry in the array contains a name and version, with the first entry in the array being the furthest package up the call stack. |

---

##### `config`<sup>Required</sup> <a name="config" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.config"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a>

A ContractCaseBoundaryConfig object for the configuration.

---

##### `callback`<sup>Required</sup> <a name="callback" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.callback"></a>

- *Type:* <a href="#@contract-case/case-boundary.IRunTestCallback">IRunTestCallback</a>

---

##### `logPrinter`<sup>Required</sup> <a name="logPrinter" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.logPrinter"></a>

- *Type:* <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

An ILogPrinter to enable printing logs.

---

##### `resultPrinter`<sup>Required</sup> <a name="resultPrinter" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.resultPrinter"></a>

- *Type:* <a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a>

An IResultPrinter to enable printing results.

---

##### `parentVersions`<sup>Required</sup> <a name="parentVersions" id="@contract-case/case-boundary.BoundaryContractVerifier.Initializer.parameter.parentVersions"></a>

- *Type:* string[]

The names version(s) of the package(s) calling this, where each entry in the array contains a name and version, with the first entry in the array being the furthest package up the call stack.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.availableContractDescriptions">availableContractDescriptions</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryContractVerifier.runVerification">runVerification</a></code> | *No description.* |

---

##### `availableContractDescriptions` <a name="availableContractDescriptions" id="@contract-case/case-boundary.BoundaryContractVerifier.availableContractDescriptions"></a>

```typescript
public availableContractDescriptions(): BoundaryResult
```

##### `runVerification` <a name="runVerification" id="@contract-case/case-boundary.BoundaryContractVerifier.runVerification"></a>

```typescript
public runVerification(configOverrides: ContractCaseBoundaryConfig): BoundaryResult
```

###### `configOverrides`<sup>Required</sup> <a name="configOverrides" id="@contract-case/case-boundary.BoundaryContractVerifier.runVerification.parameter.configOverrides"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseBoundaryConfig">ContractCaseBoundaryConfig</a>

---




### BoundaryCrashMessage <a name="BoundaryCrashMessage" id="@contract-case/case-boundary.BoundaryCrashMessage"></a>

Contains constants for the crash messages.

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryCrashMessage.Initializer"></a>

```typescript
import { BoundaryCrashMessage } from '@contract-case/case-boundary'

new BoundaryCrashMessage()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryCrashMessage.property.CRASH_MESSAGE_END">CRASH_MESSAGE_END</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryCrashMessage.property.CRASH_MESSAGE_START">CRASH_MESSAGE_START</a></code> | <code>string</code> | *No description.* |

---

##### `CRASH_MESSAGE_END`<sup>Required</sup> <a name="CRASH_MESSAGE_END" id="@contract-case/case-boundary.BoundaryCrashMessage.property.CRASH_MESSAGE_END"></a>

```typescript
public readonly CRASH_MESSAGE_END: string;
```

- *Type:* string

---

##### `CRASH_MESSAGE_START`<sup>Required</sup> <a name="CRASH_MESSAGE_START" id="@contract-case/case-boundary.BoundaryCrashMessage.property.CRASH_MESSAGE_START"></a>

```typescript
public readonly CRASH_MESSAGE_START: string;
```

- *Type:* string

---

### BoundaryFailure <a name="BoundaryFailure" id="@contract-case/case-boundary.BoundaryFailure"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryFailure.Initializer"></a>

```typescript
import { BoundaryFailure } from '@contract-case/case-boundary'

new BoundaryFailure(kind: string, message: string, location: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.kind">kind</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.message">message</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.location">location</a></code> | <code>string</code> | *No description.* |

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.kind"></a>

- *Type:* string

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.message"></a>

- *Type:* string

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.BoundaryFailure.Initializer.parameter.location"></a>

- *Type:* string

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.property.resultType">resultType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.property.kind">kind</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.property.location">location</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryFailure.property.message">message</a></code> | <code>string</code> | *No description.* |

---

##### `resultType`<sup>Required</sup> <a name="resultType" id="@contract-case/case-boundary.BoundaryFailure.property.resultType"></a>

```typescript
public readonly resultType: string;
```

- *Type:* string

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.BoundaryFailure.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.BoundaryFailure.property.location"></a>

```typescript
public readonly location: string;
```

- *Type:* string

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.BoundaryFailure.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

---


### BoundaryFailureKindConstants <a name="BoundaryFailureKindConstants" id="@contract-case/case-boundary.BoundaryFailureKindConstants"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryFailureKindConstants.Initializer"></a>

```typescript
import { BoundaryFailureKindConstants } from '@contract-case/case-boundary'

new BoundaryFailureKindConstants()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_BROKER_ERROR">CASE_BROKER_ERROR</a></code> | <code>string</code> | An error while contacting a contract broker. |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_CONFIGURATION_ERROR">CASE_CONFIGURATION_ERROR</a></code> | <code>string</code> | The user has configured ContractCase incorrectly. |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_CORE_ERROR">CASE_CORE_ERROR</a></code> | <code>string</code> | Something went wrong in ContractCase internals. |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_FAILED_ASSERTION_ERROR">CASE_FAILED_ASSERTION_ERROR</a></code> | <code>string</code> | The test's expectations were not met. |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_TRIGGER_ERROR">CASE_TRIGGER_ERROR</a></code> | <code>string</code> | The user-provided trigger failed when it was not expected to do so. |
| <code><a href="#@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_VERIFY_RETURN_ERROR">CASE_VERIFY_RETURN_ERROR</a></code> | <code>string</code> | The user-provided verification function (testResponse or testErrorResponse) failed. |

---

##### `CASE_BROKER_ERROR`<sup>Required</sup> <a name="CASE_BROKER_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_BROKER_ERROR"></a>

```typescript
public readonly CASE_BROKER_ERROR: string;
```

- *Type:* string

An error while contacting a contract broker.

---

##### `CASE_CONFIGURATION_ERROR`<sup>Required</sup> <a name="CASE_CONFIGURATION_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_CONFIGURATION_ERROR"></a>

```typescript
public readonly CASE_CONFIGURATION_ERROR: string;
```

- *Type:* string

The user has configured ContractCase incorrectly.

---

##### `CASE_CORE_ERROR`<sup>Required</sup> <a name="CASE_CORE_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_CORE_ERROR"></a>

```typescript
public readonly CASE_CORE_ERROR: string;
```

- *Type:* string

Something went wrong in ContractCase internals.

Almost certainly a bug.

---

##### `CASE_FAILED_ASSERTION_ERROR`<sup>Required</sup> <a name="CASE_FAILED_ASSERTION_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_FAILED_ASSERTION_ERROR"></a>

```typescript
public readonly CASE_FAILED_ASSERTION_ERROR: string;
```

- *Type:* string

The test's expectations were not met.

---

##### `CASE_TRIGGER_ERROR`<sup>Required</sup> <a name="CASE_TRIGGER_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_TRIGGER_ERROR"></a>

```typescript
public readonly CASE_TRIGGER_ERROR: string;
```

- *Type:* string

The user-provided trigger failed when it was not expected to do so.

---

##### `CASE_VERIFY_RETURN_ERROR`<sup>Required</sup> <a name="CASE_VERIFY_RETURN_ERROR" id="@contract-case/case-boundary.BoundaryFailureKindConstants.property.CASE_VERIFY_RETURN_ERROR"></a>

```typescript
public readonly CASE_VERIFY_RETURN_ERROR: string;
```

- *Type:* string

The user-provided verification function (testResponse or testErrorResponse) failed.

---

### BoundaryResult <a name="BoundaryResult" id="@contract-case/case-boundary.BoundaryResult"></a>

Supertype for all methods that return results.

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryResult.Initializer"></a>

```typescript
import { BoundaryResult } from '@contract-case/case-boundary'

new BoundaryResult(result: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryResult.Initializer.parameter.result">result</a></code> | <code>string</code> | *No description.* |

---

##### `result`<sup>Required</sup> <a name="result" id="@contract-case/case-boundary.BoundaryResult.Initializer.parameter.result"></a>

- *Type:* string

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryResult.property.resultType">resultType</a></code> | <code>string</code> | *No description.* |

---

##### `resultType`<sup>Required</sup> <a name="resultType" id="@contract-case/case-boundary.BoundaryResult.property.resultType"></a>

```typescript
public readonly resultType: string;
```

- *Type:* string

---


### BoundaryResultTypeConstants <a name="BoundaryResultTypeConstants" id="@contract-case/case-boundary.BoundaryResultTypeConstants"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryResultTypeConstants.Initializer"></a>

```typescript
import { BoundaryResultTypeConstants } from '@contract-case/case-boundary'

new BoundaryResultTypeConstants()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_FAILURE">RESULT_FAILURE</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS">RESULT_SUCCESS</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS_HAS_ANY_PAYLOAD">RESULT_SUCCESS_HAS_ANY_PAYLOAD</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS_HAS_MAP_PAYLOAD">RESULT_SUCCESS_HAS_MAP_PAYLOAD</a></code> | <code>string</code> | *No description.* |

---

##### `RESULT_FAILURE`<sup>Required</sup> <a name="RESULT_FAILURE" id="@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_FAILURE"></a>

```typescript
public readonly RESULT_FAILURE: string;
```

- *Type:* string

---

##### `RESULT_SUCCESS`<sup>Required</sup> <a name="RESULT_SUCCESS" id="@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS"></a>

```typescript
public readonly RESULT_SUCCESS: string;
```

- *Type:* string

---

##### `RESULT_SUCCESS_HAS_ANY_PAYLOAD`<sup>Required</sup> <a name="RESULT_SUCCESS_HAS_ANY_PAYLOAD" id="@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS_HAS_ANY_PAYLOAD"></a>

```typescript
public readonly RESULT_SUCCESS_HAS_ANY_PAYLOAD: string;
```

- *Type:* string

---

##### `RESULT_SUCCESS_HAS_MAP_PAYLOAD`<sup>Required</sup> <a name="RESULT_SUCCESS_HAS_MAP_PAYLOAD" id="@contract-case/case-boundary.BoundaryResultTypeConstants.property.RESULT_SUCCESS_HAS_MAP_PAYLOAD"></a>

```typescript
public readonly RESULT_SUCCESS_HAS_MAP_PAYLOAD: string;
```

- *Type:* string

---

### BoundaryStateHandler <a name="BoundaryStateHandler" id="@contract-case/case-boundary.BoundaryStateHandler"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryStateHandler.Initializer"></a>

```typescript
import { BoundaryStateHandler } from '@contract-case/case-boundary'

new BoundaryStateHandler()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryStateHandler.setup">setup</a></code> | *No description.* |

---

##### `setup` <a name="setup" id="@contract-case/case-boundary.BoundaryStateHandler.setup"></a>

```typescript
public setup(): BoundaryResult
```




### BoundaryStateHandlerWithTeardown <a name="BoundaryStateHandlerWithTeardown" id="@contract-case/case-boundary.BoundaryStateHandlerWithTeardown"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundaryStateHandlerWithTeardown.Initializer"></a>

```typescript
import { BoundaryStateHandlerWithTeardown } from '@contract-case/case-boundary'

new BoundaryStateHandlerWithTeardown()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundaryStateHandlerWithTeardown.setup">setup</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundaryStateHandlerWithTeardown.teardown">teardown</a></code> | *No description.* |

---

##### `setup` <a name="setup" id="@contract-case/case-boundary.BoundaryStateHandlerWithTeardown.setup"></a>

```typescript
public setup(): BoundaryResult
```

##### `teardown` <a name="teardown" id="@contract-case/case-boundary.BoundaryStateHandlerWithTeardown.teardown"></a>

```typescript
public teardown(): BoundaryResult
```




### BoundarySuccess <a name="BoundarySuccess" id="@contract-case/case-boundary.BoundarySuccess"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundarySuccess.Initializer"></a>

```typescript
import { BoundarySuccess } from '@contract-case/case-boundary'

new BoundarySuccess()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundarySuccess.property.resultType">resultType</a></code> | <code>string</code> | *No description.* |

---

##### `resultType`<sup>Required</sup> <a name="resultType" id="@contract-case/case-boundary.BoundarySuccess.property.resultType"></a>

```typescript
public readonly resultType: string;
```

- *Type:* string

---


### BoundarySuccessWithAny <a name="BoundarySuccessWithAny" id="@contract-case/case-boundary.BoundarySuccessWithAny"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundarySuccessWithAny.Initializer"></a>

```typescript
import { BoundarySuccessWithAny } from '@contract-case/case-boundary'

new BoundarySuccessWithAny(payload: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithAny.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.BoundarySuccessWithAny.Initializer.parameter.payload"></a>

- *Type:* any

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithAny.property.resultType">resultType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithAny.property.payload">payload</a></code> | <code>any</code> | *No description.* |

---

##### `resultType`<sup>Required</sup> <a name="resultType" id="@contract-case/case-boundary.BoundarySuccessWithAny.property.resultType"></a>

```typescript
public readonly resultType: string;
```

- *Type:* string

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.BoundarySuccessWithAny.property.payload"></a>

```typescript
public readonly payload: any;
```

- *Type:* any

---


### BoundarySuccessWithMap <a name="BoundarySuccessWithMap" id="@contract-case/case-boundary.BoundarySuccessWithMap"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.BoundarySuccessWithMap.Initializer"></a>

```typescript
import { BoundarySuccessWithMap } from '@contract-case/case-boundary'

new BoundarySuccessWithMap(payload: {[ key: string ]: any})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithMap.Initializer.parameter.payload">payload</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.BoundarySuccessWithMap.Initializer.parameter.payload"></a>

- *Type:* {[ key: string ]: any}

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithMap.property.resultType">resultType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.BoundarySuccessWithMap.property.payload">payload</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `resultType`<sup>Required</sup> <a name="resultType" id="@contract-case/case-boundary.BoundarySuccessWithMap.property.resultType"></a>

```typescript
public readonly resultType: string;
```

- *Type:* string

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.BoundarySuccessWithMap.property.payload"></a>

```typescript
public readonly payload: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICombinedPrinter <a name="ICombinedPrinter" id="@contract-case/case-boundary.ICombinedPrinter"></a>

- *Extends:* <a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a>, <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

- *Implemented By:* <a href="#@contract-case/case-boundary.ICombinedPrinter">ICombinedPrinter</a>



### IInvokeCoreTest <a name="IInvokeCoreTest" id="@contract-case/case-boundary.IInvokeCoreTest"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.IInvokeCoreTest">IInvokeCoreTest</a>

Interface to tell ContractCase to run the test indicated in a call to an IRunTestCallback.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.IInvokeCoreTest.verify">verify</a></code> | Call this to tell the ContractCase core to actually invoke the test. |

---

##### `verify` <a name="verify" id="@contract-case/case-boundary.IInvokeCoreTest.verify"></a>

```typescript
public verify(): BoundaryResult
```

Call this to tell the ContractCase core to actually invoke the test.

During
verification, by default failed verification doesn't return an error
Result, but failed configuration or core bugs will.


### ILogPrinter <a name="ILogPrinter" id="@contract-case/case-boundary.ILogPrinter"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.ICombinedPrinter">ICombinedPrinter</a>, <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.ILogPrinter.log">log</a></code> | Called by ContractCase to ask the DSL to print a log line. |

---

##### `log` <a name="log" id="@contract-case/case-boundary.ILogPrinter.log"></a>

```typescript
public log(level: string, timestamp: string, version: string, typeString: string, location: string, message: string, additional: string): BoundaryResult
```

Called by ContractCase to ask the DSL to print a log line.

You do not need
to filter calls to this interface, it will only be called when it is
appropriate to print.

###### `level`<sup>Required</sup> <a name="level" id="@contract-case/case-boundary.ILogPrinter.log.parameter.level"></a>

- *Type:* string

A `LogLevel` string, either `error`, `warn`, `debug`, `maintainerDebug` or `deepMaintainerDebug` Use this to programmatically decide any colour formatting.. (although `none` is a possible log level, this function will never be called with `none`).

---

###### `timestamp`<sup>Required</sup> <a name="timestamp" id="@contract-case/case-boundary.ILogPrinter.log.parameter.timestamp"></a>

- *Type:* string

The timestamp generated by ContractCase.

---

###### `version`<sup>Required</sup> <a name="version" id="@contract-case/case-boundary.ILogPrinter.log.parameter.version"></a>

- *Type:* string

The version string for ContractCase core.

---

###### `typeString`<sup>Required</sup> <a name="typeString" id="@contract-case/case-boundary.ILogPrinter.log.parameter.typeString"></a>

- *Type:* string

A rendered version of the LogLevel.

Do not rely on this value programmatically, use the `level` parameter instead.

---

###### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.ILogPrinter.log.parameter.location"></a>

- *Type:* string

A string that represents the location that this log came from.

---

###### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.ILogPrinter.log.parameter.message"></a>

- *Type:* string

The main message of this log line.

---

###### `additional`<sup>Required</sup> <a name="additional" id="@contract-case/case-boundary.ILogPrinter.log.parameter.additional"></a>

- *Type:* string

Any additional output to print on extra lines (you may want to indent this when printing).

---


### IResultPrinter <a name="IResultPrinter" id="@contract-case/case-boundary.IResultPrinter"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.ICombinedPrinter">ICombinedPrinter</a>, <a href="#@contract-case/case-boundary.IResultPrinter">IResultPrinter</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.IResultPrinter.printMatchError">printMatchError</a></code> | Called by ContractCase to ask the DSL to print an individual match error line. |
| <code><a href="#@contract-case/case-boundary.IResultPrinter.printMessageError">printMessageError</a></code> | Called by ContractCase to ask the DSL to print an error during testing that doesn't have an expected / actual value. |
| <code><a href="#@contract-case/case-boundary.IResultPrinter.printTestTitle">printTestTitle</a></code> | Called by ContractCase to ask the DSL to print a test title or main execution details (eg for contract downloading). |

---

##### `printMatchError` <a name="printMatchError" id="@contract-case/case-boundary.IResultPrinter.printMatchError"></a>

```typescript
public printMatchError(MatchErrorDescription: PrintableMatchError): BoundaryResult
```

Called by ContractCase to ask the DSL to print an individual match error line.

###### `MatchErrorDescription`<sup>Required</sup> <a name="MatchErrorDescription" id="@contract-case/case-boundary.IResultPrinter.printMatchError.parameter.MatchErrorDescription"></a>

- *Type:* <a href="#@contract-case/case-boundary.PrintableMatchError">PrintableMatchError</a>

---

##### `printMessageError` <a name="printMessageError" id="@contract-case/case-boundary.IResultPrinter.printMessageError"></a>

```typescript
public printMessageError(messageErrorDetails: PrintableMessageError): BoundaryResult
```

Called by ContractCase to ask the DSL to print an error during testing that doesn't have an expected / actual value.

###### `messageErrorDetails`<sup>Required</sup> <a name="messageErrorDetails" id="@contract-case/case-boundary.IResultPrinter.printMessageError.parameter.messageErrorDetails"></a>

- *Type:* <a href="#@contract-case/case-boundary.PrintableMessageError">PrintableMessageError</a>

---

##### `printTestTitle` <a name="printTestTitle" id="@contract-case/case-boundary.IResultPrinter.printTestTitle"></a>

```typescript
public printTestTitle(titleDetails: PrintableTestTitle): BoundaryResult
```

Called by ContractCase to ask the DSL to print a test title or main execution details (eg for contract downloading).

###### `titleDetails`<sup>Required</sup> <a name="titleDetails" id="@contract-case/case-boundary.IResultPrinter.printTestTitle.parameter.titleDetails"></a>

- *Type:* <a href="#@contract-case/case-boundary.PrintableTestTitle">PrintableTestTitle</a>

---


### IRunTestCallback <a name="IRunTestCallback" id="@contract-case/case-boundary.IRunTestCallback"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.IRunTestCallback">IRunTestCallback</a>

This interface allows the DSL layer to invoke the test.

If your test runner
supports programmatically running different tests, then use this interface to
tell a BoundaryContractVerifier how to call back to your DSL with a test name

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.IRunTestCallback.runTest">runTest</a></code> | Called once for each test in a Verification run. |

---

##### `runTest` <a name="runTest" id="@contract-case/case-boundary.IRunTestCallback.runTest"></a>

```typescript
public runTest(testName: string, invoker: IInvokeCoreTest): BoundaryResult
```

Called once for each test in a Verification run.

In an implementation, you
should tell your test runner that it is running a test, and what the name
of the test is.

###### `testName`<sup>Required</sup> <a name="testName" id="@contract-case/case-boundary.IRunTestCallback.runTest.parameter.testName"></a>

- *Type:* string

The name of this test.

---

###### `invoker`<sup>Required</sup> <a name="invoker" id="@contract-case/case-boundary.IRunTestCallback.runTest.parameter.invoker"></a>

- *Type:* <a href="#@contract-case/case-boundary.IInvokeCoreTest">IInvokeCoreTest</a>

an IInvokeCoreTest to tell the ContractCase core that you'd like it to run the test.

---


### ITriggerFunction <a name="ITriggerFunction" id="@contract-case/case-boundary.ITriggerFunction"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.ITriggerFunction">ITriggerFunction</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.ITriggerFunction.trigger">trigger</a></code> | *No description.* |

---

##### `trigger` <a name="trigger" id="@contract-case/case-boundary.ITriggerFunction.trigger"></a>

```typescript
public trigger(config: {[ key: string ]: any}): BoundaryResult
```

###### `config`<sup>Required</sup> <a name="config" id="@contract-case/case-boundary.ITriggerFunction.trigger.parameter.config"></a>

- *Type:* {[ key: string ]: any}

---


