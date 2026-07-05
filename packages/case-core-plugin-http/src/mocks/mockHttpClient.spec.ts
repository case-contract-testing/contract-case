import * as http from 'node:http';
import { AddressInfo } from 'node:net';

import {
  CoreHttpRequestResponseMatcherPair,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  DataContext,
  Logger,
  MatchContext,
} from '@contract-case/case-plugin-base';
import { setupHttpResponseConsumer } from './mockHttpClient';

const EMPTY_LOGGER = {
  error(): Promise<void> {
    return Promise.resolve();
  },
  warn(): Promise<void> {
    return Promise.resolve();
  },
  debug(): Promise<void> {
    return Promise.resolve();
  },
  maintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
  deepMaintainerDebug(): Promise<void> {
    return Promise.resolve();
  },
};

const EMPTY_DATA_CONTEXT: DataContext = {
  '_case:currentRun:context:logLevel': 'none',
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:location': ['DURING_TESTS'],
  '_case:currentRun:context:connectorClient': 'Tests',
  '_case:context:matchBy': 'type',
  '_case:context:serialisableTo': 'json',
  '_case:currentRun:context:contractMode': 'write',
  '_case:currentRun:context:contractsToWrite': ['hash', 'main'],
  '_case:currentRun:context:printResults': true,
  '_case:currentRun:context:testName': '',
  '_case:currentRun:context:variables': {},
  '_case:currentRun:context:defaultConfig': {},
  '_case:currentRun:context:autoVersionFrom': 'TAG',
  logger: EMPTY_LOGGER,
  resultPrinter: {
    printError: () => 'PRINT_ERROR',
    printFailureTitle: () => 'PRINT_FAILURE',
    printSuccessTitle: () => 'PRINT_SUCCESS',
    printDownloadedContract: () => 'PRINT_DOWNLOADED_CONTRACT',
  },
  makeLogger(): Logger {
    return EMPTY_LOGGER;
  },
} as const;

const MOCK_LOOKUP = {
  lookupMatcher: () => [],
  saveLookupableMatcher: () => {},
  addDefaultVariable: (): [name: string, value: string] => ['name', 'value'],
  addStateVariable: (): [name: string, value: string] => ['name', 'value'],
  lookupVariable: () => 'TEST VALUE',
  invokeFunctionByHandle: () => Promise.resolve('returnValue'),
};

const createMockMatchContext = (
  descendAndStripResult: unknown,
  baseUrl: string,
): MatchContext => ({
  ...EMPTY_DATA_CONTEXT,
  '_case:currentRun:context:baseUrlUnderTest': baseUrl,
  descendAndCheck: () => Promise.resolve([]),
  descendAndStrip: () => descendAndStripResult,
  descendAndDescribe: () => {
    throw new Error('Not expected to be called in these tests');
  },
  selfVerify: () => Promise.resolve(),
  ...MOCK_LOOKUP,
  makeLookup: () => MOCK_LOOKUP,
  descendAndValidate: () => Promise.resolve(),
});

type ReceivedRequest = {
  method: string | undefined;
  url: string | undefined;
  headers: http.IncomingHttpHeaders;
  body: string;
};

describe('setupHttpResponseConsumer', () => {
  let server: http.Server;
  let baseUrl: string;
  let receivedRequests: ReceivedRequest[];

  beforeAll(async () => {
    server = http.createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        receivedRequests.push({
          method: req.method,
          url: req.url,
          headers: req.headers,
          body,
        });
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'OK' }));
      });
    });
    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => resolve());
    });
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  beforeEach(() => {
    receivedRequests = [];
  });

  afterAll(
    () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  );

  const matcherPair: CoreHttpRequestResponseMatcherPair = {
    request: {
      '_case:matcher:type': HTTP_REQUEST_MATCHER_TYPE,
      method: 'POST',
      path: '/some/path',
    },
    response: {
      '_case:matcher:type': HTTP_RESPONSE_MATCHER_TYPE,
      status: 200,
    },
  };

  it('sends the request body to the server under test', async () => {
    const expectedBody = { some: 'body', nested: { value: 2 } };
    const context = createMockMatchContext(
      {
        method: 'POST',
        path: '/some/path',
        body: expectedBody,
      },
      baseUrl,
    );

    const mock = await setupHttpResponseConsumer(matcherPair, context);
    const { actual } = await mock.assertableData();

    expect(receivedRequests).toHaveLength(1);
    expect(receivedRequests[0]?.method).toBe('POST');
    expect(receivedRequests[0]?.url).toBe('/some/path');
    expect(JSON.parse(receivedRequests[0]?.body ?? '')).toEqual(expectedBody);
    expect(actual).toEqual({ body: { status: 'OK' }, status: 200 });
  });

  it('sends the request headers to the server under test', async () => {
    const context = createMockMatchContext(
      {
        method: 'GET',
        path: '/some/path',
        headers: { accept: 'application/json', 'x-custom-header': 'someValue' },
      },
      baseUrl,
    );

    const mock = await setupHttpResponseConsumer(matcherPair, context);
    await mock.assertableData();

    expect(receivedRequests).toHaveLength(1);
    expect(receivedRequests[0]?.headers).toEqual(
      expect.objectContaining({
        accept: 'application/json',
        'x-custom-header': 'someValue',
      }),
    );
  });

  it('sends the query parameters to the server under test', async () => {
    const context = createMockMatchContext(
      {
        method: 'GET',
        path: '/some/path',
        query: { foo: 'bar', baz: ['one', 'two'] },
      },
      baseUrl,
    );

    const mock = await setupHttpResponseConsumer(matcherPair, context);
    await mock.assertableData();

    expect(receivedRequests).toHaveLength(1);
    const url = new URL(receivedRequests[0]?.url ?? '', baseUrl);
    expect(url.pathname).toBe('/some/path');
    expect(url.searchParams.get('foo')).toBe('bar');
    expect(url.searchParams.getAll('baz[]')).toEqual(['one', 'two']);
  });

  it('sends no body when the expected request has none', async () => {
    const context = createMockMatchContext(
      {
        method: 'GET',
        path: '/some/path',
      },
      baseUrl,
    );

    const mock = await setupHttpResponseConsumer(matcherPair, context);
    const { actual } = await mock.assertableData();

    expect(receivedRequests).toHaveLength(1);
    expect(receivedRequests[0]?.body).toBe('');
    expect(actual).toEqual({ body: { status: 'OK' }, status: 200 });
  });
});
