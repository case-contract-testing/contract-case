import { PluginDslDeclaration } from '@contract-case/case-plugin-base';

export const dsl: PluginDslDeclaration = {
  namespace: '_case',
  category: 'http',
  matchers: [
    {
      name: 'HttpStatusCode',
      type: 'HttpStatusCode',
      documentation: `Matches an HTTP status code.

This takes a string, so that you can relax matching, 
with \`X\`, eg \`"4XX"\` or \`"5XX"\`. This is useful for covering error handling in contracts.
   
If you need to match multiple specific statues, you can use the HttpStatusCodes matcher instead, which takes an array.
`,
      params: [
        {
          name: 'statusCode',
          jsonPropertyName: '_case:matcher:rule',
          documentation: 'The status code to match',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'HttpStatusCodes',
      type: 'HttpStatusCode',
      documentation: `Matches anything from a set of HTTP status codes.

This matcher accepts an array of strings. 

This behaviour is provided so that you can offer flexibility to the
implementation if the code path for multiple status codes is exactly the
same. It is not appropriate to use multiple status codes if the code paths
are intended to be different. For more context, see
{@link https://case.contract-testing.io/docs/faq#how-do-i-tell-contractcase-that-a-field-is-optional | the section on optional values in the documentation}
for more details

Like the HttpStatusCode matcher, you can relax matching with \`X\`, eg \`"4XX"\` or \`"5XX"\`, which is useful for covering error handling in contracts.
`,
      params: [
        {
          name: 'statusCodes',
          jsonPropertyName: '_case:matcher:rule',
          documentation: 'The status code to match',
          type: {
            kind: 'array',
            type: 'AnyCaseMatcherOrData',
          },
        },
      ],
    },
    {
      name: 'BasicAuthHeader',
      type: 'StringPrefix',
      documentation: `Matches the value part of a basic auth header.

      Typically you'll want to pass a BasicAuthUserNamePassword matcher to this.`,
      params: [
        {
          name: 'value',
          jsonPropertyName: '_case:matcher:suffix',
          documentation:
            'The value part of the basic auth header. Usually this will be a BasicAuthUserNamePassword',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        prefix: 'Basic ',
        resolvesTo: 'string',
      },
    },
    {
      name: 'BearerTokenHeader',
      type: 'StringPrefix',
      documentation: `Matches the value part of a OIDC or OAuth header with the supplied token.

      Useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.`,
      params: [
        {
          name: 'value',
          jsonPropertyName: '_case:matcher:suffix',
          documentation:
            'A string or string matcher for a Bearer auth token. Usually this will be a string or string matcher',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        prefix: 'Bearer ',
        resolvesTo: 'string',
      },
    },
    {
      name: 'BasicAuthUserNamePassword',
      type: 'HttpBasicAuth',
      documentation: `Matches the value part of a basic auth header.
    
      Use this as the parameter for a BasicAuthHeader matcher 

      This is useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.`,
      params: [
        {
          name: 'username',
          documentation: 'The username to match',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'password',
          documentation: 'The password to match',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'HttpRequest',
      type: 'HttpRequestMatcher',
      documentation: `Matches an HTTP request.`,
      params: [
        {
          name: 'method',
          jsonPropertyName: 'method',
          documentation: `The HTTP method to match.

A string or string matcher that matches the method used for this example (eg \`"GET"\` or \`"POST"\`). 
           
Case insensitive. Note that DELETE, GET and HEAD requests should not have bodies - see the HTTP RFCs for details.
          `,
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'path',
          jsonPropertyName: 'path',
          documentation: `The path to match. Provide a string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.`,
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'query',
          jsonPropertyName: 'query',
          documentation: `The query parameters to match.
            
   Usually this is a dictionary object of query parameters,
   keyed by parameter name, with the values being the query parameter value.
   
   Note that by definition, all query parameters are strings.. 
   
   Repeated parameters are collated and consolidated into an array. If you expect 
   repeated query parameters, provide a string for the parameter name, and an array for the expected values. 
   By default, this will match them in the order they appear in the query string.

   If not provided, no query parameter matching is performed.
          `,
          type: 'AnyCaseMatcherOrData',
          optional: true,
        },
        {
          name: 'headers',
          jsonPropertyName: 'headers',
          documentation: `A map of header names and associated test-equivalence matcher values
             accepted by this example.
             
             If not provided, no header matching is performed`,
          type: 'AnyCaseMatcherOrData',
          optional: true,
        },
        {
          name: 'body',
          jsonPropertyName: 'body',
          documentation:
            'A dictionary object that describes the body for this response. If not provided, no body matching is performed.',
          type: 'AnyCaseMatcherOrData',
          optional: true,
        },
      ],
    },
    {
      name: 'HttpResponse',
      type: 'HttpResponseMatcher',
      documentation: `Matches an HTTP response.`,
      params: [
        {
          name: 'status',
          jsonPropertyName: 'status',
          documentation: `The HTTP status code accepted by this example (Recommended: Use the HttpStatusCode matcher)`,
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'headers',
          jsonPropertyName: 'headers',
          documentation: `A dictionary object of header names and associated test-equivalence matcher values
accepted by this example. 
            
If not provided, no header matching is performed`,
          type: 'AnyCaseMatcherOrData',
          optional: true,
        },
        {
          name: 'body',
          jsonPropertyName: 'body',
          documentation:
            'A dictionary object that describes the body for this response. If not provided, no body matching is performed.',
          type: 'AnyCaseMatcherOrData',
          optional: true,
        },
      ],
    },
    {
      name: 'UriEncodedString',
      type: 'UrlEncodedString',
      documentation: ` Convenience matcher to treat the string as a uri encoded string - useful in \`path\` segments.`,
      params: [
        {
          name: 'unencodedString',
          jsonPropertyName: '_case:matcher:child',
          documentation: 'The string to match',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
  ],
  interactions: [
    {
      name: 'WillReceiveHttpRequest',
      type: 'MockHttpClient',
      documentation: `Defines an example that expects to receive an HTTP request. Use this to define a contract at an HTTP client.`,
      params: [
        {
          name: 'request',
          jsonPropertyName: 'request',
          documentation:
            'A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher `HttpRequest`)',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'response',
          jsonPropertyName: 'response',
          documentation:
            'A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher `HttpResponse`)',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockHttpClient',
          stateVariables: 'state',
          triggers: 'generated',
        },
        read: {
          type: '_case:MockHttpServer',
          stateVariables: 'default',
          triggers: 'provided',
        },
      },
    },
    {
      name: 'WillSendHttpRequest',
      type: 'MockHttpServer',
      documentation: `Defines an example that expects to send an HTTP response. Use this to define a contract at an HTTP server.`,
      params: [
        {
          name: 'request',
          jsonPropertyName: 'request',
          documentation:
            'A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher `HttpRequest`)',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'response',
          jsonPropertyName: 'response',
          documentation:
            'A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher `HttpResponse`)',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockHttpServer',
          stateVariables: 'default',
          triggers: 'provided',
        },
        read: {
          type: '_case:MockHttpClient',
          stateVariables: 'state',
          triggers: 'generated',
        },
      },
    },
  ],
};
