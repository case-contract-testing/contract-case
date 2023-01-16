import { state } from 'entities/states/states';
import type { AnyState } from 'entities/states/types';
import type { AnyCaseNodeOrData } from 'entities/types';

export const inState = (
  name: string,
  variables?: Record<string, AnyCaseNodeOrData>
): AnyState => state(name, variables);
