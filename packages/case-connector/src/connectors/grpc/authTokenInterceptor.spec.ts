import {
  Metadata,
  Server,
  ServerCredentials,
  ServerDuplexStream,
  StatusObject,
  credentials,
  status,
} from '@grpc/grpc-js';
import {
  ContractCaseClient,
  ContractCaseService,
} from '@contract-case/case-connector-proto';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

import { makeAuthTokenInterceptor } from './authTokenInterceptor.js';

const EXPECTED_TOKEN = 'an-unguessable-test-token';

// Handlers that immediately close the stream, so that authenticated
// calls complete with an OK status without invoking any real behaviour
const stubHandlers = {
  contractDefinition: (call: ServerDuplexStream<unknown, unknown>) =>
    call.end(),
  contractVerification: (call: ServerDuplexStream<unknown, unknown>) =>
    call.end(),
};

describe('auth token interceptor', () => {
  let server: Server;
  let port: number;

  beforeAll(async () => {
    server = new Server({
      interceptors: [makeAuthTokenInterceptor(EXPECTED_TOKEN)],
    });
    server.addService(ContractCaseService, stubHandlers);
    port = await new Promise((resolve, reject) => {
      server.bindAsync(
        'localhost:0',
        ServerCredentials.createInsecure(),
        (error, boundPort) =>
          error != null ? reject(error) : resolve(boundPort),
      );
    });
  });

  afterAll(() => {
    server.forceShutdown();
  });

  const callStatus = (metadata: Metadata): Promise<StatusObject> =>
    new Promise((resolve) => {
      const client = new ContractCaseClient(
        `localhost:${port}`,
        credentials.createInsecure(),
      );
      const call = client.contractDefinition(metadata);
      // Errors also arrive via the 'status' event; this
      // listener just prevents an unhandled error event
      call.on('error', () => {});
      call.on('status', (callResult) => {
        client.close();
        resolve(callResult);
      });
      call.end();
    });

  const metadataWithAuth = (token: string): Metadata => {
    const metadata = new Metadata();
    metadata.set('authorization', token);
    return metadata;
  };

  it('rejects calls without an authorization token', async () => {
    const result = await callStatus(new Metadata());

    expect(result.code).toBe(status.UNAUTHENTICATED);
    expect(result.details).toContain('CASE_CONNECTOR_TOKEN');
  });

  it('rejects calls with the wrong token', async () => {
    const result = await callStatus(metadataWithAuth('some-wrong-token'));

    expect(result.code).toBe(status.UNAUTHENTICATED);
  });

  it('rejects calls where the token has extra content', async () => {
    const result = await callStatus(metadataWithAuth(`${EXPECTED_TOKEN}x`));

    expect(result.code).toBe(status.UNAUTHENTICATED);
  });

  it('accepts calls with the correct token', async () => {
    const result = await callStatus(metadataWithAuth(EXPECTED_TOKEN));

    expect(result.code).toBe(status.OK);
  });
});
