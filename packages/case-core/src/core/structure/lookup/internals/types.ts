import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-base';

export type LookupType = 'matcher' | 'variable:default' | 'variable:state';

export type LookupMap = Record<string, AnyCaseMatcherOrData>;
