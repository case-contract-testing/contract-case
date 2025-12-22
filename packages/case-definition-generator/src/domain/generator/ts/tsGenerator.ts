import {
  CaseCoreError,
  isPassToMatcher,
  MatcherDslDeclaration,
  ParameterDeclaration,
  ParameterType,
} from '@contract-case/case-plugin-base';
import {
  toCamelCase,
  toScreamingSnakeCase,
} from '../../naming/stringIdiomTransformations';
import { UnreachableError } from '../../../entities/errors/unreachableError';

const getTsType = (paramType: ParameterType): string => {
  if (typeof paramType === 'string') {
    return paramType;
  }
  if (paramType.kind === 'array') {
    return `${getTsType(paramType.type)}[]`;
  }
  if (isPassToMatcher(paramType)) {
    throw new CaseCoreError('PassToMatcher is currently unimplemented');
  }
  throw new UnreachableError(
    `Unknown parameter type for TypeScript: ${paramType}`,
    paramType,
  );
};

export const generateDslCode = (
  definition: MatcherDslDeclaration,
  namespace: string,
): string => {
  // 1. Constant
  const constName = `${toScreamingSnakeCase(definition.type)}_TYPE`;
  const constValue = `'${namespace}:${definition.type}' as const;`;

  const funcName = toCamelCase(definition.name);

  const interfaceName = `Core${definition.name}Matches`;
  const interfaceFields = [
    `  '_case:matcher:type': typeof ${constName};`,
    ...definition.params.map((param) => {
      const tsType = getTsType(param.type);
      const optional = param.optional ? '?' : '';
      return `  '_case:matcher:${param.name}'${optional}: ${tsType};`;
    }),
  ].join('\n');

  const funcParams = definition.params
    .map((param: ParameterDeclaration) => {
      const tsType = getTsType(param.type);
      const optional = param.optional ? '?' : '';
      return `${param.name}${optional}: ${tsType}`;
    })
    .join(', ');

  const funcReturnType = interfaceName;
  const funcBodyFields = [
    `  '_case:matcher:type': ${constName},`,
    ...definition.params.map((param: ParameterDeclaration) => {
      const key = `'_case:matcher:${param.name}'`;
      if (param.optional) {
        return `  ...(${param.name} !== undefined ? { ${key}: ${param.name} } : {}),`;
      }
      return `  ${key}: ${param.name},`;
    }),
  ].join('\n');

  // Compose the code
  return `
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

// Constant
export const ${constName} = ${constValue}

// Interface
export interface ${interfaceName} {
${interfaceFields}
}

// Factory Function
/**
 * ${definition.documentation}
 *
${definition.params
  .map((param) => ` * @param ${param.name} - ${param.documentation || ''}`)
  .join('\n')}
 */
export const ${funcName} = (${funcParams}): ${funcReturnType} => ({
${funcBodyFields}
});
`;
};
