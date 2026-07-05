import {
  ServerInterceptingCall,
  ServerInterceptor,
  status,
} from '@grpc/grpc-js';
import { createHash, timingSafeEqual } from 'node:crypto';

// Comparing hashes rather than the raw values keeps the comparison
// constant-time even when the provided token has a different length
const hashToken = (token: string): Buffer =>
  createHash('sha256').update(token, 'utf8').digest();

/**
 * Creates a server interceptor that rejects any call which doesn't present
 * the expected token in its `authorization` metadata.
 *
 * The token is shared with the client that spawned this connector via the
 * `CASE_CONNECTOR_TOKEN` environment variable, so only that client (or
 * processes it chooses to share the token with) can invoke the connector.
 *
 * @param expectedToken - the token that callers must present
 * @returns a {@link ServerInterceptor} enforcing the token
 */
export const makeAuthTokenInterceptor =
  (expectedToken: string): ServerInterceptor =>
  (_methodDescriptor, call) =>
    new ServerInterceptingCall(call, {
      start: (next) => {
        next({
          onReceiveMetadata: (metadata, mdNext) => {
            const provided = metadata.get('authorization');
            if (
              provided.length === 1 &&
              typeof provided[0] === 'string' &&
              timingSafeEqual(hashToken(provided[0]), hashToken(expectedToken))
            ) {
              mdNext(metadata);
            } else {
              call.sendStatus({
                code: status.UNAUTHENTICATED,
                details:
                  "This ContractCase connector requires callers to present the token from the CASE_CONNECTOR_TOKEN environment variable in the 'authorization' metadata of each call",
              });
            }
          },
        });
      },
    });
