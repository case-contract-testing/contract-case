import type { AnyCaseNodeOrData } from '../../../../entities/types';

export type LookupType = 'matcher' | 'variable:default' | 'variable:state';

export type LookupMap = Record<string, AnyCaseNodeOrData>;
