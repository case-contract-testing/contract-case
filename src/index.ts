import type { HttpTestContext } from 'core/context/types';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'core/nodes/matchers/types';

export const prepareCase = <T extends AnyCaseNodeType>(
  testDescription: DataOrCaseNodeFor<T>
): Promise<HttpTestContext> =>
  Promise.resolve({ baseUrl: JSON.stringify(testDescription) });
