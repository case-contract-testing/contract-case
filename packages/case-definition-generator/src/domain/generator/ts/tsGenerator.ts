import {
  CaseCoreError,
  isPassToMatcher,
  ParameterDeclaration,
  ParameterType,
} from '@contract-case/case-plugin-base';
import prettier from 'prettier';
import ts, { ObjectLiteralElementLike } from 'typescript';
import { UnreachableError } from '../../../entities/errors/unreachableError';
import { LanguageGenerator } from '../../types';
import { GeneratedFile } from '../types';
import { InternalObjectDeclaration } from '../../typeSystem/internals';
import {
  folderForKind,
  kindToPropertyName,
} from '../../../entities/crossLanguage/conventions';

import {
  callFunction,
  createArrowFunction,
  createConstStatement,
  createIdentifier,
  createInterfaceDeclaration as createInterface,
  createNamedImport,
  createOptionalAssignment,
  createParameter,
  createPropertyAssignment,
  createPropertySignature,
  createStringLiteral,
} from './tsFactoryWrapper';
import { fileNameFor, functionNameFor, toInterfaceName } from './renderers';
import { createImportContext, ImportContext } from './importContext';

const stringPropertyName = (
  name: string,
  definition: InternalObjectDeclaration,
) =>
  name.includes(':')
    ? name
    : `_case:${kindToPropertyName(definition.kind)}:${name}`;

const defineObject = (obj: object): ObjectLiteralElementLike[] =>
  Object.entries(obj).map(([key, value]) => {
    if (value === null) {
      return createPropertyAssignment(key, () => ts.factory.createNull());
    }

    if (typeof value === 'object') {
      return createPropertyAssignment(key, () =>
        ts.factory.createObjectLiteralExpression(defineObject(value)),
      );
    }
    if (typeof value === 'string') {
      return createPropertyAssignment(key, () =>
        ts.factory.createStringLiteral(value),
      );
    }
    if (typeof value === 'number') {
      return createPropertyAssignment(key, () =>
        ts.factory.createNumericLiteral(value),
      );
    }
    throw new CaseCoreError(`Unknown type in defineObject: ${typeof value}`);
  });

const additionalProperties = (
  definition: InternalObjectDeclaration,
): ts.ObjectLiteralElementLike[] => {
  switch (definition.kind) {
    case 'state':
      return [];
    case 'matcher':
      return [
        ...(definition.constantParams
          ? Object.entries(definition.constantParams).map(([key, value]) =>
              createPropertyAssignment(
                stringPropertyName(key, definition),
                () => ts.factory.createStringLiteral(value),
              ),
            )
          : []),
        ...(definition.contextModifiers
          ? Object.entries(definition.contextModifiers).map(([key, value]) =>
              createPropertyAssignment(
                stringPropertyName(`_case:context:${key}`, definition),
                () => ts.factory.createStringLiteral(value),
              ),
            )
          : []),
        ...(definition.currentRunModifiers
          ? Object.entries(definition.currentRunModifiers).map(([key, value]) =>
              createPropertyAssignment(
                stringPropertyName(
                  `_case:currentRun:context:${key}`,
                  definition,
                ),
                () => ts.factory.createStringLiteral(value),
              ),
            )
          : []),
      ];
    case 'interaction':
      return [
        createPropertyAssignment('_case:run:context:setup', () =>
          ts.factory.createObjectLiteralExpression(
            defineObject(definition.setup),
          ),
        ),
      ];
    default:
      throw new UnreachableError(
        `Unknown kind when generating additional properties`,
        definition,
      );
  }
};

