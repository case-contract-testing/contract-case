<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/test-equivalence-matchers](./test-equivalence-matchers.md) &gt; [http](./test-equivalence-matchers.http.md) &gt; [HttpRequest](./test-equivalence-matchers.http.httprequest.md)

## http.HttpRequest class

Matches any HTTP Request with the provided properties

**Signature:**

```typescript
export declare class HttpRequest extends AnyMatcher
```

**Extends:** [AnyMatcher](./test-equivalence-matchers.base.anymatcher.md)

## Constructors

| Constructor                                                                                    | Modifiers | Description                                                     |
| ---------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| [(constructor)(requestExample)](./test-equivalence-matchers.http.httprequest._constructor_.md) |           | Constructs a new instance of the <code>HttpRequest</code> class |

## Properties

| Property                                                                  | Modifiers             | Type                                                                | Description  |
| ------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- | ------------ |
| [body?](./test-equivalence-matchers.http.httprequest.body.md)             | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ |
| [headers?](./test-equivalence-matchers.http.httprequest.headers.md)       | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ |
| [method](./test-equivalence-matchers.http.httprequest.method.md)          | <code>readonly</code> | [AnyStringMatcher](./test-equivalence-matchers.anystringmatcher.md) |              |
| [path](./test-equivalence-matchers.http.httprequest.path.md)              | <code>readonly</code> | [AnyStringMatcher](./test-equivalence-matchers.anystringmatcher.md) |              |
| [query?](./test-equivalence-matchers.http.httprequest.query.md)           | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ |
| [uniqueName?](./test-equivalence-matchers.http.httprequest.uniquename.md) | <code>readonly</code> | string                                                              | _(Optional)_ |

## Methods

| Method                                                             | Modifiers | Description                                                                                                                                            |
| ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [toJSON()](./test-equivalence-matchers.http.httprequest.tojson.md) |           | For non-TypeScript implementations (see \[AnyMatcher.toJSON()\](\#<!-- -->@<!-- -->case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON)) |