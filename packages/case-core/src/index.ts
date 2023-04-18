import type { Assertable, MOCK_HTTP_SERVER } from './entities/types';

export * from './boundaries';
export * from './boundaries/types';

export type HttpRequestConfig = Assertable<typeof MOCK_HTTP_SERVER>['config'];
