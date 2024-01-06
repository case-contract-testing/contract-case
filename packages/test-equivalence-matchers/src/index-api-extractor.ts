/**
 * The core ContractCase TestEquivalenceMatchers.
 *
 * @remarks
 *
 * Use these to generalise your tests, avoiding the need to depend on specific
 * data during verification. It's not about defining the whole type system, the
 * idea is that you are saying "any message that matches this Test Equivalence
 * Matcher is considered covered by this test".
 *
 * For more information, see {@link https://case.contract-testing.io/docs/defining-contracts/relaxing-tests | the documentation here}
 *
 * @packageDocumentation
 */

import * as arrays from './nodes/arrays';
import * as base from './nodes/base';
import * as convenience from './nodes/convenience';
import * as http from './nodes/http';
import * as modifiers from './nodes/modifiers';
import * as objects from './nodes/objects';
import * as primitives from './nodes/primitives';
import * as strings from './nodes/strings';

export * from './types';

export { arrays };
export { base };
export { convenience };
export { http };
export { modifiers };
export { objects };
export { primitives };
export { strings };