const getTsType = (
  paramType: ParameterType,
  importContext: ImportContext,
): ts.TypeNode => {
  if (typeof paramType === 'string') {
    switch (paramType) {
      case 'integer':
      case 'number':
        return ts.factory.createTypeReferenceNode('number');
      case 'boolean':
        return ts.factory.createTypeReferenceNode('boolean');
      case 'string':
        return ts.factory.createTypeReferenceNode('string');
      case 'null':
        return ts.factory.createTypeReferenceNode('null');
      case 'AnyCaseMatcherOrData': {
        importContext.addNamedImport(
          'AnyCaseMatcherOrData',
          '@contract-case/case-plugin-dsl-types',
        );
        return ts.factory.createTypeReferenceNode('AnyCaseMatcherOrData');
      }
      case 'AnyData': {
        importContext.addNamedImport(
          'AnyData',
          '@contract-case/case-plugin-dsl-types',
        );
        return ts.factory.createTypeReferenceNode('AnyData');
      }
      case 'InternalContractCaseCoreSetup': {
        importContext.addNamedImport(
          'InternalContractCaseCoreSetup',
          '@contract-case/case-plugin-dsl-types',
        );
        return ts.factory.createTypeReferenceNode(
          'InternalContractCaseCoreSetup',
        );
      }
      default:
        throw new UnreachableError(
          `Unknown parameter type for TypeScript: ${paramType}`,
          paramType,
        );
    }
  }
  if (paramType.kind === 'array') {
    return ts.factory.createArrayTypeNode(
      getTsType(paramType.type, importContext),
    );
  }
  if (isPassToMatcher(paramType)) {
    importContext.addMatcher(paramType.matcherReference);
    return ts.factory.createTypeReferenceNode(
      toInterfaceName(paramType.matcherReference),
    );
  }
  throw new UnreachableError(
    `Unknown parameter type for TypeScript: ${paramType}`,
    paramType,
  );
};

function additionalPropertyTypes(
  definition: InternalObjectDeclaration,
  importContext: ImportContext,
): ts.TypeElement[] {
  switch (definition.kind) {
    case 'state':
      return [];
    case 'matcher':
      return [
        ...(definition.constantParams
          ? Object.entries(definition.constantParams).map(([key, value]) =>
              createPropertySignature(
                stringPropertyName(key, definition),
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(value),
                ),
              ),
            )
          : []),
        ...(definition.contextModifiers
          ? Object.entries(definition.contextModifiers).map(([key, value]) =>
              createPropertySignature(
                `_case:context:${key}`,
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(value),
                ),
              ),
            )
          : []),
        ...(definition.currentRunModifiers
          ? Object.entries(definition.currentRunModifiers).map(([key, value]) =>
              createPropertySignature(
                `_case:currentRun:context:${key}`,
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(value),
                ),
              ),
            )
          : []),
      ];
    case 'interaction':
      return [
        createPropertySignature(
          stringPropertyName('_case:run:context:setup', definition),
          getTsType('InternalContractCaseCoreSetup', importContext),
        ),
      ];
    default:
      throw new UnreachableError(
        `Unknown kind when generating additional type signature for interface`,
        definition,
      );
  }
}

const propertyName = (
  param: ParameterDeclaration,
  definition: InternalObjectDeclaration,
): string =>
  param.jsonPropertyName ?? stringPropertyName(param.name, definition);

const typeConstantFor = (
  definition: InternalObjectDeclaration,
  namespace: string,
) => `${namespace}:${definition.type}`;

const createInterfaceDeclaration = (
  definition: InternalObjectDeclaration,
  namespace: string,
  importContext: ImportContext,
): ts.InterfaceDeclaration =>
  createInterface(toInterfaceName(definition), [
    createPropertySignature(
      stringPropertyName('type', definition),
      ts.factory.createLiteralTypeNode(
        ts.factory.createStringLiteral(typeConstantFor(definition, namespace)),
      ),
    ),
    ...definition.params.map((param) =>
      createPropertySignature(
        propertyName(param, definition),
        getTsType(param.type, importContext),
        param.optional,
      ),
    ),
    ...additionalPropertyTypes(definition, importContext),
  ]);

