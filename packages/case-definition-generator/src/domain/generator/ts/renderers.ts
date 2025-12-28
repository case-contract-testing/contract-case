import { UnreachableError } from '../../../entities/errors/unreachableError';
import { toCamelCase } from '../../naming';

export const functionNameFor = (definition: { name: string }): string =>
  toCamelCase(definition.name);

const interfacePrefix = (kind: 'matcher' | 'state' | 'interaction') => {
  switch (kind) {
    case 'matcher': {
      return 'Matcher';
    }
    case 'state':
      return '';
    case 'interaction':
      return 'Mock';
    default:
      throw new UnreachableError('Missing the kind for interfacePrefix', kind);
  }
};

export const toInterfaceName = (definition: {
  name: string;
  kind?: 'matcher' | 'state' | 'interaction';
}): string =>
  `${interfacePrefix(definition.kind ?? 'matcher')}${definition.name}`;

const moduleFor = (definition: { name: string; category: string }): string =>
  `${definition.category}/${toCamelCase(definition.name)}`;

export const importModuleFor = (
  definition: {
    name: string;
    category: string;
  },
  buildContext: {
    rootCategory: string;
    currentKind: 'matcher' | 'state' | 'interaction';
  },
): string => {
  if (buildContext.currentKind !== 'matcher') {
    return `../../matchers/${moduleFor(definition)}`;
  }
  return definition.category === buildContext.rootCategory
    ? `./${toCamelCase(definition.name)}`
    : `../${moduleFor(definition)}`;
};
export const fileNameFor = (definition: {
  name: string;
  category: string;
}): string => `${moduleFor(definition)}.ts`;
