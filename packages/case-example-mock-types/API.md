# ContractCase Mock Types DSL

[![Build and test](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/case/actions/workflows/build-and-test.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/case/badge.svg?targetFile=packages/case-example-mock-types/package.json)](https://snyk.io/test/github/case-contract-testing/case?targetFile=packages/case-example-mock-types/package.json)

These are the [CaseExample mock types](https://case.contract-testing.io/docs/reference/example-types) for the ContractCase contract testing suite. Read [the documentation here](https://case.contracttesting.io)

This module is separate because it is part of the boundary translated with JSii.

# API Reference <a name="API Reference" id="api-reference"></a>

## Structs <a name="Structs" id="Structs"></a>

### ContractCaseCoreBehaviour <a name="ContractCaseCoreBehaviour" id="@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour"></a>

This type defines the core behaviour that ContractCase has with this mock.

If you are using the included example types from ContractCase (or any
extension libraries), you do not need to use this class (or understand this
documentation).

See the definitions in the case-entities-internal package for more details.

#### Initializer <a name="Initializer" id="@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.Initializer"></a>

```typescript
import { base } from '@contract-case/case-example-mock-types'

const contractCaseCoreBehaviour: base.ContractCaseCoreBehaviour = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                                 | **Type**            | **Description**                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.mockType">mockType</a></code>             | <code>string</code> | The type of this mock.                                                     |
| <code><a href="#@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.stateVariables">stateVariables</a></code> | <code>string</code> | Whether or not this mock mode will invoke state handlers.                  |
| <code><a href="#@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.triggers">triggers</a></code>             | <code>string</code> | Whether or not this mock mode needs to be triggered by user-provided code. |

---

##### `mockType`<sup>Required</sup> <a name="mockType" id="@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.mockType"></a>

```typescript
public readonly mockType: string;
```

- _Type:_ string

The type of this mock.

Usually this is inverted on read vs write, for
example, a written MOCK_HTTP_CLIENT might become a MOCK_HTTP_SERVER during
reading.

This will almost always be the same as the top level type for your mock
during read - but if it is different, ContractCase will respect this value.

---

##### `stateVariables`<sup>Required</sup> <a name="stateVariables" id="@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.stateVariables"></a>

```typescript
public readonly stateVariables: string;
```

- _Type:_ string

Whether or not this mock mode will invoke state handlers.

If set to
`"default"` then ContractCase will not invoke or require the state handlers
and will use the default values for all state variables. If set to `"state"`,
then ContractCase will invoke the state handlers and require the expected variables to
be returned.

All other values are errors.

---

##### `triggers`<sup>Required</sup> <a name="triggers" id="@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour.property.triggers"></a>

```typescript
public readonly triggers: string;
```

- _Type:_ string

Whether or not this mock mode needs to be triggered by user-provided code.

If `"provided"` then ContractCase will require the user to provide a
trigger and a test function (eg, for testing an HTTP Client, code that will
invoke it must be provided). If `"generated"`, then ContractCase will not
require user provided triggers as it will generate them (eg, if the
system under test is an HTTP server, ContractCase will generate client calls).

---

### ContractCaseCoreSetup <a name="ContractCaseCoreSetup" id="@contract-case/case-example-mock-types.base.ContractCaseCoreSetup"></a>

#### Initializer <a name="Initializer" id="@contract-case/case-example-mock-types.base.ContractCaseCoreSetup.Initializer"></a>

```typescript
import { base } from '@contract-case/case-example-mock-types'

const contractCaseCoreSetup: base.ContractCaseCoreSetup = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                           | **Type**                                                                           | **Description**                                                                                    |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.base.ContractCaseCoreSetup.property.read">read</a></code>   | <code>@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour</code> | Defines how the ContractCase core will behave when reading (ie, verifying) a Example of this type. |
| <code><a href="#@contract-case/case-example-mock-types.base.ContractCaseCoreSetup.property.write">write</a></code> | <code>@contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour</code> | Defines how the ContractCase core will behave when writing (ie, defining) an Example of this type. |

---

##### `read`<sup>Required</sup> <a name="read" id="@contract-case/case-example-mock-types.base.ContractCaseCoreSetup.property.read"></a>

```typescript
public readonly read: ContractCaseCoreBehaviour;
```

- _Type:_ @contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour

Defines how the ContractCase core will behave when reading (ie, verifying) a Example of this type.

---

##### `write`<sup>Required</sup> <a name="write" id="@contract-case/case-example-mock-types.base.ContractCaseCoreSetup.property.write"></a>

```typescript
public readonly write: ContractCaseCoreBehaviour;
```

- _Type:_ @contract-case/case-example-mock-types.base.ContractCaseCoreBehaviour

Defines how the ContractCase core will behave when writing (ie, defining) an Example of this type.

---

### HttpExample <a name="HttpExample" id="@contract-case/case-example-mock-types.http.HttpExample"></a>

#### Initializer <a name="Initializer" id="@contract-case/case-example-mock-types.http.HttpExample.Initializer"></a>

```typescript
import { http } from '@contract-case/case-example-mock-types'

const httpExample: http.HttpExample = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                       | **Type**         | **Description**                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.HttpExample.property.request">request</a></code>   | <code>any</code> | A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher `HttpRequest`).   |
| <code><a href="#@contract-case/case-example-mock-types.http.HttpExample.property.response">response</a></code> | <code>any</code> | A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher `HttpResponse`). |

---

##### `request`<sup>Required</sup> <a name="request" id="@contract-case/case-example-mock-types.http.HttpExample.property.request"></a>

```typescript
public readonly request: any;
```

- _Type:_ any

A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher `HttpRequest`).

---

##### `response`<sup>Required</sup> <a name="response" id="@contract-case/case-example-mock-types.http.HttpExample.property.response"></a>

```typescript
public readonly response: any;
```

- _Type:_ any

A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher `HttpResponse`).

---

## Classes <a name="Classes" id="Classes"></a>

### AnyMockDescriptor <a name="AnyMockDescriptor" id="@contract-case/case-example-mock-types.base.AnyMockDescriptor"></a>

The base class for all ContractCase Mock Descriptors. Extend this if you are implementing your own mock type.

If you are using the included example types from ContractCase (or any
extension libraries), you do not need to read the documentation for this
class.

#### Initializers <a name="Initializers" id="@contract-case/case-example-mock-types.base.AnyMockDescriptor.Initializer"></a>

```typescript
import { base } from '@contract-case/case-example-mock-types'

new base.AnyMockDescriptor(mockType: string, setup: ContractCaseCoreSetup)
```

| **Name**                                                                                                                          | **Type**                                                                       | **Description**                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.base.AnyMockDescriptor.Initializer.parameter.mockType">mockType</a></code> | <code>string</code>                                                            | - The type string for this mock description (see [Extending ContractCase](https://case.contract-testing.io/docs/reference/plugin-framework/extending-case) for a description of these strings). |
| <code><a href="#@contract-case/case-example-mock-types.base.AnyMockDescriptor.Initializer.parameter.setup">setup</a></code>       | <code>@contract-case/case-example-mock-types.base.ContractCaseCoreSetup</code> | _No description._                                                                                                                                                                               |

---

##### `mockType`<sup>Required</sup> <a name="mockType" id="@contract-case/case-example-mock-types.base.AnyMockDescriptor.Initializer.parameter.mockType"></a>

- _Type:_ string

The type string for this mock description (see [Extending ContractCase](https://case.contract-testing.io/docs/reference/plugin-framework/extending-case) for a description of these strings).

Mock description type strings beginning with `_case:` are reserved for the default ContractCase
matchers. Only use a types prefixed with `_case:` if you wish to create a DSL for a special case
for a matching behaviour that is already provided by a core ContractCase mock.

---

##### `setup`<sup>Required</sup> <a name="setup" id="@contract-case/case-example-mock-types.base.AnyMockDescriptor.Initializer.parameter.setup"></a>

- _Type:_ @contract-case/case-example-mock-types.base.ContractCaseCoreSetup

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                | **Description**                                                                             |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.base.AnyMockDescriptor.toJSON">toJSON</a></code> | Only override this method if you are writing a matcher in a language other than TypeScript. |

---

##### `toJSON` <a name="toJSON" id="@contract-case/case-example-mock-types.base.AnyMockDescriptor.toJSON"></a>

```typescript
public toJSON(): any
```

Only override this method if you are writing a matcher in a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

WARNING: Do not return a string from this method. You must instead return
an object that can be serialised to JSON following the matcher format
described in [Extending ContractCase](https://case.contract-testing.io/docs/reference/plugin-framework/extending-case).

### WillReceiveHttpRequest <a name="WillReceiveHttpRequest" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.Initializer"></a>

```typescript
import { http } from '@contract-case/case-example-mock-types'

new http.WillReceiveHttpRequest(httpExample: HttpExample)
```

| **Name**                                                                                                                                     | **Type**                                                             | **Description**   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.Initializer.parameter.httpExample">httpExample</a></code> | <code>@contract-case/case-example-mock-types.http.HttpExample</code> | _No description._ |

---

##### `httpExample`<sup>Required</sup> <a name="httpExample" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.Initializer.parameter.httpExample"></a>

- _Type:_ @contract-case/case-example-mock-types.http.HttpExample

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                     | **Description**                                                                             |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.toJSON">toJSON</a></code> | Only override this method if you are writing a matcher in a language other than TypeScript. |

---

##### `toJSON` <a name="toJSON" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.toJSON"></a>

```typescript
public toJSON(): any
```

Only override this method if you are writing a matcher in a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

WARNING: Do not return a string from this method. You must instead return
an object that can be serialised to JSON following the matcher format
described in [Extending ContractCase](https://case.contract-testing.io/docs/reference/plugin-framework/extending-case).

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                                  | **Type**         | **Description**   |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.property.request">request</a></code>   | <code>any</code> | _No description._ |
| <code><a href="#@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.property.response">response</a></code> | <code>any</code> | _No description._ |

---

##### `request`<sup>Required</sup> <a name="request" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.property.request"></a>

```typescript
public readonly request: any;
```

- _Type:_ any

---

##### `response`<sup>Required</sup> <a name="response" id="@contract-case/case-example-mock-types.http.WillReceiveHttpRequest.property.response"></a>

```typescript
public readonly response: any;
```

- _Type:_ any

---

### WillSendHttpRequest <a name="WillSendHttpRequest" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest"></a>

#### Initializers <a name="Initializers" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest.Initializer"></a>

```typescript
import { http } from '@contract-case/case-example-mock-types'

new http.WillSendHttpRequest(httpExample: HttpExample)
```

| **Name**                                                                                                                                  | **Type**                                                             | **Description**   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillSendHttpRequest.Initializer.parameter.httpExample">httpExample</a></code> | <code>@contract-case/case-example-mock-types.http.HttpExample</code> | _No description._ |

---

##### `httpExample`<sup>Required</sup> <a name="httpExample" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest.Initializer.parameter.httpExample"></a>

- _Type:_ @contract-case/case-example-mock-types.http.HttpExample

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                  | **Description**                                                                             |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillSendHttpRequest.toJSON">toJSON</a></code> | Only override this method if you are writing a matcher in a language other than TypeScript. |

---

##### `toJSON` <a name="toJSON" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest.toJSON"></a>

```typescript
public toJSON(): any
```

Only override this method if you are writing a matcher in a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

WARNING: Do not return a string from this method. You must instead return
an object that can be serialised to JSON following the matcher format
described in [Extending ContractCase](https://case.contract-testing.io/docs/reference/plugin-framework/extending-case).

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                                               | **Type**         | **Description**   |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- |
| <code><a href="#@contract-case/case-example-mock-types.http.WillSendHttpRequest.property.request">request</a></code>   | <code>any</code> | _No description._ |
| <code><a href="#@contract-case/case-example-mock-types.http.WillSendHttpRequest.property.response">response</a></code> | <code>any</code> | _No description._ |

---

##### `request`<sup>Required</sup> <a name="request" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest.property.request"></a>

```typescript
public readonly request: any;
```

- _Type:_ any

---

##### `response`<sup>Required</sup> <a name="response" id="@contract-case/case-example-mock-types.http.WillSendHttpRequest.property.response"></a>

```typescript
public readonly response: any;
```

- _Type:_ any

---
