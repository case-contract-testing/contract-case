// Simulates a native ESM plugin: `export default plugin`. When this is
// loaded with a dynamic import(), the plugin ends up at `namespace.default`.
import { createRequire } from 'node:module';

const { makePlugin } = createRequire(import.meta.url)('./makePlugin');

export default makePlugin('esm-default');
