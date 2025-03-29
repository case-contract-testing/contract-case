 
import {
  ProduceHttpResponse,
  ConsumeHttpResponse,
} from '@contract-case/case-core-plugin-http-dsl';
import { HttpRequest } from '../../matchers/http';

import { WillReceiveHttpRequest, WillSendHttpRequest } from '.';

describe('http mocks', () => {
  describe('will receive http request', () => {
    it('compiles', () => {
      const a: ProduceHttpResponse = new WillReceiveHttpRequest({
        request: new HttpRequest({ path: '/', method: 'get' }),
        response: { status: '200' },
      });
      expect(a).not.toBe(null);
    });
  });

  describe('will send http request', () => {
    it('compiles', () => {
      const a: ConsumeHttpResponse = new WillSendHttpRequest({
        request: new HttpRequest({ path: '/', method: 'get' }),
        response: { status: '200' },
      });
      expect(a).not.toBe(null);
    });
  });
});
