import type { Assertable, MOCK_HTTP_SERVER } from 'entities/types';

export * from './boundaries';
export * from './boundaries/types';

// TODO: Move this to be in the boundaries properly
export { readContract } from 'connectors/contract/writer/fileSystem';

export type HttpRequestConfig = Assertable<typeof MOCK_HTTP_SERVER>['config'];