const createFactoryFunctionStatement = (
  definition: InternalObjectDeclaration,
  namespace: string,
  importContext: ImportContext,
): ts.VariableStatement => {
  const methodParams: ParameterDeclaration[] = definition.params.flatMap(
    (param) =>
      isPassToMatcher(param.type) ? param.type.exposedParams : [param],
  );

  const factoryFunction = createConstStatement(
    functionNameFor(definition),
    createArrowFunction(
      methodParams.map((param) =>
        createParameter(
          param.name,
          getTsType(param.type, importContext),
          param.optional,
        ),
      ),
      ts.factory.createTypeReferenceNode(toInterfaceName(definition)),
      ts.factory.createParenthesizedExpression(
        ts.factory.createObjectLiteralExpression(
          [
            // All objects start with their type identifier
            createPropertyAssignment(
              stringPropertyName('type', definition),
              () =>
                ts.factory.createAsExpression(
                  createStringLiteral(typeConstantFor(definition, namespace)),
                  ts.factory.createTypeReferenceNode('const'),
                ),
            ),
            ...additionalProperties(definition),
            // Then parameters, which might be optional
            // These are the parameters from the definition
            // because we map from method parameters to the actual
            // values (ie, collapse passToMatcher parameters)
            ...definition.params.map((param): ts.ObjectLiteralElementLike => {
              const jsonKey = propertyName(param, definition);
              if (param.optional) {
                return createOptionalAssignment(jsonKey, param);
              }
              return createPropertyAssignment(jsonKey, () => {
                if (isPassToMatcher(param.type)) {
                  importContext.addMatcher(param.type.matcherReference);
                  return callFunction(
                    functionNameFor(param.type.matcherReference),
                    param.type.exposedParams,
                  );
                }
                return createIdentifier(param.name);
              });
            }),
          ],
          true,
        ),
      ),
    ),
  );
  ts.addSyntheticLeadingComment(
    factoryFunction,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*\n * ${definition.documentation}\n *\n${definition.params
      .map((param) => ` * @param ${param.name} - ${param.documentation || ''}`)
      .join('\n')}\n `,
    true,
  );
  return factoryFunction;
};

const createImportDeclaration = (
  context: ImportContext,
): ts.ImportDeclaration[] => {
  const imports = context
    ? Object.entries(context.getImports()).map(([module, functions]) =>
        createNamedImport(Array.from(functions), module),
      )
    : [];

  return imports;
};
const generateDslCode = async (
  definition: InternalObjectDeclaration,
  category: string,
  namespace: string,
): Promise<GeneratedFile[]> => {
  const importContext = createImportContext(category, definition.kind);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const sourceFile = ts.createSourceFile(
    // This appears to be unused by typescript when
    // calling createSourceFile here, but it's not
    // documented, so who knows. Not me. Maybe you?
    // Anyway, I called it delete-me, so it'll
    // stand out incase it ever does leak to the file system.
    'delete-me.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );

  const interfaceDeclaration = createInterfaceDeclaration(
    definition,
    namespace,
    importContext,
  );

  const contentNodes = [
    interfaceDeclaration,
    createFactoryFunctionStatement(definition, namespace, importContext),
  ].map((node) => {
    // This adds a blank line before each node
    ts.addSyntheticLeadingComment(
      node,
      ts.SyntaxKind.SingleLineCommentTrivia,
      '',
      true,
    );
    return node;
  });

  // We do this second, because the importContext needs to be populated first
  // by the other generation functions.
  const allNodes = [...createImportDeclaration(importContext), ...contentNodes];

  ts.addSyntheticLeadingComment(
    allNodes[0]!,
    ts.SyntaxKind.MultiLineCommentTrivia,
    ' eslint-disable ',
    true,
  );
  ts.addSyntheticLeadingComment(
    allNodes[0]!,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `****** @contract-case/case-definition-generator ********
THIS FILE WAS AUTOGENERATED 
DO NOT MODIFY IT
******** @contract-case/case-definition-generator ********
    `,
    true,
  );

  const code = printer.printList(
    ts.ListFormat.MultiLine,
    ts.factory.createNodeArray(allNodes),
    sourceFile,
  );

  return [
    {
      content: await prettier
        .format(code, {
          parser: 'typescript',
          singleQuote: true,
        })
        .catch((err) => {
          throw new CaseCoreError(
            `Error formatting TypeScript code. This means that there's a bug in the TypeScript code generator. Error was: ${err.message}\n\nBroken code was: ${code}`,
          );
        }),
      entityNames: [definition.name],
      relativePath: `src/boundaries/dsl/${folderForKind(definition.kind)}/${fileNameFor({ name: definition.name, category })}`,
    },
  ];
};

export const tsGenerator: LanguageGenerator = {
  generateDslCode,
  generateExample: () => Promise.resolve(''),
};
