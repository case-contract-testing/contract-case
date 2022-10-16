// Note that the Arbitrary response type should be updated to a more specific type
import type { ArbitraryResponseType } from '../model/responses';

// when we actually implement services
const base = (ip: string): ArbitraryResponseType => ({
  hello: ip,
});

export default base;
