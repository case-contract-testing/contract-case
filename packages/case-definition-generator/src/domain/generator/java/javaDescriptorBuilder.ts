import * as path from 'node:path';
import { MatcherDslDeclaration } from '../../typeSystem/types';
import {
  JavaDescriptor,
  JavaFieldDescriptor,
  JavaConstructorDescriptor,
} from './types';
import { convertMarkdownToJavadoc } from './documentation';
import { InternalObjectDeclaration } from '../../typeSystem/internals';
import { UnreachableError } from '../../../entities/errors/unreachableError';

interface RecursiveRecord {
  [key: string]: string | RecursiveRecord;
}

/**
 * Creates field descriptors for all the fields that need to be generated.
 *
 * @param definition - The matcher definition containing parameters
 * @param kind - What kind of object we're creating
 * @returns Array of field descriptors
 */
const createFieldDescriptors = (
  definition: InternalObjectDeclaration,
): JavaFieldDescriptor[] => [
  {
    name: 'type',
    type: 'string',
    documentation: "ContractCase's internal type for this element",
    jsonPropertyName: `_case:${definition.kind === 'interaction' ? 'mock' : definition.kind}:type`,
    optional: false,
  },
  ...('setup' in definition
    ? [
        {
          name: 'setup',
          type: 'json',
          documentation:
            'Internal boilerplate that determines behaviour during definition (write) and verification (read)',
          jsonPropertyName: '_case:run:context:setup',
          optional: false,
          initialValue: definition.setup as unknown as RecursiveRecord,
        } as const,
      ]
    : []),
  ...definition.params.map((param) => ({
    name: param.name,
    type: param.type,
    documentation: convertMarkdownToJavadoc(param.documentation),
    jsonPropertyName:
      param.jsonPropertyName != null
        ? param.jsonPropertyName
        : `_case:${definition.kind}:${param.name}`,
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
  const requiredParams = definition.params
    .filter((p) => !p.optional)
    .filter((p) => !('initialValue' in p));
  const optionalParams = definition.params
    .filter((p) => p.optional)
    .filter((p) => !('initialValue' in p));
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

const PACKAGE_PATH = ['io', 'contract_testing', 'contractcase', 'dsl'];

const toJavaPackageName = (namespace: string) =>
  namespace.toLowerCase().replace(/[^a-z]/, '_');

/**
 * Gets the package names (as an array of strings) for a given object
 * @param definition - The definition of the DSL object
 * @param category - The category that the object is in
 * @returns Array of package names
 */
const packageFor = (
  definition: InternalObjectDeclaration,
  category: string,
): string[] => {
  // Extracted because TS can't see it otherwise
  const { kind } = definition;
  switch (kind) {
    case 'matcher':
      return [...PACKAGE_PATH, 'matchers', toJavaPackageName(category)];
    case 'interaction':
      return [...PACKAGE_PATH, 'interactions', toJavaPackageName(category)];
    case 'state':
      return [...PACKAGE_PATH, 'states'];
    default:
      throw new UnreachableError(`Unknown kind of object in packageFor`, kind);
  }
};

/**
 * Gets the path for this object
 * @param definition - The definition of the DSL object
 * @param category - The category that the object is in
 * @returns The path for this object
 */
const pathFor = (
  definition: InternalObjectDeclaration,
  category: string,
): string =>
  path.join('src', 'main', 'java', ...packageFor(definition, category));

const baseJavaObject = (
  definition: InternalObjectDeclaration,
  category: string,
) => ({
  packageName: packageFor(definition, category).join('.'),
  basePath: pathFor(definition, category),
  className: definition.name,
  classDocumentation: convertMarkdownToJavadoc(definition.documentation),
  kind: definition.kind,
});

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
  definition: InternalObjectDeclaration,
  category: string,
  namespace: string,
): JavaDescriptor => ({
  ...baseJavaObject(definition, category),
  genericTypeParameter: 'M',
  fields: createFieldDescriptors(definition),
  constructors: createConstructorDescriptors(definition, namespace),
  currentRunModifiers:
    'currentRunModifiers' in definition &&
    definition.currentRunModifiers != null
      ? definition.currentRunModifiers
      : {},
  contextModifiers:
    'contextModifiers' in definition && definition.contextModifiers != null
      ? definition.contextModifiers
      : {},
});
