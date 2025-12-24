import {
  CaseCoreError,
  isPassToMatcher,
  MatcherDslDeclaration,
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
import { folderForKind } from '../../../entities/crossLanguage/conventions';

const getTsType = (paramType: ParameterType): ts.TypeNode => {
  if (typeof paramType === 'string') {
    return ts.factory.createTypeReferenceNode(paramType);
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

function fileNameFor(definition: MatcherDslDeclaration) {
  return `${toCamelCase(definition.name)}.ts`;
}

const generateDslCode = async (
  definition: InternalObjectDeclaration,
  category: string,
  namespace: string,
): Promise<GeneratedFile> => {
  // 1. Constant
  const constName = `${toScreamingSnakeCase(definition.type)}_TYPE`;
  const constValue = `${namespace}:${definition.type}`;

  const constantStatement = ts.factory.createVariableStatement(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          constName,
          undefined,
          undefined,
          ts.factory.createAsExpression(
            ts.factory.createStringLiteral(constValue, true),
            ts.factory.createTypeReferenceNode('const'),
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );

  const funcName = toCamelCase(definition.name);
  const interfaceName = `Core${definition.name}Matches`;

  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    interfaceName,
    undefined,
    undefined,
    [
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createStringLiteral('_case:matcher:type', true),
        undefined,
        ts.factory.createTypeQueryNode(ts.factory.createIdentifier(constName)),
      ),
      ...definition.params.map((param) =>
        ts.factory.createPropertySignature(
          undefined,
          ts.factory.createStringLiteral(`_case:matcher:${param.name}`, true),
          param.optional
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined,
          getTsType(param.type),
        ),
      ),
    ],
  );

  const factoryFunction = ts.factory.createVariableStatement(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          funcName,
          undefined,
          undefined,
          ts.factory.createArrowFunction(
            undefined,
            undefined,
            definition.params.map((param) =>
              ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                param.name,
                param.optional
                  ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
                  : undefined,
                getTsType(param.type),
                undefined,
              ),
            ),
            ts.factory.createTypeReferenceNode(interfaceName),
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.factory.createParenthesizedExpression(
              ts.factory.createObjectLiteralExpression(
                [
                  ts.factory.createPropertyAssignment(
                    ts.factory.createStringLiteral('_case:matcher:type', true),
                    ts.factory.createIdentifier(constName),
                  ),
                  ...definition.params.flatMap(
                    (param): ts.ObjectLiteralElementLike[] => {
                      const key = `_case:matcher:${param.name}`;
                      if (param.optional) {
                        return [
                          ts.factory.createSpreadAssignment(
                            ts.factory.createParenthesizedExpression(
                              ts.factory.createConditionalExpression(
                                ts.factory.createBinaryExpression(
                                  ts.factory.createIdentifier(param.name),
                                  ts.factory.createToken(
                                    ts.SyntaxKind.ExclamationEqualsEqualsToken,
                                  ),
                                  ts.factory.createIdentifier('undefined'),
                                ),
                                ts.factory.createToken(
                                  ts.SyntaxKind.QuestionToken,
                                ),
                                ts.factory.createObjectLiteralExpression([
                                  ts.factory.createPropertyAssignment(
                                    ts.factory.createStringLiteral(key, true),
                                    ts.factory.createIdentifier(param.name),
                                  ),
                                ]),
                                ts.factory.createToken(
                                  ts.SyntaxKind.ColonToken,
                                ),
                                ts.factory.createObjectLiteralExpression([]),
                              ),
                            ),
                          ),
                        ];
                      }
                      return [
                        ts.factory.createPropertyAssignment(
                          ts.factory.createStringLiteral(key, true),
                          ts.factory.createIdentifier(param.name),
                        ),
                      ];
                    },
                  ),
                ],
                true,
              ),
            ),
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
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

  ts.addSyntheticLeadingComment(
    constantStatement,
    ts.SyntaxKind.SingleLineCommentTrivia,
    ' THIS FILE WAS AUTOGENERATED BY CASE-DEFINITION-GENERATOR. DO NOT MODIFY IT BY HAND',
    true,
  );

  // Interface "Interface" comment
  ts.addSyntheticLeadingComment(
    interfaceDeclaration,
    ts.SyntaxKind.SingleLineCommentTrivia,
    ' Interface',
    true,
  );

  const importStatement = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      undefined,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          undefined,
          ts.factory.createIdentifier('AnyCaseMatcherOrData'),
        ),
      ]),
    ),
    ts.factory.createStringLiteral(
      '@contract-case/case-plugin-dsl-types',
      true,
    ),
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
