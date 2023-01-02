import { state } from 'entities/states/states';
import type { SetupNamedState } from 'entities/states/types';

export const inState = (name: string): SetupNamedState => state(name);
