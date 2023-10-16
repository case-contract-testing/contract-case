<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/test-equivalence-matchers](./test-equivalence-matchers.md) &gt; [modifiers](./test-equivalence-matchers.modifiers.md) &gt; [ExactlyLike](./test-equivalence-matchers.modifiers.exactlylike.md)

## modifiers.ExactlyLike class

Everything inside this matcher will be matched exactly, unless overridden with a generic matcher (eg `AnyString` or` ShapedLike`<!-- -->). Use this to switch out of `shapedLike` and back to the default exact matching.

**Signature:**

```typescript
export declare class ExactlyLike extends CascadingContextMatcher
```

**Extends:** [CascadingContextMatcher](./test-equivalence-matchers.base.cascadingcontextmatcher.md)

## Constructors

| Constructor                                                                                  | Modifiers | Description                                                     |
| -------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| [(constructor)(content)](./test-equivalence-matchers.modifiers.exactlylike._constructor_.md) |           | Constructs a new instance of the <code>ExactlyLike</code> class |

## Methods

| Method                                                                  | Modifiers | Description                                                                                                                                            |
| ----------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [toJSON()](./test-equivalence-matchers.modifiers.exactlylike.tojson.md) |           | For non-TypeScript implementations (see \[AnyMatcher.toJSON()\](\#<!-- -->@<!-- -->case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)) |