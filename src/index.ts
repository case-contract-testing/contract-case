import type { HttpTestContext } from 'entities/context/types';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';

export const prepareCase = <T extends AnyCaseNodeType>(
  testDescription: DataOrCaseNodeFor<T>
): Promise<HttpTestContext> =>
  Promise.resolve({ baseUrl: JSON.stringify(testDescription) });
