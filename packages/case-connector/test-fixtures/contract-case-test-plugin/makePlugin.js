'use strict';

// Builds a minimal but well-formed ContractCasePlugin. Each entry point of
// this fixture package uses a different name, so that the plugins can all be
// loaded in the same test run without colliding in the (process-global)
// executor registries.
module.exports.makePlugin = (name) => ({
  description: {
    humanReadableName: `Test fixture plugin (${name})`,
    shortName: `test-fixture-${name}`,
    uniqueMachineName: `test-fixture:${name}`,
    version: '1.0.0',
  },
  matcherExecutors: {
    [`test-fixture:${name}:Matcher`]: {
      describe: () => ({ kind: 'message', message: `test fixture ${name}` }),
      check: () => Promise.resolve([]),
      strip: () => `stripped-by-${name}`,
      validate: () => Promise.resolve(),
    },
  },
  setupMocks: {},
});
