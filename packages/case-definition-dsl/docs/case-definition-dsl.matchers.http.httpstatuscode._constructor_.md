<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-definition-dsl](./case-definition-dsl.md) &gt; [matchers](./case-definition-dsl.matchers.md) &gt; [http](./case-definition-dsl.matchers.http.md) &gt; [HttpStatusCode](./case-definition-dsl.matchers.http.httpstatuscode.md) &gt; [(constructor)](./case-definition-dsl.matchers.http.httpstatuscode._constructor_.md)

## matchers.http.HttpStatusCode.(constructor)

Constructs a new instance of the `HttpStatusCode` class

**Signature:**

```typescript
constructor(statusCode: string | string[]);
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

statusCode

</td><td>

string \| string\[\]

</td><td>

The http status code to match, expressed as a number or string (eg `200`<!-- -->, `"404"` or `"4XX"`<!-- -->).

Matching can be relaxed with `X`<!-- -->, eg `"4XX"` or `"5XX"`<!-- -->. This is useful for error handling.

If you need to match multiple specific statues, you can provide an array of string or numbers. This behaviour is provided so that you can offer flexibility to the implementation if the code path for multiple status codes is exactly the same. It is not appropriate to use multiple status codes if the code paths are intended to be different. For more context, see \[the section on optional values in the documentation\](https://case.contract-testing.io/docs/faq\#how-do-i-tell-contractcase-that-a-field-is-optional) for more details.

</td></tr>
</tbody></table>