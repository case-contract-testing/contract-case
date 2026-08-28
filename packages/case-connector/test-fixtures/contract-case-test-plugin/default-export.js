'use strict';

// Simulates the most common real-world packaging: TypeScript compiling
// `export default plugin` to CommonJS. When this is loaded with a dynamic
// import(), the plugin ends up at `namespace.default.default`.
Object.defineProperty(exports, '__esModule', { value: true });
const { makePlugin } = require('./makePlugin');

exports.default = makePlugin('default-export');
