import { Metadata, credentials, status } from '@grpc/grpc-js';
import { ContractCaseClient } from '@contract-case/case-connector-proto';
import { describe, expect, it, afterEach, vi } from 'vitest';

import { main } from './contract-case-stream.mjs';

describe('connector server startup', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  const mockExit = () =>
    vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });

  it('refuses to start when CASE_CONNECTOR_TOKEN is not set', () => {
    vi.stubEnv('CASE_CONNECTOR_TOKEN', undefined);
    const exit = mockExit();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => main()).toThrow('process.exit called');

    expect(exit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining('CASE_CONNECTOR_TOKEN'),
    );
  });

  it('refuses to start when CASE_CONNECTOR_TOKEN is empty', () => {
    vi.stubEnv('CASE_CONNECTOR_TOKEN', '');
    mockExit();

    expect(() => main()).toThrow('process.exit called');
  });

  it('requires the token on calls to the started server', async () => {
    vi.stubEnv('CASE_CONNECTOR_TOKEN', 'a-token-for-this-test');
    // Suppress the port announcement during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});

    const { server, port } = await main();
    try {
      const result = await new Promise<{ code: status }>((resolve) => {
        const client = new ContractCaseClient(
          `localhost:${port}`,
          credentials.createInsecure(),
        );
        const call = client.contractDefinition(new Metadata());
        call.on('error', () => {});
        call.on('status', (callResult) => {
          client.close();
          resolve(callResult);
        });
        call.end();
      });

      expect(result.code).toBe(status.UNAUTHENTICATED);
    } finally {
      server.forceShutdown();
    }
  });
});
