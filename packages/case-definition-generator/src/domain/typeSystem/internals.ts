import { MatcherDslDeclaration, StateObjectDeclaration } from './types';

export type InternalMatcherDslDeclaration = MatcherDslDeclaration & {
  kind: 'matcher';
};

export type InternalStateObjectDeclaration = StateObjectDeclaration & {
  kind: 'state';
};

export type InternalObjectDeclaration =
  | InternalStateObjectDeclaration
  | InternalMatcherDslDeclaration;
