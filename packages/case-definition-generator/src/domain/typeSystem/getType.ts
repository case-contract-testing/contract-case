import {
  TypeContainer,
  ParameterType,
  isTypeContainer,
} from '@contract-case/case-plugin-base';
import { LanguageTypes } from './typeSystem.types';

/**
 * Converts a TypeContainer to its corresponding Java type string
 * @param container - The type container to convert
 * @returns The Java type string representation
 */
const containerType = (
  container: TypeContainer,
  languageTypes: LanguageTypes,
): string => {
  switch (container.kind) {
    case 'array':
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return languageTypes.array(getType(container.type, languageTypes));
    default:
      throw new Error(`Unknown type container kind: ${container.kind}`);
  }
};

export const getType = (
  parameterType: ParameterType,
  languageTypes: LanguageTypes,
): string => {
  if (isTypeContainer(parameterType)) {
    return containerType(parameterType, languageTypes);
  }
  switch (parameterType) {
    case 'AnyCaseMatcherOrData':
      return languageTypes.matcher;
    case 'AnyData':
      return languageTypes.data;
    default:
      throw new Error(`Unknown parameter type: ${parameterType}`);
  }
};
