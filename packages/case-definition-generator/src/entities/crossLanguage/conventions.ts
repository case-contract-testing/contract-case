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

/**
 * For within a property name, maps between the kind of the object, and the
 * name to put in a field.
 */
export const kindToPropertyName = (
  kind: InternalObjectDeclaration['kind'],
): string => {
  switch (kind) {
    case 'interaction':
      return 'mock';
    case 'matcher':
      return 'matcher';
    case 'state':
      return 'state';
    default:
      throw new UnreachableError(
        `Unknown kind of object in kindToPropertyName`,
        kind,
      );
  }
};
