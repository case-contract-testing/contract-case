import { state } from '../../entities/states';
import type { AnyCaseNodeOrData, AnyState } from '../../entities/types';

export const inState = (
  name: string,
  variables?: Record<string, AnyCaseNodeOrData>
): AnyState => state(name, variables);
