import {
  AnyMockDescriptor,
  AnyState,
} from '@contract-case/case-plugin-dsl-types';
import { CaseError } from '../matchers/errors.types';

// TODO: Move these CaseExample types back into the core package
// They're only in the base, because of the result printer type on the context

/**
 * The base type that all examples extend.
 *
 * This isn't really part of the plugin interface; it's only here
 * because the ResultPrinter needs it, and the context holds the result printer.
 *
 * @public
 */
interface BaseCaseExample {
  readonly states: AnyState[];
  readonly mock: AnyMockDescriptor;
}

/**
 * An example that has been successfully run and verified (either as part of a
 * contract definition, or as part of a contract verification).
 *
 * TODO: It would be best to make it clear whether an example has been defined
 * or verified. This would make it hard to accidentally assume a verification
 * that wasn't run was successful.
 *
 * This isn't really part of the plugin interface; it's only here
 * because the ResultPrinter needs it, and the context holds the result printer.
 *
 * @public
 */
interface SuccessfulCaseExample extends BaseCaseExample {
  readonly result: 'VERIFIED';
}

/**
 * An example that hasn't been verified in this run.
 *
 * TODO: It would be best to make it clear whether an example has been defined
 * or verified. This would make it hard to accidentally assume a verification
 * that wasn't run was successful.
 *
 * This isn't really part of the plugin interface; it's only here
 * because the ResultPrinter needs it, and the context holds the result printer.
 *
 * @public
 */
interface PendingCaseExample extends BaseCaseExample {
  readonly result: 'PENDING';
}

/**
 * An example where verification was attempted but failed. This might be due to
 * a configuration, matching, or core error.
 *
 * TODO: It would be best to make it clear whether an example has been defined
 * or verified. This would make it hard to accidentally assume a verification
 * that wasn't run was successful.
 *
 * This isn't really part of the plugin interface; it's only here
 * because the ResultPrinter needs it, and the context holds the result printer.
 *
 * @public
 */
interface FailedCaseExample extends BaseCaseExample {
  readonly result: 'FAILED';
  readonly errors: CaseError[];
}

/**
 * All states of Examples.
 *
 * This isn't really part of the plugin interface; it's only here
 * because the ResultPrinter needs it.
 *
 * @public
 */
export type CaseExample =
  | SuccessfulCaseExample
  | FailedCaseExample
  | PendingCaseExample;
