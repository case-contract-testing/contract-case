'use strict';

// Simulates CommonJS with individual named exports - the only style that
// worked before the module namespace unwrapping was added. Kept to confirm
// it still works.
const { makePlugin } = require('./makePlugin');

const plugin = makePlugin('named-exports');

exports.description = plugin.description;
exports.matcherExecutors = plugin.matcherExecutors;
exports.setupMocks = plugin.setupMocks;
