import { InternalObjectDeclaration } from '../../domain/typeSystem/internals';
import { UnreachableError } from '../errors/unreachableError';

/**
 * Returns the conventional folder to put this kind of object in within a DSL.
 * This will always be lowercase, one plural word.
 */
export const folderForKind = (
  kind: InternalObjectDeclaration['kind'],
): string => {
  switch (kind) {
    case 'matcher':
      return 'matchers';
    case 'interaction':
      return 'interactions';
    case 'state':
      return 'states';
    default:
      throw new UnreachableError(`Unknown kind: ${kind}`, kind);
  }
};
