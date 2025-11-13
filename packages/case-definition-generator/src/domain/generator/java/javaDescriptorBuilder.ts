import * as path from 'node:path';
import { getType } from '../../typeSystem';
import { LanguageTypes, MatcherDslDeclaration } from '../../typeSystem/types';
import {
  JavaDescriptor,
  JavaFieldDescriptor,
  JavaConstructorDescriptor,
} from './types';

const javaLanguageTypes: LanguageTypes = {
  array: (type) => `List<${type}>`,
  data: 'Object',
  matcher: 'M',
};

/**
 * Determines which imports are needed based on the matcher definition.
 *
 * @param definition - The matcher definition to analyze
 * @returns Array of import statements needed
 */
const determineImports = (definition: MatcherDslDeclaration): string[] => {
  const imports: string[] = [];

  // Check if any parameters are optional (need JsonInclude imports)
  if (definition.params.some((p) => p.optional)) {
    imports.push('import com.fasterxml.jackson.annotation.JsonInclude;');
    imports.push(
      'import com.fasterxml.jackson.annotation.JsonInclude.Include;',
    );
  }

  // Always need JsonProperty
  imports.push('import com.fasterxml.jackson.annotation.JsonProperty;');

  // Check if any parameters are array types (need List import)
  if (
    definition.params.some(
      (p) =>
        typeof p.type === 'object' &&
        p.type.kind &&
        p.type.kind.toLowerCase() === 'array',
    )
  ) {
    imports.push('import java.util.List;');
  }

  return imports;
};

/**
 * Creates field descriptors for all the fields that need to be generated.
 *
 * @param definition - The matcher definition containing parameters
 * @returns Array of field descriptors
 */
const createFieldDescriptors = (
  definition: MatcherDslDeclaration,
): JavaFieldDescriptor[] => {
  const fields: JavaFieldDescriptor[] = [];

  // Add the type field (always present)
  fields.push({
    name: 'type',
    javaType: 'String',
    jsonPropertyName: '_case:matcher:type',
    needsJsonInclude: false,
    isFinal: true,
  });

  // Add fields for each parameter
  definition.params.forEach((param) => {
    const javaType = getType(param.type, javaLanguageTypes);
    const isOptional = !!param.optional;

    fields.push({
      name: param.name,
      javaType,
      jsonPropertyName: `_case:matcher:${param.name}`,
      needsJsonInclude: isOptional,
      isFinal: true,
    });
  });

  return fields;
};

/**
 * Creates constructor descriptors for all the constructors that need to be generated.
 *
 * @param definition - The matcher definition
 * @param namespace - Namespace prefix for the type value
 * @returns Array of constructor descriptors
 */
const createConstructorDescriptors = (
  definition: MatcherDslDeclaration,
  namespace: string,
): JavaConstructorDescriptor[] => {
  const constructors: JavaConstructorDescriptor[] = [];
  const requiredParams = definition.params.filter((p) => !p.optional);
  const optionalParams = definition.params.filter((p) => p.optional);
  const typeValue = `${namespace}:${definition.type}`;

  // First constructor (required params only)
  constructors.push({
    parameters: requiredParams,
    documentation: definition.documentation,
    typeValue,
    optionalParamsToSetNull: optionalParams,
  });

  // Second constructor (all params) if there are optional params
  if (optionalParams.length > 0) {
    constructors.push({
      parameters: [...requiredParams, ...optionalParams],
      documentation: definition.documentation,
      typeValue,
      optionalParamsToSetNull: [],
    });
  }

  return constructors;
};

const MATCHER_PACKAGE_PATH = [
  'io',
  'contract_testing',
  'contractcase',
  'definitions',
  'matchers',
];

const toJavaPackageName = (namespace: string) =>
  namespace.toLowerCase().replace(/[^a-z]/, '_');

/**
 * Builds a complete JavaDescriptor from a MatcherDslDeclaration.
 * This function contains all the decision-making logic about what to generate,
 * separated from the actual generation logic.
 *
 * @param definition - Complete matcher declaration containing name, type, documentation, and parameters
 * @param category - the category for this matcher, used for grouing
 * @param namespace - Namespace prefix for the matcher type
 * @returns JavaDescriptor containing all information needed to generate the Java class
 */
export const buildJavaDescriptor = (
  definition: MatcherDslDeclaration,
  category: string,
  namespace: string,
): JavaDescriptor => ({
  packageName: `${MATCHER_PACKAGE_PATH.join('.')}.${toJavaPackageName(category)}`,
  basePath: path.join(
    'src',
    'main',
    'java',
    ...MATCHER_PACKAGE_PATH,
    toJavaPackageName(category),
  ),
  imports: determineImports(definition),
  className: definition.name,
  classDocumentation: definition.documentation,
  genericTypeParameter: 'M',
  fields: createFieldDescriptors(definition),
  constructors: createConstructorDescriptors(definition, namespace),
});
