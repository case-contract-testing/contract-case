import * as path from 'node:path';
import { MatcherDslDeclaration } from '../../typeSystem/types';
import {
  JavaDescriptor,
  JavaFieldDescriptor,
  JavaConstructorDescriptor,
} from './types';
import { convertMarkdownToJavadoc } from './documentation';

/**
 * Creates field descriptors for all the fields that need to be generated.
 *
 * @param definition - The matcher definition containing parameters
 * @returns Array of field descriptors
 */
const createFieldDescriptors = (
  definition: MatcherDslDeclaration,
): JavaFieldDescriptor[] => [
  {
    name: 'type',
    type: 'string',
    documentation: 'ContractCase\'s internal type for this element',
    jsonPropertyName: '_case:matcher:type',
    optional: false,
  },
  ...definition.params.map((param) => ({
    name: param.name,
    type: param.type,
    documentation: convertMarkdownToJavadoc(param.documentation),
    jsonPropertyName:
      param.jsonPropertyName != null
        ? param.jsonPropertyName
        : `_case:matcher:${param.name}`,
    optional: !!param.optional,
  })),
];
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
    documentation: convertMarkdownToJavadoc(definition.documentation),
    typeValue,
    optionalParamsToSetNull: optionalParams,
  });

  // Second constructor (all params) if there are optional params
  if (optionalParams.length > 0) {
    constructors.push({
      parameters: [...requiredParams, ...optionalParams],
      documentation: convertMarkdownToJavadoc(definition.documentation),
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
 * @param category - the category for this matcher, used for grouping files together
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
  className: definition.name,
  classDocumentation: convertMarkdownToJavadoc(definition.documentation),
  genericTypeParameter: 'M',
  fields: createFieldDescriptors(definition),
  constructors: createConstructorDescriptors(definition, namespace),
  currentRunModifiers:
    definition.currentRunModifiers != null
      ? definition.currentRunModifiers
      : {},
  contextModifiers:
    definition.contextModifiers != null ? definition.contextModifiers : {},
});
