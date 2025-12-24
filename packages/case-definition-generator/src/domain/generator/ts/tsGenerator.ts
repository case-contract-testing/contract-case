import {
  CaseCoreError,
  isPassToMatcher,
  MatcherDslDeclaration,
  ParameterDeclaration,
  ParameterType,
} from '@contract-case/case-plugin-base';
import prettier from 'prettier';
import ts from 'typescript';
import {
  toCamelCase,
  toScreamingSnakeCase,
} from '../../naming/stringIdiomTransformations';
import { UnreachableError } from '../../../entities/errors/unreachableError';
import { LanguageGenerator } from '../../types';
import { GeneratedFile } from '../types';
import { InternalObjectDeclaration } from '../../typeSystem/internals';
import {
  folderForKind,
  kindToPropertyName,
} from '../../../entities/crossLanguage/conventions';

import {
  createArrowFunction,
  createConstStatement,
  createId,
  createInterfaceDeclaration as createInterface,
  createNamedImport,
  createParameter,
  createPropertyAssignment,
  createPropertySignature,
  createString,
} from './tsFactoryWrapper';

const getTsType = (paramType: ParameterType): ts.TypeNode => {
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
      case 'AnyCaseMatcherOrData':
        return ts.factory.createTypeReferenceNode('AnyCaseMatcherOrData');
      case 'AnyData':
        return ts.factory.createTypeReferenceNode('AnyData');
      case 'InternalContractCaseCoreSetup':
        return ts.factory.createTypeReferenceNode(
          'InternalContractCaseCoreSetup',
        );
      default:
        throw new UnreachableError(
          `Unknown parameter type for TypeScript: ${paramType}`,
          paramType,
        );
    }
  }
  if (paramType.kind === 'array') {
    return ts.factory.createArrayTypeNode(getTsType(paramType.type));
  }
  if (isPassToMatcher(paramType)) {
    throw new CaseCoreError('PassToMatcher is currently unimplemented');
  }
  throw new UnreachableError(
    `Unknown parameter type for TypeScript: ${paramType}`,
    paramType,
  );
};

const toInterfaceName = (definition: InternalObjectDeclaration) =>
  `Matcher${definition.name}`;

const fileNameFor = (definition: MatcherDslDeclaration) =>
  `${toCamelCase(definition.name)}.ts`;

const stringParameterName = (
  name: string,
  definition: InternalObjectDeclaration,
) => `_case:${kindToPropertyName(definition.kind)}:${name}`;

const parameterName = (
  param: ParameterDeclaration,
  definition: InternalObjectDeclaration,
): string =>
  param.jsonPropertyName ?? stringParameterName(param.name, definition);

const createTypeConstantStatement = (
  matcherTypeConstant: string,
  constValue: string,
): ts.VariableStatement =>
  createConstStatement(
    matcherTypeConstant,
    ts.factory.createAsExpression(
      createString(constValue),
      ts.factory.createTypeReferenceNode('const'),
    ),
  );

const createInterfaceDeclaration = (
  definition: InternalObjectDeclaration,
  interfaceName: string,
  matcherTypeConstant: string,
): ts.InterfaceDeclaration =>
  createInterface(interfaceName, [
    createPropertySignature(
      stringParameterName('type', definition),
      ts.factory.createTypeQueryNode(createId(matcherTypeConstant)),
    ),
    ...definition.params.map((param) =>
      createPropertySignature(
        parameterName(param, definition),
        getTsType(param.type),
        param.optional,
      ),
    ),
  ]);

const createFactoryFunctionStatement = (
  definition: InternalObjectDeclaration,
  functionName: string,
  interfaceName: string,
  matcherTypeConstant: string,
): ts.VariableStatement =>
  createConstStatement(
    functionName,
    createArrowFunction(
      definition.params.map((param) =>
        createParameter(param.name, getTsType(param.type), param.optional),
      ),
      ts.factory.createTypeReferenceNode(interfaceName),
      ts.factory.createParenthesizedExpression(
        ts.factory.createObjectLiteralExpression(
          [
            createPropertyAssignment(
              stringParameterName('type', definition),
              createId(matcherTypeConstant),
            ),
            ...definition.params.flatMap(
              (param): ts.ObjectLiteralElementLike[] => {
                const key = parameterName(param, definition);
                if (param.optional) {
                  return [
                    ts.factory.createSpreadAssignment(
                      ts.factory.createParenthesizedExpression(
                        ts.factory.createConditionalExpression(
                          ts.factory.createBinaryExpression(
                            createId(param.name),
                            ts.factory.createToken(
                              ts.SyntaxKind.ExclamationEqualsEqualsToken,
                            ),
                            createId('undefined'),
                          ),
                          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                          ts.factory.createObjectLiteralExpression([
                            createPropertyAssignment(key, createId(param.name)),
                          ]),
                          ts.factory.createToken(ts.SyntaxKind.ColonToken),
                          ts.factory.createObjectLiteralExpression([]),
                        ),
                      ),
                    ),
                  ];
                }
                return [createPropertyAssignment(key, createId(param.name))];
              },
            ),
          ],
          true,
        ),
      ),
    ),
  );

const createImportDeclaration = (): ts.ImportDeclaration =>
  createNamedImport(
    ['AnyCaseMatcherOrData'],
    '@contract-case/case-plugin-dsl-types',
  );

const generateDslCode = async (
  definition: InternalObjectDeclaration,
  category: string,
  namespace: string,
): Promise<GeneratedFile> => {
  // 1. Constant
  const matcherTypeConstant = `${toScreamingSnakeCase(definition.type)}_TYPE`;

  const constantStatement = createTypeConstantStatement(
    matcherTypeConstant,
    `${namespace}:${definition.type}`,
  );

  const functionName = toCamelCase(definition.name);
  const interfaceName = toInterfaceName(definition);

  const interfaceDeclaration = createInterfaceDeclaration(
    definition,
    interfaceName,
    matcherTypeConstant,
  );

  const factoryFunction = createFactoryFunctionStatement(
    definition,
    functionName,
    interfaceName,
    matcherTypeConstant,
  );

  // Comments for factory function
  ts.addSyntheticLeadingComment(
    factoryFunction,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*\n * ${definition.documentation}\n *\n${definition.params
      .map((param) => ` * @param ${param.name} - ${param.documentation || ''}`)
      .join('\n')}\n `,
    true,
  );

  const importStatement = createImportDeclaration();

  ts.addSyntheticLeadingComment(
    importStatement,
    ts.SyntaxKind.SingleLineCommentTrivia,
    ' THIS FILE WAS AUTOGENERATED BY @contract-case/case-definition-generator. DO NOT MODIFY IT',
    true,
  );

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const sourceFile = ts.createSourceFile(
    'placeholder.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );

  const nodes = ts.factory.createNodeArray([
    importStatement,
    constantStatement,
    interfaceDeclaration,
    factoryFunction,
  ]);

  const code = printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile);

  return {
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
    relativePath: `src/boundaries/dsl/${folderForKind(definition.kind)}/${category}/${fileNameFor(definition)}`,
  };
};

export const tsGenerator: LanguageGenerator = {
  generateDslCode,
};
