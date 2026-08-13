'use strict';

// A minimal plugin that declares a DSL, for testing DSL generation from a
// plugin module loaded by name.
module.exports = {
  description: {
    humanReadableName: 'Test DSL fixture plugin',
    shortName: 'test-dsl-fixture',
    uniqueMachineName: 'test-dsl-fixture:plugin',
    version: '1.0.0',
  },
  matcherExecutors: {},
  setupMocks: {},
  dsl: {
    namespace: 'testfixture',
    category: 'examples',
    matchers: [
      {
        name: 'AnyUlid',
        type: 'AnyUlid',
        documentation: 'Matches any ULID string.',
        params: [
          {
            name: 'example',
            documentation:
              'An optional example ULID to use when writing the contract.',
            type: 'string',
            optional: true,
          },
        ],
        constantParams: { resolvesTo: 'string' },
      },
    ],
    interactions: [],
  },
};
