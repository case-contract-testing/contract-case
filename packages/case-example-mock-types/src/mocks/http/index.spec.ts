/* eslint-disable jest/expect-expect */
import { http } from '@contract-case/test-equivalence-matchers';

import {
  ProduceHttpResponse,
  ConsumeHttpResponse,
} from '@contract-case/case-core-plugin-http-dsl';
import { WillReceiveHttpRequest, WillSendHttpRequest } from '.';

describe('http mocks', () => {
  describe('will receive http request', () => {
    it('compiles', () => {
      const a: ProduceHttpResponse = new WillReceiveHttpRequest({
        request: new http.HttpRequest({ path: '/', method: 'get' }),
        response: { status: '200' },
      });
      expect(a).not.toBe(null);
    });
  });

  describe('will send http request', () => {
    it('compiles', () => {
      const a: ConsumeHttpResponse = new WillSendHttpRequest({
        request: new http.HttpRequest({ path: '/', method: 'get' }),
        response: { status: '200' },
      });
      expect(a).not.toBe(null);
    });
  });
});
