import {
  CoreStringPrefixMatcher,
  CoreHttpStatusCodeMatcher,
  CoreUrlEncodedStringMatcher,
} from '@contract-case/case-entities-internal';
import {
  BasicAuthHeaderValue,
  BearerTokenHeaderValue,
  HttpStatusCode,
  UriEncodedString,
} from '.';

describe('http matchers', () => {
  it('basic auth matcher compiles', () => {
    // Yes, it's really a CoreStringPrefixMatcher
    const a: CoreStringPrefixMatcher = new BasicAuthHeaderValue('user', 'pass');

    expect(a).not.toBeNull();
  });

  it('bearer auth matcher compiles', () => {
    // Yes, it's really a CoreStringPrefixMatcher
    const a: CoreStringPrefixMatcher = new BearerTokenHeaderValue('TOKEN');

    expect(a).not.toBeNull();
  });

  it('http status code matcher compiles', () => {
    const a: CoreHttpStatusCodeMatcher = new HttpStatusCode('400');

    expect(a).not.toBeNull();
  });

  it('multiple http status code matcher compiles', () => {
    const a: CoreHttpStatusCodeMatcher = new HttpStatusCode(['400', '404']);

    expect(a).not.toBeNull();
  });

  it('Uri Encoded String', () => {
    const a: CoreUrlEncodedStringMatcher = new UriEncodedString('foo');

    expect(a).not.toBeNull();
  });
});
