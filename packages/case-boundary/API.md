# Case-Boundary-Internal

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-boundary/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-boundary/package.json)

This is the [JSii](https://aws.github.io/jsii/user-guides/lib-author/toolchain/jsii/) layer that is the exported interface for ContractCase.

Don't depend on this directly unless you are writing a custom wrapper for ContractCase.

[Start here instead](https://case.contract-testing.io/docs/intro)

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### ContractCaseConfig <a name="ContractCaseConfig" id="@contract-case/case-boundary.ContractCaseConfig"></a>

Configure a ContractCase run.

See the [configuration documentation](https://case.contract-testing.io/docs/reference/configuring) for more details.

#### Initializer <a name="Initializer" id="@contract-case/case-boundary.ContractCaseConfig.Initializer"></a>

```typescript
import { ContractCaseConfig } from '@contract-case/case-boundary'

const contractCaseConfig: ContractCaseConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.consumerName">consumerName</a></code> | <code>string</code> | The name of the consumer for this contract. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.contractDir">contractDir</a></code> | <code>string</code> | The directory where the contract will be written. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.printResults">printResults</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.providerName">providerName</a></code> | <code>string</code> | The name of the provider for this contract. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.testRunId">testRunId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.brokerBaseUrl">brokerBaseUrl</a></code> | <code>string</code> | The base URL for the contract broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.brokerBasicAuth">brokerBasicAuth</a></code> | <code><a href="#@contract-case/case-boundary.UserNamePassword">UserNamePassword</a></code> | The basic authentication username and password to access the contract broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.brokerCiAccessToken">brokerCiAccessToken</a></code> | <code>string</code> | The access token to use for the contract broker. Must have CI scope. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.contractFilename">contractFilename</a></code> | <code>string</code> | The filename where the contract will be written. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.logLevel">logLevel</a></code> | <code>string</code> | logLevel - one of:. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.publish">publish</a></code> | <code>string</code> | Whether to publish contracts or verification results to the broker. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.stateHandlers">stateHandlers</a></code> | <code>{[ key: string ]: <a href="#@contract-case/case-boundary.StateHandler">StateHandler</a>}</code> | State setup and teardown handlers for any states this test requires (see [writing state handlers](https://case.contract-testing.io/docs/reference/state-handlers/)) for more details. |
| <code><a href="#@contract-case/case-boundary.ContractCaseConfig.property.throwOnFail">throwOnFail</a></code> | <code>boolean</code> | Whether or not the test should throw an error if the matching fails. |

---

##### `consumerName`<sup>Required</sup> <a name="consumerName" id="@contract-case/case-boundary.ContractCaseConfig.property.consumerName"></a>

```typescript
public readonly consumerName: string;
```

- *Type:* string

The name of the consumer for this contract.

---

##### `contractDir`<sup>Required</sup> <a name="contractDir" id="@contract-case/case-boundary.ContractCaseConfig.property.contractDir"></a>

```typescript
public readonly contractDir: string;
```

- *Type:* string

The directory where the contract will be written.

If you provide this, ContractCase
will generate the filename for you (unless `contractFilename` is specified,
in which case this setting is ignored)

---

##### `printResults`<sup>Required</sup> <a name="printResults" id="@contract-case/case-boundary.ContractCaseConfig.property.printResults"></a>

```typescript
public readonly printResults: boolean;
```

- *Type:* boolean

---

##### `providerName`<sup>Required</sup> <a name="providerName" id="@contract-case/case-boundary.ContractCaseConfig.property.providerName"></a>

```typescript
public readonly providerName: string;
```

- *Type:* string

The name of the provider for this contract.

---

##### `testRunId`<sup>Required</sup> <a name="testRunId" id="@contract-case/case-boundary.ContractCaseConfig.property.testRunId"></a>

```typescript
public readonly testRunId: string;
```

- *Type:* string

---

##### `brokerBaseUrl`<sup>Optional</sup> <a name="brokerBaseUrl" id="@contract-case/case-boundary.ContractCaseConfig.property.brokerBaseUrl"></a>

```typescript
public readonly brokerBaseUrl: string;
```

- *Type:* string

The base URL for the contract broker.

---

##### `brokerBasicAuth`<sup>Optional</sup> <a name="brokerBasicAuth" id="@contract-case/case-boundary.ContractCaseConfig.property.brokerBasicAuth"></a>

```typescript
public readonly brokerBasicAuth: UserNamePassword;
```

- *Type:* <a href="#@contract-case/case-boundary.UserNamePassword">UserNamePassword</a>

The basic authentication username and password to access the contract broker.

If this is specified along with brokerCiAccessToken, the basic auth is ignored.

---

##### `brokerCiAccessToken`<sup>Optional</sup> <a name="brokerCiAccessToken" id="@contract-case/case-boundary.ContractCaseConfig.property.brokerCiAccessToken"></a>

```typescript
public readonly brokerCiAccessToken: string;
```

- *Type:* string

The access token to use for the contract broker. Must have CI scope.

If this is specified along with brokerBasicAuth, the basic auth is ignored.

---

##### `contractFilename`<sup>Optional</sup> <a name="contractFilename" id="@contract-case/case-boundary.ContractCaseConfig.property.contractFilename"></a>

```typescript
public readonly contractFilename: string;
```

- *Type:* string

The filename where the contract will be written.

If you
provide this, `contractDir` is ignored

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@contract-case/case-boundary.ContractCaseConfig.property.logLevel"></a>

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

##### `publish`<sup>Optional</sup> <a name="publish" id="@contract-case/case-boundary.ContractCaseConfig.property.publish"></a>

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

##### `stateHandlers`<sup>Optional</sup> <a name="stateHandlers" id="@contract-case/case-boundary.ContractCaseConfig.property.stateHandlers"></a>

```typescript
public readonly stateHandlers: {[ key: string ]: StateHandler};
```

- *Type:* {[ key: string ]: <a href="#@contract-case/case-boundary.StateHandler">StateHandler</a>}

State setup and teardown handlers for any states this test requires (see [writing state handlers](https://case.contract-testing.io/docs/reference/state-handlers/)) for more details.

---

##### `throwOnFail`<sup>Optional</sup> <a name="throwOnFail" id="@contract-case/case-boundary.ContractCaseConfig.property.throwOnFail"></a>

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

### ContractDefiner <a name="ContractDefiner" id="@contract-case/case-boundary.ContractDefiner"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.ContractDefiner.Initializer"></a>

```typescript
import { ContractDefiner } from '@contract-case/case-boundary'

new ContractDefiner(config: ContractCaseConfig, printer: ILogPrinter)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.Initializer.parameter.config">config</a></code> | <code><a href="#@contract-case/case-boundary.ContractCaseConfig">ContractCaseConfig</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.Initializer.parameter.printer">printer</a></code> | <code><a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a></code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="@contract-case/case-boundary.ContractDefiner.Initializer.parameter.config"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseConfig">ContractCaseConfig</a>

---

##### `printer`<sup>Required</sup> <a name="printer" id="@contract-case/case-boundary.ContractDefiner.Initializer.parameter.printer"></a>

- *Type:* <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.endRecord">endRecord</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.runExample">runExample</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.runRejectingExample">runRejectingExample</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.ContractDefiner.stripMatchers">stripMatchers</a></code> | *No description.* |

---

##### `endRecord` <a name="endRecord" id="@contract-case/case-boundary.ContractDefiner.endRecord"></a>

```typescript
public endRecord(): Result
```

##### `runExample` <a name="runExample" id="@contract-case/case-boundary.ContractDefiner.runExample"></a>

```typescript
public runExample(definition: any, runConfig: ContractCaseConfig): Result
```

###### `definition`<sup>Required</sup> <a name="definition" id="@contract-case/case-boundary.ContractDefiner.runExample.parameter.definition"></a>

- *Type:* any

---

###### `runConfig`<sup>Required</sup> <a name="runConfig" id="@contract-case/case-boundary.ContractDefiner.runExample.parameter.runConfig"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseConfig">ContractCaseConfig</a>

---

##### `runRejectingExample` <a name="runRejectingExample" id="@contract-case/case-boundary.ContractDefiner.runRejectingExample"></a>

```typescript
public runRejectingExample(definition: any, runConfig: ContractCaseConfig): Result
```

###### `definition`<sup>Required</sup> <a name="definition" id="@contract-case/case-boundary.ContractDefiner.runRejectingExample.parameter.definition"></a>

- *Type:* any

---

###### `runConfig`<sup>Required</sup> <a name="runConfig" id="@contract-case/case-boundary.ContractDefiner.runRejectingExample.parameter.runConfig"></a>

- *Type:* <a href="#@contract-case/case-boundary.ContractCaseConfig">ContractCaseConfig</a>

---

##### `stripMatchers` <a name="stripMatchers" id="@contract-case/case-boundary.ContractDefiner.stripMatchers"></a>

```typescript
public stripMatchers(matcherOrData: AnyMatcher): Result
```

###### `matcherOrData`<sup>Required</sup> <a name="matcherOrData" id="@contract-case/case-boundary.ContractDefiner.stripMatchers.parameter.matcherOrData"></a>

- *Type:* @contract-case/test-equivalence-matchers.base.AnyMatcher

---




### Failure <a name="Failure" id="@contract-case/case-boundary.Failure"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.Failure.Initializer"></a>

```typescript
import { Failure } from '@contract-case/case-boundary'

new Failure(kind: string, message: string, location: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.Failure.Initializer.parameter.kind">kind</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.Failure.Initializer.parameter.message">message</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.Failure.Initializer.parameter.location">location</a></code> | <code>string</code> | *No description.* |

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.Failure.Initializer.parameter.kind"></a>

- *Type:* string

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.Failure.Initializer.parameter.message"></a>

- *Type:* string

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.Failure.Initializer.parameter.location"></a>

- *Type:* string

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.Failure.property.kind">kind</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.Failure.property.location">location</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.Failure.property.message">message</a></code> | <code>string</code> | *No description.* |

---

##### `kind`<sup>Required</sup> <a name="kind" id="@contract-case/case-boundary.Failure.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

---

##### `location`<sup>Required</sup> <a name="location" id="@contract-case/case-boundary.Failure.property.location"></a>

```typescript
public readonly location: string;
```

- *Type:* string

---

##### `message`<sup>Required</sup> <a name="message" id="@contract-case/case-boundary.Failure.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

---


### Result <a name="Result" id="@contract-case/case-boundary.Result"></a>

Supertype for all methods that return results.

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.Result.Initializer"></a>

```typescript
import { Result } from '@contract-case/case-boundary'

new Result(result: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.Result.Initializer.parameter.result">result</a></code> | <code>string</code> | *No description.* |

---

##### `result`<sup>Required</sup> <a name="result" id="@contract-case/case-boundary.Result.Initializer.parameter.result"></a>

- *Type:* string

---





### StateHandler <a name="StateHandler" id="@contract-case/case-boundary.StateHandler"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.StateHandler.Initializer"></a>

```typescript
import { StateHandler } from '@contract-case/case-boundary'

new StateHandler()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.StateHandler.setup">setup</a></code> | *No description.* |

---

##### `setup` <a name="setup" id="@contract-case/case-boundary.StateHandler.setup"></a>

```typescript
public setup(): Result
```




### StateHandlerWithTeardown <a name="StateHandlerWithTeardown" id="@contract-case/case-boundary.StateHandlerWithTeardown"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.StateHandlerWithTeardown.Initializer"></a>

```typescript
import { StateHandlerWithTeardown } from '@contract-case/case-boundary'

new StateHandlerWithTeardown()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.StateHandlerWithTeardown.setup">setup</a></code> | *No description.* |
| <code><a href="#@contract-case/case-boundary.StateHandlerWithTeardown.teardown">teardown</a></code> | *No description.* |

---

##### `setup` <a name="setup" id="@contract-case/case-boundary.StateHandlerWithTeardown.setup"></a>

```typescript
public setup(): Result
```

##### `teardown` <a name="teardown" id="@contract-case/case-boundary.StateHandlerWithTeardown.teardown"></a>

```typescript
public teardown(): Result
```




### Success <a name="Success" id="@contract-case/case-boundary.Success"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.Success.Initializer"></a>

```typescript
import { Success } from '@contract-case/case-boundary'

new Success()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---





### SuccessWithAny <a name="SuccessWithAny" id="@contract-case/case-boundary.SuccessWithAny"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.SuccessWithAny.Initializer"></a>

```typescript
import { SuccessWithAny } from '@contract-case/case-boundary'

new SuccessWithAny(payload: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.SuccessWithAny.Initializer.parameter.payload">payload</a></code> | <code>any</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.SuccessWithAny.Initializer.parameter.payload"></a>

- *Type:* any

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.SuccessWithAny.property.payload">payload</a></code> | <code>any</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.SuccessWithAny.property.payload"></a>

```typescript
public readonly payload: any;
```

- *Type:* any

---


### SuccessWithMap <a name="SuccessWithMap" id="@contract-case/case-boundary.SuccessWithMap"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-boundary.SuccessWithMap.Initializer"></a>

```typescript
import { SuccessWithMap } from '@contract-case/case-boundary'

new SuccessWithMap(payload: {[ key: string ]: any})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.SuccessWithMap.Initializer.parameter.payload">payload</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.SuccessWithMap.Initializer.parameter.payload"></a>

- *Type:* {[ key: string ]: any}

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/case-boundary.SuccessWithMap.property.payload">payload</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |

---

##### `payload`<sup>Required</sup> <a name="payload" id="@contract-case/case-boundary.SuccessWithMap.property.payload"></a>

```typescript
public readonly payload: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ILogPrinter <a name="ILogPrinter" id="@contract-case/case-boundary.ILogPrinter"></a>

- *Implemented By:* <a href="#@contract-case/case-boundary.ILogPrinter">ILogPrinter</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/case-boundary.ILogPrinter.log">log</a></code> | Called by ContractCase to ask the DSL to print a log line. |

---

##### `log` <a name="log" id="@contract-case/case-boundary.ILogPrinter.log"></a>

```typescript
public log(level: string, timestamp: string, version: string, typeString: string, location: string, message: string, additional: string): Result
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


