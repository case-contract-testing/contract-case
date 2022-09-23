import axios from 'axios';
import { willSendHttpGet } from 'dsl/Matchers/http';

const defaultBaseUrl = 'http://your-api.example.com';

const api = (baseUrl = defaultBaseUrl) => ({
  getHealth: () =>
    axios.get(`${baseUrl}/health`).then((response) => response.data.status),
  /* other endpoints here */
});

/*

willSend(httpGet({ path: '/health' })).canRecieve({
  contentType: 'application/json',
  status: 200,
  body: { status: 'up' },
});

*/

describe.skip('simple get endpoint', () => {
  beforeEach(() => {
    willSendHttpGet({
      path: '/health',
      response: {
        status: 200,
        body: { status: 'up' },
      },
    });
  });
  it('returns server health', () => {
    const client = api('http://127.0.0.1:8081');

    return client.getHealth().then((health) => {
      expect(health).toEqual('up');
    });
  });
});
