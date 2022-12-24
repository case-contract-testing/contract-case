import { state } from 'entities/nodes/states/states';
import type { SetupNamedState } from 'entities/nodes/states/types';

export const inState = (name: string): SetupNamedState => state(name);
