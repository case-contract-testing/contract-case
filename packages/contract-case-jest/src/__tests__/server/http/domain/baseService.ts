// Note that the Arbitrary response type should be updated to a more specific type
import type { HelloResponse } from '../model/responses.js';
import type { BaseService } from './types.js';

// when we actually implement services
export const baseService: BaseService = (ip: string): HelloResponse => ({
  hello: ip,
});
