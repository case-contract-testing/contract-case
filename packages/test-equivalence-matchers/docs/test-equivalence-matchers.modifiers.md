<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/test-equivalence-matchers](./test-equivalence-matchers.md) &gt; [modifiers](./test-equivalence-matchers.modifiers.md)

## modifiers namespace

## Classes

| Class                                                               | Description                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ExactlyLike](./test-equivalence-matchers.modifiers.exactlylike.md) | Everything inside this matcher will be matched exactly, unless overridden with a generic matcher (eg <code>AnyString</code> or<code> ShapedLike</code>). Use this to switch out of <code>shapedLike</code> and back to the default exact matching. |
| [ShapedLike](./test-equivalence-matchers.modifiers.shapedlike.md)   | Everything inside this matcher will be matched on the shape of the data (ie, type alone), unless overridden with other matchers. Use this to switch out of the default <code>exactlyLike</code> matching.                                          |