/* eslint-disable tsdoc/syntax */
/**
 * @packageDocumentation
 *
 * These are the {@link https://case.contract-testing.io/docs/reference/example-types | Mock Types}, test
 * {@link https://case.contract-testing.io/docs/reference/matchers | equivalence matcher types}
 * and the {@link https://case.contract-testing.io/docs/defining-contracts/state-definitions | state descriptors} for CaseExamples.
 *
 * @remarks
 *
 * Use the mock definitions to describe the interactions that you want to test.
 *
 * Use the state descriptions to describe the provider states (if any) that those tests require.
 *
 * Use the Test Equivalence Matchers to generalise your tests, avoiding the need to depend on specific
 * data during verification. It's not about defining the whole type system, the
 * idea is that you are saying "any message that matches this Test Equivalence
 * Matcher is considered covered by this test".
 *
 * For more information, see {@link https://case.contract-testing.io/docs/defining-contracts/relaxing-tests | advice on relaxing tests} or
 * {@link https://case.contracttesting.io | the full documentation}
 *
 */
import * as mocks from './mocks/index-api-extractor';
import * as matchers from './matchers/index-api-extractor';
import * as states from './states';

export { mocks, states, matchers };
