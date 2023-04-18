# ContractCase Test Equivalence Matchers DSL

[![Build and test](https://github.com/case-contract-testing/contractcase-test-equivalence-matchers/actions/workflows/package.yml/badge.svg?branch=main)](https://github.com/case-contract-testing/contractcase-test-equivalence-matchers/actions/workflows/package.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/case-contract-testing/contractcase-test-equivalence-matchers/badge.svg?targetFile=package.json)](https://snyk.io/test/github/case-contract-testing/contractcase-test-equivalence-matchers?targetFile=package.json)

These are the [test equivalence matchers](https://case.contract-testing.io/docs/reference/matchers) for the ContractCase contract testing suite. Read [the documentation here](https://case.contracttesting.io)

This module is separate because it is part of the boundary translated with JSii.

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### ArrayLengthOptions <a name="ArrayLengthOptions" id="@contract-case/test-equivalence-matchers.ArrayLengthOptions"></a>

Options for the `ArrayLength` matcher.

#### Initializer <a name="Initializer" id="@contract-case/test-equivalence-matchers.ArrayLengthOptions.Initializer"></a>

```typescript
import { ArrayLengthOptions } from '@contract-case/test-equivalence-matchers'

const arrayLengthOptions: ArrayLengthOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayLengthOptions.property.maxLength">maxLength</a></code> | <code>number</code> | The maximum length for the array - must be greater than minimum length. |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayLengthOptions.property.minLength">minLength</a></code> | <code>number</code> | The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents. |

---

##### `maxLength`<sup>Optional</sup> <a name="maxLength" id="@contract-case/test-equivalence-matchers.ArrayLengthOptions.property.maxLength"></a>

```typescript
public readonly maxLength: number;
```

- *Type:* number

The maximum length for the array - must be greater than minimum length.

Default infinity.

---

##### `minLength`<sup>Optional</sup> <a name="minLength" id="@contract-case/test-equivalence-matchers.ArrayLengthOptions.property.minLength"></a>

```typescript
public readonly minLength: number;
```

- *Type:* number

The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents.

Default 1.

---

### ArrayLengthOptions <a name="ArrayLengthOptions" id="@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions"></a>

Options for the `ArrayLength` matcher.

#### Initializer <a name="Initializer" id="@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

const arrayLengthOptions: arrays.ArrayLengthOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions.property.maxLength">maxLength</a></code> | <code>number</code> | The maximum length for the array - must be greater than minimum length. |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions.property.minLength">minLength</a></code> | <code>number</code> | The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents. |

---

##### `maxLength`<sup>Optional</sup> <a name="maxLength" id="@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions.property.maxLength"></a>

```typescript
public readonly maxLength: number;
```

- *Type:* number

The maximum length for the array - must be greater than minimum length.

Default infinity.

---

##### `minLength`<sup>Optional</sup> <a name="minLength" id="@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions.property.minLength"></a>

```typescript
public readonly minLength: number;
```

- *Type:* number

The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents.

Default 1.

---

## Classes <a name="Classes" id="Classes"></a>

### And <a name="And" id="@contract-case/test-equivalence-matchers.And"></a>

Matches the content of a variable that comes from a state.

See [state
definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
and [state
handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
more details.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.And.Initializer"></a>

```typescript
import { And } from '@contract-case/test-equivalence-matchers'

new And(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.And.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | - An array of the matchers to run against this particular spot in the tree. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.And.Initializer.parameter.matchers"></a>

- *Type:* any[]

An array of the matchers to run against this particular spot in the tree.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.And.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.And.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### And <a name="And" id="@contract-case/test-equivalence-matchers.convenience.And"></a>

Matches the content of a variable that comes from a state.

See [state
definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
and [state
handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
more details.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.And.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.And(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.And.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | - An array of the matchers to run against this particular spot in the tree. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.convenience.And.Initializer.parameter.matchers"></a>

- *Type:* any[]

An array of the matchers to run against this particular spot in the tree.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.And.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.And.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyBoolean <a name="AnyBoolean" id="@contract-case/test-equivalence-matchers.AnyBoolean"></a>

Matches any Boolean.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyBoolean.Initializer"></a>

```typescript
import { AnyBoolean } from '@contract-case/test-equivalence-matchers'

new AnyBoolean(example: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyBoolean.Initializer.parameter.example">example</a></code> | <code>boolean</code> | - An example boolean. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.AnyBoolean.Initializer.parameter.example"></a>

- *Type:* boolean

An example boolean.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyBoolean.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyBoolean.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyBoolean <a name="AnyBoolean" id="@contract-case/test-equivalence-matchers.primitives.AnyBoolean"></a>

Matches any Boolean.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.primitives.AnyBoolean.Initializer"></a>

```typescript
import { primitives } from '@contract-case/test-equivalence-matchers'

new primitives.AnyBoolean(example: boolean)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyBoolean.Initializer.parameter.example">example</a></code> | <code>boolean</code> | - An example boolean. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.primitives.AnyBoolean.Initializer.parameter.example"></a>

- *Type:* boolean

An example boolean.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyBoolean.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.primitives.AnyBoolean.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyInteger <a name="AnyInteger" id="@contract-case/test-equivalence-matchers.AnyInteger"></a>

Matches any whole integer number.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyInteger.Initializer"></a>

```typescript
import { AnyInteger } from '@contract-case/test-equivalence-matchers'

new AnyInteger(example: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyInteger.Initializer.parameter.example">example</a></code> | <code>number</code> | - Any floating point number, not infinity, not NaN. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.AnyInteger.Initializer.parameter.example"></a>

- *Type:* number

Any floating point number, not infinity, not NaN.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyInteger.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyInteger.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyInteger <a name="AnyInteger" id="@contract-case/test-equivalence-matchers.primitives.AnyInteger"></a>

Matches any whole integer number.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.primitives.AnyInteger.Initializer"></a>

```typescript
import { primitives } from '@contract-case/test-equivalence-matchers'

new primitives.AnyInteger(example: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyInteger.Initializer.parameter.example">example</a></code> | <code>number</code> | - Any floating point number, not infinity, not NaN. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.primitives.AnyInteger.Initializer.parameter.example"></a>

- *Type:* number

Any floating point number, not infinity, not NaN.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyInteger.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.primitives.AnyInteger.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyMatcher <a name="AnyMatcher" id="@contract-case/test-equivalence-matchers.AnyMatcher"></a>

The base class for all Test Equivalence Matchers.

Extend this if you don't
have an example in your Matcher. Otherwise, use {@link AnyMatcherWithExample }

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyMatcher.Initializer"></a>

```typescript
import { AnyMatcher } from '@contract-case/test-equivalence-matchers'

new AnyMatcher(matcherType: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyMatcher.Initializer.parameter.matcherType">matcherType</a></code> | <code>string</code> | - The type string for this matcher (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings). |

---

##### `matcherType`<sup>Required</sup> <a name="matcherType" id="@contract-case/test-equivalence-matchers.AnyMatcher.Initializer.parameter.matcherType"></a>

- *Type:* string

The type string for this matcher (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings).

Matcher strings beginning with `_case:` are reserved for the default ContractCase
matchers. Only use a types prefixed with `_case:` if you wish to create a special case
for a matching behaviour that is already provided by a core ContractCase matcher.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyMatcher.toJSON">toJSON</a></code> | Only override this method if you are writing a matcher from a language other than TypeScript. |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyMatcher.toJSON"></a>

```typescript
public toJSON(): any
```

Only override this method if you are writing a matcher from a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

WARNING: Do not return a string from this method. You must instead return
an object that can be serialised to JSON following  matcher format
described in [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case).




### AnyMatcher <a name="AnyMatcher" id="@contract-case/test-equivalence-matchers.base.AnyMatcher"></a>

The base class for all Test Equivalence Matchers.

Extend this if you don't
have an example in your Matcher. Otherwise, use {@link AnyMatcherWithExample }

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.base.AnyMatcher.Initializer"></a>

```typescript
import { base } from '@contract-case/test-equivalence-matchers'

new base.AnyMatcher(matcherType: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.AnyMatcher.Initializer.parameter.matcherType">matcherType</a></code> | <code>string</code> | - The type string for this matcher (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings). |

---

##### `matcherType`<sup>Required</sup> <a name="matcherType" id="@contract-case/test-equivalence-matchers.base.AnyMatcher.Initializer.parameter.matcherType"></a>

- *Type:* string

The type string for this matcher (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings).

Matcher strings beginning with `_case:` are reserved for the default ContractCase
matchers. Only use a types prefixed with `_case:` if you wish to create a special case
for a matching behaviour that is already provided by a core ContractCase matcher.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.AnyMatcher.toJSON">toJSON</a></code> | Only override this method if you are writing a matcher from a language other than TypeScript. |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.base.AnyMatcher.toJSON"></a>

```typescript
public toJSON(): any
```

Only override this method if you are writing a matcher from a language other than TypeScript.

It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.

WARNING: Do not return a string from this method. You must instead return
an object that can be serialised to JSON following  matcher format
described in [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case).




### AnyMatcherWithExample <a name="AnyMatcherWithExample" id="@contract-case/test-equivalence-matchers.AnyMatcherWithExample"></a>

The base class for all Test Equivalence Matchers that have examples provided.

Extend this if your matcher knows what the example will be. Otherwise, use {@link AnyMatcher}

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyMatcherWithExample.Initializer"></a>

```typescript
import { AnyMatcherWithExample } from '@contract-case/test-equivalence-matchers'

new AnyMatcherWithExample(matcherType: string, example: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyMatcherWithExample.Initializer.parameter.matcherType">matcherType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyMatcherWithExample.Initializer.parameter.example">example</a></code> | <code>any</code> | *No description.* |

---

##### `matcherType`<sup>Required</sup> <a name="matcherType" id="@contract-case/test-equivalence-matchers.AnyMatcherWithExample.Initializer.parameter.matcherType"></a>

- *Type:* string

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.AnyMatcherWithExample.Initializer.parameter.example"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyMatcherWithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyMatcherWithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyMatcherWithExample <a name="AnyMatcherWithExample" id="@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample"></a>

The base class for all Test Equivalence Matchers that have examples provided.

Extend this if your matcher knows what the example will be. Otherwise, use {@link AnyMatcher}

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.Initializer"></a>

```typescript
import { base } from '@contract-case/test-equivalence-matchers'

new base.AnyMatcherWithExample(matcherType: string, example: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.Initializer.parameter.matcherType">matcherType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.Initializer.parameter.example">example</a></code> | <code>any</code> | *No description.* |

---

##### `matcherType`<sup>Required</sup> <a name="matcherType" id="@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.Initializer.parameter.matcherType"></a>

- *Type:* string

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.Initializer.parameter.example"></a>

- *Type:* any

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.base.AnyMatcherWithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyNull <a name="AnyNull" id="@contract-case/test-equivalence-matchers.AnyNull"></a>

Matches `null` (useful for languages like Java where `body: null` means no body, but you want to match a eg a json document that has the body `"null"`).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyNull.Initializer"></a>

```typescript
import { AnyNull } from '@contract-case/test-equivalence-matchers'

new AnyNull()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyNull.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyNull.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyNull <a name="AnyNull" id="@contract-case/test-equivalence-matchers.primitives.AnyNull"></a>

Matches `null` (useful for languages like Java where `body: null` means no body, but you want to match a eg a json document that has the body `"null"`).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.primitives.AnyNull.Initializer"></a>

```typescript
import { primitives } from '@contract-case/test-equivalence-matchers'

new primitives.AnyNull()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyNull.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.primitives.AnyNull.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyNumber <a name="AnyNumber" id="@contract-case/test-equivalence-matchers.AnyNumber"></a>

Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyNumber.Initializer"></a>

```typescript
import { AnyNumber } from '@contract-case/test-equivalence-matchers'

new AnyNumber(example: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyNumber.Initializer.parameter.example">example</a></code> | <code>number</code> | - An example number. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.AnyNumber.Initializer.parameter.example"></a>

- *Type:* number

An example number.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyNumber.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyNumber.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyNumber <a name="AnyNumber" id="@contract-case/test-equivalence-matchers.primitives.AnyNumber"></a>

Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.primitives.AnyNumber.Initializer"></a>

```typescript
import { primitives } from '@contract-case/test-equivalence-matchers'

new primitives.AnyNumber(example: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyNumber.Initializer.parameter.example">example</a></code> | <code>number</code> | - An example number. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.primitives.AnyNumber.Initializer.parameter.example"></a>

- *Type:* number

An example number.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.primitives.AnyNumber.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.primitives.AnyNumber.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyString <a name="AnyString" id="@contract-case/test-equivalence-matchers.AnyString"></a>

Matches any string.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.AnyString.Initializer"></a>

```typescript
import { AnyString } from '@contract-case/test-equivalence-matchers'

new AnyString(example: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyString.Initializer.parameter.example">example</a></code> | <code>string</code> | - An example string. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.AnyString.Initializer.parameter.example"></a>

- *Type:* string

An example string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.AnyString.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.AnyString.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### AnyString <a name="AnyString" id="@contract-case/test-equivalence-matchers.strings.AnyString"></a>

Matches any string.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.AnyString.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.AnyString(example: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.AnyString.Initializer.parameter.example">example</a></code> | <code>string</code> | - An example string. |

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.strings.AnyString.Initializer.parameter.example"></a>

- *Type:* string

An example string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.AnyString.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.AnyString.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayContains <a name="ArrayContains" id="@contract-case/test-equivalence-matchers.ArrayContains"></a>

Matches an Array which contains elements that match the given matchers - note that two different matchers may be satisfied by the same item in the array.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ArrayContains.Initializer"></a>

```typescript
import { ArrayContains } from '@contract-case/test-equivalence-matchers'

new ArrayContains(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayContains.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | - any number of matchers, each of which must be found inside the array. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.ArrayContains.Initializer.parameter.matchers"></a>

- *Type:* any[]

any number of matchers, each of which must be found inside the array.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayContains.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ArrayContains.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayContains <a name="ArrayContains" id="@contract-case/test-equivalence-matchers.arrays.ArrayContains"></a>

Matches an Array which contains elements that match the given matchers - note that two different matchers may be satisfied by the same item in the array.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.arrays.ArrayContains.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

new arrays.ArrayContains(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayContains.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | - any number of matchers, each of which must be found inside the array. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.arrays.ArrayContains.Initializer.parameter.matchers"></a>

- *Type:* any[]

any number of matchers, each of which must be found inside the array.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayContains.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.arrays.ArrayContains.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayEachEntryMatches <a name="ArrayEachEntryMatches" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatches"></a>

Matches an array where each element matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatches.Initializer"></a>

```typescript
import { ArrayEachEntryMatches } from '@contract-case/test-equivalence-matchers'

new ArrayEachEntryMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayEachEntryMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher for each entry in the array. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher for each entry in the array.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayEachEntryMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayEachEntryMatches <a name="ArrayEachEntryMatches" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches"></a>

Matches an array where each element matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

new arrays.ArrayEachEntryMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher for each entry in the array. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher for each entry in the array.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayEachEntryMatchesWithExample <a name="ArrayEachEntryMatchesWithExample" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample"></a>

Matches an array where each element matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.Initializer"></a>

```typescript
import { ArrayEachEntryMatchesWithExample } from '@contract-case/test-equivalence-matchers'

new ArrayEachEntryMatchesWithExample(matcher: any, example: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher for each entry in the array. |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.Initializer.parameter.example">example</a></code> | <code>any[]</code> | - An optional example of the whole array to return. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher for each entry in the array.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.Initializer.parameter.example"></a>

- *Type:* any[]

An optional example of the whole array to return.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ArrayEachEntryMatchesWithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayEachEntryMatchesWithExample <a name="ArrayEachEntryMatchesWithExample" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample"></a>

Matches an array where each element matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

new arrays.ArrayEachEntryMatchesWithExample(matcher: any, example: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher for each entry in the array. |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.Initializer.parameter.example">example</a></code> | <code>any[]</code> | - An optional example of the whole array to return. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher for each entry in the array.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.Initializer.parameter.example"></a>

- *Type:* any[]

An optional example of the whole array to return.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.arrays.ArrayEachEntryMatchesWithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayLength <a name="ArrayLength" id="@contract-case/test-equivalence-matchers.ArrayLength"></a>

Matches an Array whose length is within the specified range (or 1-infinity if not specified).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ArrayLength.Initializer"></a>

```typescript
import { ArrayLength } from '@contract-case/test-equivalence-matchers'

new ArrayLength(options: ArrayLengthOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayLength.Initializer.parameter.options">options</a></code> | <code>@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions</code> | - An `ArrayLengthOptions` object with optional minLength (default 1) and maxLength (default infinity) properties. |

---

##### `options`<sup>Required</sup> <a name="options" id="@contract-case/test-equivalence-matchers.ArrayLength.Initializer.parameter.options"></a>

- *Type:* @contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions

An `ArrayLengthOptions` object with optional minLength (default 1) and maxLength (default infinity) properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayLength.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ArrayLength.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayLength <a name="ArrayLength" id="@contract-case/test-equivalence-matchers.arrays.ArrayLength"></a>

Matches an Array whose length is within the specified range (or 1-infinity if not specified).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.arrays.ArrayLength.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

new arrays.ArrayLength(options: ArrayLengthOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayLength.Initializer.parameter.options">options</a></code> | <code>@contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions</code> | - An `ArrayLengthOptions` object with optional minLength (default 1) and maxLength (default infinity) properties. |

---

##### `options`<sup>Required</sup> <a name="options" id="@contract-case/test-equivalence-matchers.arrays.ArrayLength.Initializer.parameter.options"></a>

- *Type:* @contract-case/test-equivalence-matchers.arrays.ArrayLengthOptions

An `ArrayLengthOptions` object with optional minLength (default 1) and maxLength (default infinity) properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayLength.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.arrays.ArrayLength.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayStartsWith <a name="ArrayStartsWith" id="@contract-case/test-equivalence-matchers.ArrayStartsWith"></a>

Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ArrayStartsWith.Initializer"></a>

```typescript
import { ArrayStartsWith } from '@contract-case/test-equivalence-matchers'

new ArrayStartsWith(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayStartsWith.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | -  An array of matchers that describes the start of the array. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.ArrayStartsWith.Initializer.parameter.matchers"></a>

- *Type:* any[]

An array of matchers that describes the start of the array.

Additional elements in the actual array are ignored.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ArrayStartsWith.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ArrayStartsWith.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ArrayStartsWith <a name="ArrayStartsWith" id="@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith"></a>

Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith.Initializer"></a>

```typescript
import { arrays } from '@contract-case/test-equivalence-matchers'

new arrays.ArrayStartsWith(matchers: any[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith.Initializer.parameter.matchers">matchers</a></code> | <code>any[]</code> | -  An array of matchers that describes the start of the array. |

---

##### `matchers`<sup>Required</sup> <a name="matchers" id="@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith.Initializer.parameter.matchers"></a>

- *Type:* any[]

An array of matchers that describes the start of the array.

Additional elements in the actual array are ignored.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.arrays.ArrayStartsWith.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### Base64Encoded <a name="Base64Encoded" id="@contract-case/test-equivalence-matchers.Base64Encoded"></a>

Transformation matcher that matches a base64 encoded version of the given string or string matcher.

WARNING: Since many strings are accidentally decodable as base64, this matcher is
best combined with a more restrictive string matcher (eg `StringifiedJson`).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.Base64Encoded.Initializer"></a>

```typescript
import { Base64Encoded } from '@contract-case/test-equivalence-matchers'

new Base64Encoded(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.Base64Encoded.Initializer.parameter.child">child</a></code> | <code>any</code> | - The string or string matcher that would match the decoded string. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.Base64Encoded.Initializer.parameter.child"></a>

- *Type:* any

The string or string matcher that would match the decoded string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.Base64Encoded.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.Base64Encoded.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### Base64Encoded <a name="Base64Encoded" id="@contract-case/test-equivalence-matchers.strings.Base64Encoded"></a>

Transformation matcher that matches a base64 encoded version of the given string or string matcher.

WARNING: Since many strings are accidentally decodable as base64, this matcher is
best combined with a more restrictive string matcher (eg `StringifiedJson`).

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.Base64Encoded.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.Base64Encoded(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.Base64Encoded.Initializer.parameter.child">child</a></code> | <code>any</code> | - The string or string matcher that would match the decoded string. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.strings.Base64Encoded.Initializer.parameter.child"></a>

- *Type:* any

The string or string matcher that would match the decoded string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.Base64Encoded.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.Base64Encoded.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### BasicAuthHeaderValue <a name="BasicAuthHeaderValue" id="@contract-case/test-equivalence-matchers.BasicAuthHeaderValue"></a>

Matches the value part of a basic auth header with the supplied username and password - useful in conjunction with the StateVariable matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.Initializer"></a>

```typescript
import { BasicAuthHeaderValue } from '@contract-case/test-equivalence-matchers'

new BasicAuthHeaderValue(username: any, password: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.Initializer.parameter.username">username</a></code> | <code>any</code> | - The username for this basic auth header. |
| <code><a href="#@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.Initializer.parameter.password">password</a></code> | <code>any</code> | - The password for this basic auth password. |

---

##### `username`<sup>Required</sup> <a name="username" id="@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.Initializer.parameter.username"></a>

- *Type:* any

The username for this basic auth header.

---

##### `password`<sup>Required</sup> <a name="password" id="@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.Initializer.parameter.password"></a>

- *Type:* any

The password for this basic auth password.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.BasicAuthHeaderValue.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### BasicAuthHeaderValue <a name="BasicAuthHeaderValue" id="@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue"></a>

Matches the value part of a basic auth header with the supplied username and password - useful in conjunction with the StateVariable matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.Initializer"></a>

```typescript
import { http } from '@contract-case/test-equivalence-matchers'

new http.BasicAuthHeaderValue(username: any, password: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.Initializer.parameter.username">username</a></code> | <code>any</code> | - The username for this basic auth header. |
| <code><a href="#@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.Initializer.parameter.password">password</a></code> | <code>any</code> | - The password for this basic auth password. |

---

##### `username`<sup>Required</sup> <a name="username" id="@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.Initializer.parameter.username"></a>

- *Type:* any

The username for this basic auth header.

---

##### `password`<sup>Required</sup> <a name="password" id="@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.Initializer.parameter.password"></a>

- *Type:* any

The password for this basic auth password.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.http.BasicAuthHeaderValue.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### BearerTokenHeaderValue <a name="BearerTokenHeaderValue" id="@contract-case/test-equivalence-matchers.BearerTokenHeaderValue"></a>

Matches the value part of a OIDC or OAuth header with the supplied token - useful in conjunction with the StateVariable matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.BearerTokenHeaderValue.Initializer"></a>

```typescript
import { BearerTokenHeaderValue } from '@contract-case/test-equivalence-matchers'

new BearerTokenHeaderValue(token: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.BearerTokenHeaderValue.Initializer.parameter.token">token</a></code> | <code>any</code> | - A string or string matcher for a Bearer auth token. |

---

##### `token`<sup>Required</sup> <a name="token" id="@contract-case/test-equivalence-matchers.BearerTokenHeaderValue.Initializer.parameter.token"></a>

- *Type:* any

A string or string matcher for a Bearer auth token.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.BearerTokenHeaderValue.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.BearerTokenHeaderValue.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### BearerTokenHeaderValue <a name="BearerTokenHeaderValue" id="@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue"></a>

Matches the value part of a OIDC or OAuth header with the supplied token - useful in conjunction with the StateVariable matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue.Initializer"></a>

```typescript
import { http } from '@contract-case/test-equivalence-matchers'

new http.BearerTokenHeaderValue(token: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue.Initializer.parameter.token">token</a></code> | <code>any</code> | - A string or string matcher for a Bearer auth token. |

---

##### `token`<sup>Required</sup> <a name="token" id="@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue.Initializer.parameter.token"></a>

- *Type:* any

A string or string matcher for a Bearer auth token.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.http.BearerTokenHeaderValue.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### CascadingContextMatcher <a name="CascadingContextMatcher" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher"></a>

This is a passthrough matcher that does nothing except call the child matcher with the current actual data.

It's useful for taking advantage of the context cascading available on all
matchers without needing to write you own matcher. Extend it if you want to
make a matcher that only changes the context object. If you don't know what
this means, you don't need to extend this matcher.

Due to limitations with JSii, extending implementations MUST NOT override
`toJSON`, or MUST return the result of `super.toJSON()` as part of their
toJSON method.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer"></a>

```typescript
import { CascadingContextMatcher } from '@contract-case/test-equivalence-matchers'

new CascadingContextMatcher(child: any, contextModifiers: {[ key: string ]: string}, currentRunModifiers: {[ key: string ]: string})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.child">child</a></code> | <code>any</code> | - The matcher to apply these context changes to. |
| <code><a href="#@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.contextModifiers">contextModifiers</a></code> | <code>{[ key: string ]: string}</code> | - a map of properties to add to the context object. |
| <code><a href="#@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.currentRunModifiers">currentRunModifiers</a></code> | <code>{[ key: string ]: string}</code> | - a map of properties to add to the current run object. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.child"></a>

- *Type:* any

The matcher to apply these context changes to.

---

##### `contextModifiers`<sup>Required</sup> <a name="contextModifiers" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.contextModifiers"></a>

- *Type:* {[ key: string ]: string}

a map of properties to add to the context object.

---

##### `currentRunModifiers`<sup>Required</sup> <a name="currentRunModifiers" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher.Initializer.parameter.currentRunModifiers"></a>

- *Type:* {[ key: string ]: string}

a map of properties to add to the current run object.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.CascadingContextMatcher.toJSON">toJSON</a></code> | If extending this class, do not override this method (or if you do, make sure you call `super.toJSON()`). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.CascadingContextMatcher.toJSON"></a>

```typescript
public toJSON(): any
```

If extending this class, do not override this method (or if you do, make sure you call `super.toJSON()`).




### CascadingContextMatcher <a name="CascadingContextMatcher" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher"></a>

This is a passthrough matcher that does nothing except call the child matcher with the current actual data.

It's useful for taking advantage of the context cascading available on all
matchers without needing to write you own matcher. Extend it if you want to
make a matcher that only changes the context object. If you don't know what
this means, you don't need to extend this matcher.

Due to limitations with JSii, extending implementations MUST NOT override
`toJSON`, or MUST return the result of `super.toJSON()` as part of their
toJSON method.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer"></a>

```typescript
import { base } from '@contract-case/test-equivalence-matchers'

new base.CascadingContextMatcher(child: any, contextModifiers: {[ key: string ]: string}, currentRunModifiers: {[ key: string ]: string})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.child">child</a></code> | <code>any</code> | - The matcher to apply these context changes to. |
| <code><a href="#@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.contextModifiers">contextModifiers</a></code> | <code>{[ key: string ]: string}</code> | - a map of properties to add to the context object. |
| <code><a href="#@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.currentRunModifiers">currentRunModifiers</a></code> | <code>{[ key: string ]: string}</code> | - a map of properties to add to the current run object. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.child"></a>

- *Type:* any

The matcher to apply these context changes to.

---

##### `contextModifiers`<sup>Required</sup> <a name="contextModifiers" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.contextModifiers"></a>

- *Type:* {[ key: string ]: string}

a map of properties to add to the context object.

---

##### `currentRunModifiers`<sup>Required</sup> <a name="currentRunModifiers" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.Initializer.parameter.currentRunModifiers"></a>

- *Type:* {[ key: string ]: string}

a map of properties to add to the current run object.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.toJSON">toJSON</a></code> | If extending this class, do not override this method (or if you do, make sure you call `super.toJSON()`). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.base.CascadingContextMatcher.toJSON"></a>

```typescript
public toJSON(): any
```

If extending this class, do not override this method (or if you do, make sure you call `super.toJSON()`).




### ChangeLogLevel <a name="ChangeLogLevel" id="@contract-case/test-equivalence-matchers.ChangeLogLevel"></a>

Alters the ContractCase log level below this matcher. Useful for debugging.

This has no effect on matching.

Note that this log level matcher will be saved into the contract, so it will
also affect the log level during verification. Usually you will want to
remove the use of this matcher before saving the contract.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ChangeLogLevel.Initializer"></a>

```typescript
import { ChangeLogLevel } from '@contract-case/test-equivalence-matchers'

new ChangeLogLevel(logLevel: string, child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ChangeLogLevel.Initializer.parameter.logLevel">logLevel</a></code> | <code>string</code> | - The new LogLevel. |
| <code><a href="#@contract-case/test-equivalence-matchers.ChangeLogLevel.Initializer.parameter.child">child</a></code> | <code>any</code> | - The next matcher in the tree. |

---

##### `logLevel`<sup>Required</sup> <a name="logLevel" id="@contract-case/test-equivalence-matchers.ChangeLogLevel.Initializer.parameter.logLevel"></a>

- *Type:* string

The new LogLevel.

One of "none" | "error" | "warn" | "debug" | "maintainerDebug" | "deepMaintainerDebug". see [LogLevel](https://case.contract-testing.io/docs/reference/configuring#loglevel-none--error--warn--debug--maintainerdebug) for details

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.ChangeLogLevel.Initializer.parameter.child"></a>

- *Type:* any

The next matcher in the tree.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ChangeLogLevel.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ChangeLogLevel.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ChangeLogLevel <a name="ChangeLogLevel" id="@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel"></a>

Alters the ContractCase log level below this matcher. Useful for debugging.

This has no effect on matching.

Note that this log level matcher will be saved into the contract, so it will
also affect the log level during verification. Usually you will want to
remove the use of this matcher before saving the contract.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.ChangeLogLevel(logLevel: string, child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.Initializer.parameter.logLevel">logLevel</a></code> | <code>string</code> | - The new LogLevel. |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.Initializer.parameter.child">child</a></code> | <code>any</code> | - The next matcher in the tree. |

---

##### `logLevel`<sup>Required</sup> <a name="logLevel" id="@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.Initializer.parameter.logLevel"></a>

- *Type:* string

The new LogLevel.

One of "none" | "error" | "warn" | "debug" | "maintainerDebug" | "deepMaintainerDebug". see [LogLevel](https://case.contract-testing.io/docs/reference/configuring#loglevel-none--error--warn--debug--maintainerdebug) for details

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.Initializer.parameter.child"></a>

- *Type:* any

The next matcher in the tree.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.ChangeLogLevel.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ExactlyLike <a name="ExactlyLike" id="@contract-case/test-equivalence-matchers.ExactlyLike"></a>

Everything inside this matcher will be matched exactly, unless overridden with a generic matcher (eg `AnyString` or` ShapedLike`).

Use this to switch
out of `shapedLike` and back to the default exact matching.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ExactlyLike.Initializer"></a>

```typescript
import { ExactlyLike } from '@contract-case/test-equivalence-matchers'

new ExactlyLike(content: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ExactlyLike.Initializer.parameter.content">content</a></code> | <code>any</code> | - The object, array, primitive or matcher to match exactly. |

---

##### `content`<sup>Required</sup> <a name="content" id="@contract-case/test-equivalence-matchers.ExactlyLike.Initializer.parameter.content"></a>

- *Type:* any

The object, array, primitive or matcher to match exactly.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ExactlyLike.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ExactlyLike.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ExactlyLike <a name="ExactlyLike" id="@contract-case/test-equivalence-matchers.modifiers.ExactlyLike"></a>

Everything inside this matcher will be matched exactly, unless overridden with a generic matcher (eg `AnyString` or` ShapedLike`).

Use this to switch
out of `shapedLike` and back to the default exact matching.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.modifiers.ExactlyLike.Initializer"></a>

```typescript
import { modifiers } from '@contract-case/test-equivalence-matchers'

new modifiers.ExactlyLike(content: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.modifiers.ExactlyLike.Initializer.parameter.content">content</a></code> | <code>any</code> | - The object, array, primitive or matcher to match exactly. |

---

##### `content`<sup>Required</sup> <a name="content" id="@contract-case/test-equivalence-matchers.modifiers.ExactlyLike.Initializer.parameter.content"></a>

- *Type:* any

The object, array, primitive or matcher to match exactly.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.modifiers.ExactlyLike.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.modifiers.ExactlyLike.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### HttpStatusCode <a name="HttpStatusCode" id="@contract-case/test-equivalence-matchers.HttpStatusCode"></a>

Matches an HTTP status code.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.HttpStatusCode.Initializer"></a>

```typescript
import { HttpStatusCode } from '@contract-case/test-equivalence-matchers'

new HttpStatusCode(statusCode: string | string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.HttpStatusCode.Initializer.parameter.statusCode">statusCode</a></code> | <code>string \| string[]</code> | - The http status code to match, expressed as a number or string (eg `200`, `"404"` or `"4XX"`). |

---

##### `statusCode`<sup>Required</sup> <a name="statusCode" id="@contract-case/test-equivalence-matchers.HttpStatusCode.Initializer.parameter.statusCode"></a>

- *Type:* string | string[]

The http status code to match, expressed as a number or string (eg `200`, `"404"` or `"4XX"`).

Matching can be relaxed with `X`, eg `"4XX"` or `"5XX"`. This is useful for error handling.

If you need to match multiple specific statues, you can provide an array of string or numbers.
This behaviour is provided so that you can offer flexibility to the
implementation if the code path for multiple status codes is exactly the
same. It is not appropriate to use multiple status codes if the code paths
are intended to be different. For more context, see [the section on optional values
in the documentation](https://case.contract-testing.io/docs/faq#how-do-i-tell-contractcase-that-a-field-is-optional) for more details.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.HttpStatusCode.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.HttpStatusCode.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### HttpStatusCode <a name="HttpStatusCode" id="@contract-case/test-equivalence-matchers.http.HttpStatusCode"></a>

Matches an HTTP status code.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.http.HttpStatusCode.Initializer"></a>

```typescript
import { http } from '@contract-case/test-equivalence-matchers'

new http.HttpStatusCode(statusCode: string | string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.HttpStatusCode.Initializer.parameter.statusCode">statusCode</a></code> | <code>string \| string[]</code> | - The http status code to match, expressed as a number or string (eg `200`, `"404"` or `"4XX"`). |

---

##### `statusCode`<sup>Required</sup> <a name="statusCode" id="@contract-case/test-equivalence-matchers.http.HttpStatusCode.Initializer.parameter.statusCode"></a>

- *Type:* string | string[]

The http status code to match, expressed as a number or string (eg `200`, `"404"` or `"4XX"`).

Matching can be relaxed with `X`, eg `"4XX"` or `"5XX"`. This is useful for error handling.

If you need to match multiple specific statues, you can provide an array of string or numbers.
This behaviour is provided so that you can offer flexibility to the
implementation if the code path for multiple status codes is exactly the
same. It is not appropriate to use multiple status codes if the code paths
are intended to be different. For more context, see [the section on optional values
in the documentation](https://case.contract-testing.io/docs/faq#how-do-i-tell-contractcase-that-a-field-is-optional) for more details.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.HttpStatusCode.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.http.HttpStatusCode.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### NamedMatch <a name="NamedMatch" id="@contract-case/test-equivalence-matchers.NamedMatch"></a>

Saves the matcher below it with a unique name that can be used with lookups in tests after this one.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.NamedMatch.Initializer"></a>

```typescript
import { NamedMatch } from '@contract-case/test-equivalence-matchers'

new NamedMatch(name: string, child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.NamedMatch.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name you can use to lookup this matcher later. |
| <code><a href="#@contract-case/test-equivalence-matchers.NamedMatch.Initializer.parameter.child">child</a></code> | <code>any</code> | - The content of this named match. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.NamedMatch.Initializer.parameter.name"></a>

- *Type:* string

The name you can use to lookup this matcher later.

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.NamedMatch.Initializer.parameter.child"></a>

- *Type:* any

The content of this named match.

If omitted or undefined, the content will be looked up in a previously named match

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.NamedMatch.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.NamedMatch.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### NamedMatch <a name="NamedMatch" id="@contract-case/test-equivalence-matchers.convenience.NamedMatch"></a>

Saves the matcher below it with a unique name that can be used with lookups in tests after this one.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.NamedMatch.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.NamedMatch(name: string, child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.NamedMatch.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name you can use to lookup this matcher later. |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.NamedMatch.Initializer.parameter.child">child</a></code> | <code>any</code> | - The content of this named match. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.convenience.NamedMatch.Initializer.parameter.name"></a>

- *Type:* string

The name you can use to lookup this matcher later.

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.convenience.NamedMatch.Initializer.parameter.child"></a>

- *Type:* any

The content of this named match.

If omitted or undefined, the content will be looked up in a previously named match

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.NamedMatch.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.NamedMatch.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ObjectEachKeyMatches <a name="ObjectEachKeyMatches" id="@contract-case/test-equivalence-matchers.ObjectEachKeyMatches"></a>

Matches an object where each key matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ObjectEachKeyMatches.Initializer"></a>

```typescript
import { ObjectEachKeyMatches } from '@contract-case/test-equivalence-matchers'

new ObjectEachKeyMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ObjectEachKeyMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher that all keys must pass. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.ObjectEachKeyMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher that all keys must pass.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ObjectEachKeyMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ObjectEachKeyMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ObjectEachKeyMatches <a name="ObjectEachKeyMatches" id="@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches"></a>

Matches an object where each key matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches.Initializer"></a>

```typescript
import { objects } from '@contract-case/test-equivalence-matchers'

new objects.ObjectEachKeyMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher that all keys must pass. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher that all keys must pass.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.objects.ObjectEachKeyMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ObjectEachValueMatches <a name="ObjectEachValueMatches" id="@contract-case/test-equivalence-matchers.ObjectEachValueMatches"></a>

Matches an object where each value matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ObjectEachValueMatches.Initializer"></a>

```typescript
import { ObjectEachValueMatches } from '@contract-case/test-equivalence-matchers'

new ObjectEachValueMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ObjectEachValueMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher that all values must pass. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.ObjectEachValueMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher that all values must pass.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ObjectEachValueMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ObjectEachValueMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ObjectEachValueMatches <a name="ObjectEachValueMatches" id="@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches"></a>

Matches an object where each value matches the provided matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches.Initializer"></a>

```typescript
import { objects } from '@contract-case/test-equivalence-matchers'

new objects.ObjectEachValueMatches(matcher: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - The matcher that all values must pass. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches.Initializer.parameter.matcher"></a>

- *Type:* any

The matcher that all values must pass.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.objects.ObjectEachValueMatches.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ReferenceMatch <a name="ReferenceMatch" id="@contract-case/test-equivalence-matchers.ReferenceMatch"></a>

Matches a named matcher created with `NamedMatch`.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ReferenceMatch.Initializer"></a>

```typescript
import { ReferenceMatch } from '@contract-case/test-equivalence-matchers'

new ReferenceMatch(name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ReferenceMatch.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name you gave to a previous call of `NamedMatch`. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.ReferenceMatch.Initializer.parameter.name"></a>

- *Type:* string

The name you gave to a previous call of `NamedMatch`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ReferenceMatch.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ReferenceMatch.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ReferenceMatch <a name="ReferenceMatch" id="@contract-case/test-equivalence-matchers.convenience.ReferenceMatch"></a>

Matches a named matcher created with `NamedMatch`.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.ReferenceMatch.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.ReferenceMatch(name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.ReferenceMatch.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name you gave to a previous call of `NamedMatch`. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.convenience.ReferenceMatch.Initializer.parameter.name"></a>

- *Type:* string

The name you gave to a previous call of `NamedMatch`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.ReferenceMatch.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.ReferenceMatch.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ShapedLike <a name="ShapedLike" id="@contract-case/test-equivalence-matchers.ShapedLike"></a>

Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overridden with other matchers.

Use this to switch out
of the default `exactlyLike` matching.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.ShapedLike.Initializer"></a>

```typescript
import { ShapedLike } from '@contract-case/test-equivalence-matchers'

new ShapedLike(content: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ShapedLike.Initializer.parameter.content">content</a></code> | <code>any</code> | - The object, array, primitive or matcher to match the shape against. |

---

##### `content`<sup>Required</sup> <a name="content" id="@contract-case/test-equivalence-matchers.ShapedLike.Initializer.parameter.content"></a>

- *Type:* any

The object, array, primitive or matcher to match the shape against.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.ShapedLike.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.ShapedLike.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### ShapedLike <a name="ShapedLike" id="@contract-case/test-equivalence-matchers.modifiers.ShapedLike"></a>

Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overridden with other matchers.

Use this to switch out
of the default `exactlyLike` matching.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.modifiers.ShapedLike.Initializer"></a>

```typescript
import { modifiers } from '@contract-case/test-equivalence-matchers'

new modifiers.ShapedLike(content: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.modifiers.ShapedLike.Initializer.parameter.content">content</a></code> | <code>any</code> | - The object, array, primitive or matcher to match the shape against. |

---

##### `content`<sup>Required</sup> <a name="content" id="@contract-case/test-equivalence-matchers.modifiers.ShapedLike.Initializer.parameter.content"></a>

- *Type:* any

The object, array, primitive or matcher to match the shape against.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.modifiers.ShapedLike.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.modifiers.ShapedLike.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StateVariable <a name="StateVariable" id="@contract-case/test-equivalence-matchers.StateVariable"></a>

Matches the content of a variable that comes from a state.

See [state
definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
and [state
handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
more details.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.StateVariable.Initializer"></a>

```typescript
import { StateVariable } from '@contract-case/test-equivalence-matchers'

new StateVariable(name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StateVariable.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name of the variable. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.StateVariable.Initializer.parameter.name"></a>

- *Type:* string

The name of the variable.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StateVariable.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.StateVariable.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StateVariable <a name="StateVariable" id="@contract-case/test-equivalence-matchers.convenience.StateVariable"></a>

Matches the content of a variable that comes from a state.

See [state
definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
and [state
handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
more details.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.StateVariable.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.StateVariable(name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.StateVariable.Initializer.parameter.name">name</a></code> | <code>string</code> | - The name of the variable. |

---

##### `name`<sup>Required</sup> <a name="name" id="@contract-case/test-equivalence-matchers.convenience.StateVariable.Initializer.parameter.name"></a>

- *Type:* string

The name of the variable.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.StateVariable.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.StateVariable.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringContaining <a name="StringContaining" id="@contract-case/test-equivalence-matchers.StringContaining"></a>

Matches any string that contains the given substring.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.StringContaining.Initializer"></a>

```typescript
import { StringContaining } from '@contract-case/test-equivalence-matchers'

new StringContaining(substring: string, example: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringContaining.Initializer.parameter.substring">substring</a></code> | <code>string</code> | - The substring that the matcher must contain. |
| <code><a href="#@contract-case/test-equivalence-matchers.StringContaining.Initializer.parameter.example">example</a></code> | <code>string</code> | - An example string that passes this matcher. |

---

##### `substring`<sup>Required</sup> <a name="substring" id="@contract-case/test-equivalence-matchers.StringContaining.Initializer.parameter.substring"></a>

- *Type:* string

The substring that the matcher must contain.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.StringContaining.Initializer.parameter.example"></a>

- *Type:* string

An example string that passes this matcher.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringContaining.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.StringContaining.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringContaining <a name="StringContaining" id="@contract-case/test-equivalence-matchers.strings.StringContaining"></a>

Matches any string that contains the given substring.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.StringContaining.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.StringContaining(substring: string, example: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringContaining.Initializer.parameter.substring">substring</a></code> | <code>string</code> | - The substring that the matcher must contain. |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringContaining.Initializer.parameter.example">example</a></code> | <code>string</code> | - An example string that passes this matcher. |

---

##### `substring`<sup>Required</sup> <a name="substring" id="@contract-case/test-equivalence-matchers.strings.StringContaining.Initializer.parameter.substring"></a>

- *Type:* string

The substring that the matcher must contain.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.strings.StringContaining.Initializer.parameter.example"></a>

- *Type:* string

An example string that passes this matcher.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringContaining.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.StringContaining.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringifiedJson <a name="StringifiedJson" id="@contract-case/test-equivalence-matchers.StringifiedJson"></a>

Transformation matcher that matches a JSON.stringify()ed version of the given object. For example, if the actual data is the string:.

```
"{\"foo\":2}"
```

then you could match it with:

```
StringifiedJson({
  "foo": 2
})
```

or

```
StringifiedJson({
  "foo": AnyNumber(2)
})
```

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.StringifiedJson.Initializer"></a>

```typescript
import { StringifiedJson } from '@contract-case/test-equivalence-matchers'

new StringifiedJson(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringifiedJson.Initializer.parameter.child">child</a></code> | <code>any</code> | - The object or matcher that matches the decoded. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.StringifiedJson.Initializer.parameter.child"></a>

- *Type:* any

The object or matcher that matches the decoded.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringifiedJson.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.StringifiedJson.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringifiedJson <a name="StringifiedJson" id="@contract-case/test-equivalence-matchers.strings.StringifiedJson"></a>

Transformation matcher that matches a JSON.stringify()ed version of the given object. For example, if the actual data is the string:.

```
"{\"foo\":2}"
```

then you could match it with:

```
StringifiedJson({
  "foo": 2
})
```

or

```
StringifiedJson({
  "foo": AnyNumber(2)
})
```

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.StringifiedJson.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.StringifiedJson(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringifiedJson.Initializer.parameter.child">child</a></code> | <code>any</code> | - The object or matcher that matches the decoded. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.strings.StringifiedJson.Initializer.parameter.child"></a>

- *Type:* any

The object or matcher that matches the decoded.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringifiedJson.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.StringifiedJson.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringPrefix <a name="StringPrefix" id="@contract-case/test-equivalence-matchers.StringPrefix"></a>

Matches any string that begins with the given constant string prefix.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.StringPrefix.Initializer"></a>

```typescript
import { StringPrefix } from '@contract-case/test-equivalence-matchers'

new StringPrefix(prefix: string, suffix: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringPrefix.Initializer.parameter.prefix">prefix</a></code> | <code>string</code> | - The prefix string. |
| <code><a href="#@contract-case/test-equivalence-matchers.StringPrefix.Initializer.parameter.suffix">suffix</a></code> | <code>any</code> | - A string or matcher to match against the suffix. |

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@contract-case/test-equivalence-matchers.StringPrefix.Initializer.parameter.prefix"></a>

- *Type:* string

The prefix string.

Must be a string and not a matcher

---

##### `suffix`<sup>Required</sup> <a name="suffix" id="@contract-case/test-equivalence-matchers.StringPrefix.Initializer.parameter.suffix"></a>

- *Type:* any

A string or matcher to match against the suffix.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringPrefix.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.StringPrefix.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringPrefix <a name="StringPrefix" id="@contract-case/test-equivalence-matchers.strings.StringPrefix"></a>

Matches any string that begins with the given constant string prefix.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.StringPrefix.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.StringPrefix(prefix: string, suffix: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringPrefix.Initializer.parameter.prefix">prefix</a></code> | <code>string</code> | - The prefix string. |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringPrefix.Initializer.parameter.suffix">suffix</a></code> | <code>any</code> | - A string or matcher to match against the suffix. |

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@contract-case/test-equivalence-matchers.strings.StringPrefix.Initializer.parameter.prefix"></a>

- *Type:* string

The prefix string.

Must be a string and not a matcher

---

##### `suffix`<sup>Required</sup> <a name="suffix" id="@contract-case/test-equivalence-matchers.strings.StringPrefix.Initializer.parameter.suffix"></a>

- *Type:* any

A string or matcher to match against the suffix.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringPrefix.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.StringPrefix.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringSuffix <a name="StringSuffix" id="@contract-case/test-equivalence-matchers.StringSuffix"></a>

Matches any string that ends with the given constant string suffix.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.StringSuffix.Initializer"></a>

```typescript
import { StringSuffix } from '@contract-case/test-equivalence-matchers'

new StringSuffix(prefix: any, suffix: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringSuffix.Initializer.parameter.prefix">prefix</a></code> | <code>any</code> | - A string or matcher to match against the prefix. |
| <code><a href="#@contract-case/test-equivalence-matchers.StringSuffix.Initializer.parameter.suffix">suffix</a></code> | <code>string</code> | - The suffix for the matched string. |

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@contract-case/test-equivalence-matchers.StringSuffix.Initializer.parameter.prefix"></a>

- *Type:* any

A string or matcher to match against the prefix.

If you don't mind what the prefix is, pass null / undefined

---

##### `suffix`<sup>Required</sup> <a name="suffix" id="@contract-case/test-equivalence-matchers.StringSuffix.Initializer.parameter.suffix"></a>

- *Type:* string

The suffix for the matched string.

Must be a string and not a matcher

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.StringSuffix.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.StringSuffix.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### StringSuffix <a name="StringSuffix" id="@contract-case/test-equivalence-matchers.strings.StringSuffix"></a>

Matches any string that ends with the given constant string suffix.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.strings.StringSuffix.Initializer"></a>

```typescript
import { strings } from '@contract-case/test-equivalence-matchers'

new strings.StringSuffix(prefix: any, suffix: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringSuffix.Initializer.parameter.prefix">prefix</a></code> | <code>any</code> | - A string or matcher to match against the prefix. |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringSuffix.Initializer.parameter.suffix">suffix</a></code> | <code>string</code> | - The suffix for the matched string. |

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@contract-case/test-equivalence-matchers.strings.StringSuffix.Initializer.parameter.prefix"></a>

- *Type:* any

A string or matcher to match against the prefix.

If you don't mind what the prefix is, pass null / undefined

---

##### `suffix`<sup>Required</sup> <a name="suffix" id="@contract-case/test-equivalence-matchers.strings.StringSuffix.Initializer.parameter.suffix"></a>

- *Type:* string

The suffix for the matched string.

Must be a string and not a matcher

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.strings.StringSuffix.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.strings.StringSuffix.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### UriEncodedString <a name="UriEncodedString" id="@contract-case/test-equivalence-matchers.UriEncodedString"></a>

Convenience matcher to treat the string as a uri encoded string - useful in `path` segments.

During matching, the actual value is decoded with `decodeUriComponent()` and passed to the child matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.UriEncodedString.Initializer"></a>

```typescript
import { UriEncodedString } from '@contract-case/test-equivalence-matchers'

new UriEncodedString(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.UriEncodedString.Initializer.parameter.child">child</a></code> | <code>any</code> | - Any string matcher or literal string. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.UriEncodedString.Initializer.parameter.child"></a>

- *Type:* any

Any string matcher or literal string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.UriEncodedString.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.UriEncodedString.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### UriEncodedString <a name="UriEncodedString" id="@contract-case/test-equivalence-matchers.http.UriEncodedString"></a>

Convenience matcher to treat the string as a uri encoded string - useful in `path` segments.

During matching, the actual value is decoded with `decodeUriComponent()` and passed to the child matcher.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.http.UriEncodedString.Initializer"></a>

```typescript
import { http } from '@contract-case/test-equivalence-matchers'

new http.UriEncodedString(child: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.UriEncodedString.Initializer.parameter.child">child</a></code> | <code>any</code> | - Any string matcher or literal string. |

---

##### `child`<sup>Required</sup> <a name="child" id="@contract-case/test-equivalence-matchers.http.UriEncodedString.Initializer.parameter.child"></a>

- *Type:* any

Any string matcher or literal string.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.http.UriEncodedString.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.http.UriEncodedString.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### WithExample <a name="WithExample" id="@contract-case/test-equivalence-matchers.WithExample"></a>

Adds an example to the provided matcher.

Useful when you have a complicated
set of constraints and ContractCase can't figure out what the best example should be.

Note that providing any example will override examples provided further down the tree.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.WithExample.Initializer"></a>

```typescript
import { WithExample } from '@contract-case/test-equivalence-matchers'

new WithExample(matcher: any, example: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.WithExample.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - Any matcher to add an example to. |
| <code><a href="#@contract-case/test-equivalence-matchers.WithExample.Initializer.parameter.example">example</a></code> | <code>any</code> | - The example to use when stripping the matchers. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.WithExample.Initializer.parameter.matcher"></a>

- *Type:* any

Any matcher to add an example to.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.WithExample.Initializer.parameter.example"></a>

- *Type:* any

The example to use when stripping the matchers.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.WithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.WithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).




### WithExample <a name="WithExample" id="@contract-case/test-equivalence-matchers.convenience.WithExample"></a>

Adds an example to the provided matcher.

Useful when you have a complicated
set of constraints and ContractCase can't figure out what the best example should be.

Note that providing any example will override examples provided further down the tree.

#### Initializers <a name="Initializers" id="@contract-case/test-equivalence-matchers.convenience.WithExample.Initializer"></a>

```typescript
import { convenience } from '@contract-case/test-equivalence-matchers'

new convenience.WithExample(matcher: any, example: any)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.WithExample.Initializer.parameter.matcher">matcher</a></code> | <code>any</code> | - Any matcher to add an example to. |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.WithExample.Initializer.parameter.example">example</a></code> | <code>any</code> | - The example to use when stripping the matchers. |

---

##### `matcher`<sup>Required</sup> <a name="matcher" id="@contract-case/test-equivalence-matchers.convenience.WithExample.Initializer.parameter.matcher"></a>

- *Type:* any

Any matcher to add an example to.

---

##### `example`<sup>Required</sup> <a name="example" id="@contract-case/test-equivalence-matchers.convenience.WithExample.Initializer.parameter.example"></a>

- *Type:* any

The example to use when stripping the matchers.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@contract-case/test-equivalence-matchers.convenience.WithExample.toJSON">toJSON</a></code> | For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)). |

---

##### `toJSON` <a name="toJSON" id="@contract-case/test-equivalence-matchers.convenience.WithExample.toJSON"></a>

```typescript
public toJSON(): any
```

For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)).





