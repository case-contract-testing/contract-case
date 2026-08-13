'use strict';

// A well-formed plugin that doesn't declare a DSL, for testing the error
// message users get when there's nothing to generate.
module.exports = {
  description: {
    humanReadableName: 'Test DSL fixture plugin (without a DSL)',
    shortName: 'test-dsl-fixture-no-dsl',
    uniqueMachineName: 'test-dsl-fixture:plugin-no-dsl',
    version: '1.0.0',
  },
  matcherExecutors: {},
  setupMocks: {},
};
