import {
  MatcherDslDeclaration,
  InteractionDslDeclaration,
  StateObjectDeclaration,
} from '@contract-case/case-plugin-base';

export type InternalMatcherDslDeclaration = MatcherDslDeclaration & {
  kind: 'matcher';
};

export type InternalInteractionDslDeclaration = InteractionDslDeclaration & {
  kind: 'interaction';
};

export type InternalStateObjectDeclaration = StateObjectDeclaration & {
  kind: 'state';
};

export type InternalObjectDeclaration =
  | InternalStateObjectDeclaration
  | InternalMatcherDslDeclaration
  | InternalInteractionDslDeclaration;
