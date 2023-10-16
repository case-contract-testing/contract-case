<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/test-equivalence-matchers](./test-equivalence-matchers.md) &gt; [http](./test-equivalence-matchers.http.md) &gt; [HttpRequestExample](./test-equivalence-matchers.http.httprequestexample.md)

## http.HttpRequestExample interface

**Signature:**

```typescript
export interface HttpRequestExample
```

## Properties

| Property                                                                         | Modifiers             | Type                                                                | Description                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [body?](./test-equivalence-matchers.http.httprequestexample.body.md)             | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ A test equivalence matcher or json object that describes the body for this response. If not provided, no body matching is performed.                                                                                                              |
| [headers?](./test-equivalence-matchers.http.httprequestexample.headers.md)       | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ A Map of header names and associated test-equivalence matcher values accepted by this example. If not provided, no header matching is performed                                                                                                   |
| [method](./test-equivalence-matchers.http.httprequestexample.method.md)          | <code>readonly</code> | [AnyStringMatcher](./test-equivalence-matchers.anystringmatcher.md) | A string or string matcher that matches the method used for this example (eg <code>&quot;GET&quot;</code> or <code>&quot;POST&quot;</code>). Case insensitive. Note that DELETE, GET and HEAD requests should not have bodies - see the HTTP RFCs for details. |
| [path](./test-equivalence-matchers.http.httprequestexample.path.md)              | <code>readonly</code> | [AnyStringMatcher](./test-equivalence-matchers.anystringmatcher.md) | A string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.                                                                                                                        |
| [query?](./test-equivalence-matchers.http.httprequestexample.query.md)           | <code>readonly</code> | [AnyMatcherOrData](./test-equivalence-matchers.anymatcherordata.md) | _(Optional)_ A test-equivalence matcher for the query. Usually this is a Map of test-equivalence matchers to match the parsed query string, keyed by parameter name. Repeated parameters are collated and put in an array in this map.                         |
| [uniqueName?](./test-equivalence-matchers.http.httprequestexample.uniquename.md) | <code>readonly</code> | string                                                              | _(Optional)_ What unique name, if any, to give to this request                                                                                                                                                                                                 |