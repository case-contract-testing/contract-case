import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

export type LookupType = 'matcher' | 'variable:default' | 'variable:state';

export type LookupMap = Record<string, AnyCaseMatcherOrData>;
