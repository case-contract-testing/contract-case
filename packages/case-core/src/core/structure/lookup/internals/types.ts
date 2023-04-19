import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';

export type LookupType = 'matcher' | 'variable:default' | 'variable:state';

export type LookupMap = Record<string, AnyCaseMatcherOrData>;
