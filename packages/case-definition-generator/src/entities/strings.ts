import { PluginDslDeclaration } from '../domain/typeSystem/types';

const strings: PluginDslDeclaration = {
  namespace: '_case',
  category: 'strings',
  matchers: [
    {
      name: 'AnyString',
      type: 'MatchString',
      documentation: `Matches any string.`,
      params: [
        {
          name: 'example',
          documentation: 'An example string to use during contract definition',
          type: 'string',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
      contextModifiers: {
        matchBy: 'type',
      },
    },
    {
      name: 'Base64Encoded',
      type: 'Base64Encoded',
      documentation: `Matches a base64 encoded version of the given string or string matcher.
 
      WARNING: Since many strings are accidentally decodable as base64, this matcher is
        best combined with a more restrictive string matcher (eg \`StringifiedJson\`).
      `,
      params: [
        {
          name: 'child',
          documentation: 'The string or string matcher to encode.',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'StringifiedJson',
      type: 'JsonEncoded',
      documentation: `Matches a JSON.stringify()ed version of the given object.`,
      params: [
        {
          name: 'object',
          documentation: 'The object to stringify. May also contain matchers',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'StringContaining',
      type: 'StringContains',
      documentation: `Matches a string that contains the given substring.`,
      params: [
        {
          name: 'substring',
          jsonPropertyName: '_case:matcher:contains',
          documentation: 'The substring that acceptable strings must contain',
          type: 'string',
        },
        {
          name: 'example',
          documentation: 'An example string to use during contract definition',
          type: 'string',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'StringPrefix',
      type: 'MatchStringPrefix',
      documentation: `Matches a string that starts with the given prefix.`,
      params: [
        {
          name: 'prefix',
          documentation: 'The prefix to match. Must be a string.',
          type: 'string',
        },
        {
          name: 'suffix',
          documentation: `The string suffix. 
          
          May itself be a matcher, and will be passed the string with the prefix stripped.
            
            If you don't mind what the suffix is, pass an \`AnyString\` matcher`,
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'example',
          documentation: 'An example string to use during contract definition',
          type: 'string',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
    {
      name: 'StringSuffix',
      type: 'MatchStringSuffix',
      documentation: `Matches a string that ends with the given suffix.`,
      params: [
        {
          name: 'prefix',
          documentation:
            'The prefix to match. May itself be a matcher, and will be passed the string with the suffix stripped.',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'suffix',
          documentation:
            'The suffix to match. Must be a string, and acceptable strings will match this suffix exactly.',
          type: 'string',
        },
      ],
      constantParams: {
        resolvesTo: 'string',
      },
    },
  ],
  dataObjects: [],
};

export default strings;
