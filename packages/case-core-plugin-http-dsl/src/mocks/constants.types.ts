export type HttpMockDescriptorTypes =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT;

export const MOCK_HTTP_SERVER = '_case:MockHttpServer' as const;
export const MOCK_HTTP_CLIENT = '_case:MockHttpClient' as const;
