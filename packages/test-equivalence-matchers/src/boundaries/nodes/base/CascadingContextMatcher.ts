import {
  AnyMatcherOrData,
  CASCADING_CONTEXT_MATCHER_TYPE,
} from '../../../entities';
import { AnyMatcher } from './AnyMatcher';

/**
 * This is a passthrough matcher that does nothing except call the child matcher
 * with the current actual data.
 *
 * It's useful for taking advantage of the context cascading available on all
 * matchers without needing to write you own matcher. Extend it if you want to
 * make a matcher that only changes the context object. If you don't know what
 * this means, you don't need to extend this matcher.
 *
 * Due to limitations with JSii, extending implementations MUST NOT override
 * `toJSON`, or MUST return the result of `super.toJSON()` as part of their
 * toJSON method.
 *
 */
export abstract class CascadingContextMatcher extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': string;

  /** @internal */
  readonly '_case:matcher:child': AnyMatcherOrData;

  private readonly contextModifiers: Record<string, string>;

  private readonly currentRunModifiers: Record<string, string>;

  /**
   * @param child - The matcher to apply these context changes to
   * @param contextModifiers - a map of properties to add to the context object
   * @param currentRunModifiers - a map of properties to add to the current run object.
   */
  constructor(
    child: AnyMatcherOrData,
    contextModifiers: Record<string, string>,
    currentRunModifiers: Record<string, string>
  ) {
    super(CASCADING_CONTEXT_MATCHER_TYPE);
    this['_case:matcher:child'] = child;
    this.contextModifiers = Object.entries(contextModifiers).reduce(
      (acc, [key, value]) => ({ ...acc, [`case:context:${key}`]: value }),
      {}
    );
    this.currentRunModifiers = Object.entries(currentRunModifiers).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`case:currentRun:context:${key}`]: value,
      }),
      {}
    );
  }

  /**
   * If extending this class, do not override this method (or if you do, make
   * sure you call `super.toJSON()`).
   *
   */
  override toJSON(): unknown {
    return Object.entries(this).reduce(
      (acc, [key, value]) =>
        key !== 'contextModifiers' && key !== 'currentRunModifiers'
          ? {
              ...acc,
              [key.startsWith('_') ? key.substring(1) : key]: value,
            }
          : acc,
      { ...this.contextModifiers, ...this.currentRunModifiers }
    );
  }
}
