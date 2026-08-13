'use strict';

// Simulates hand-written CommonJS: `module.exports = plugin`. When this is
// loaded with a dynamic import(), the plugin ends up at `namespace.default`.
const { makePlugin } = require('./makePlugin');

module.exports = makePlugin('module-exports');
