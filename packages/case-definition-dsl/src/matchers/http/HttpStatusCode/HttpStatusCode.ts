import { HTTP_STATUS_CODE_MATCHER_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { AnyMatcherWithExample } from '../../base';
import { codesToExample } from './codeToExample';

/**
 * Matches an HTTP status code
 * @public
 */
export class HttpStatusCode extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:example': number;

  /** @internal */
  readonly '_case:matcher:rule': string | string[];

  /** @internal */
  readonly '_case:matcher:resolvesTo': 'HttpStatusCode';

  /**
   * @param statusCode - The http status code to match, expressed as a number or string (eg `200`, `"404"` or `"4XX"`).
   *
   * Matching can be relaxed with `X`, eg `"4XX"` or `"5XX"`. This is useful for error handling.
   *
   * If you need to match multiple specific statues, you can provide an array of string or numbers.
   * This behaviour is provided so that you can offer flexibility to the
   * implementation if the code path for multiple status codes is exactly the
   * same. It is not appropriate to use multiple status codes if the code paths
   * are intended to be different. For more context, see [the section on optional values
   * in the documentation](https://case.contract-testing.io/docs/faq#how-do-i-tell-contractcase-that-a-field-is-optional) for more details.
   */
  constructor(statusCode: string | string[]) {
    super(HTTP_STATUS_CODE_MATCHER_TYPE, codesToExample(statusCode));
    this['_case:matcher:rule'] = Array.isArray(statusCode)
      ? statusCode.map((r) => `${r}`)
      : `${statusCode}`;
  }

  /**
   * For non-TypeScript implementations (see `AnyMatcher.toJSON`)
   *
   * @privateRemarks
   * This comment and the implementation is boilerplate on all matchers to avoid
   * outputting duplicate unimportant documentation on all matcher classes of
   * the docs. Only modify this comment or the implementation via search and replace.
   */
  override toJSON(): unknown {
    return super.toJSON();
  }
}
