import {
  CaseCoreError,
  isPassToMatcher,
  MatcherDslDeclaration,
  ParameterType,
} from '@contract-case/case-plugin-base';
import ts from 'typescript';
import {
  toCamelCase,
  toScreamingSnakeCase,
} from '../../naming/stringIdiomTransformations';
import { UnreachableError } from '../../../entities/errors/unreachableError';

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

export const generateDslCode = (
  definition: MatcherDslDeclaration,
  namespace: string,
): string => {
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
            ts.factory.createStringLiteral(constValue),
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
        ts.factory.createStringLiteral('_case:matcher:type'),
        undefined,
        ts.factory.createTypeQueryNode(ts.factory.createIdentifier(constName)),
      ),
      ...definition.params.map((param) =>
        ts.factory.createPropertySignature(
          undefined,
          ts.factory.createStringLiteral(`_case:matcher:${param.name}`),
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
                    ts.factory.createStringLiteral('_case:matcher:type'),
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
                                    ts.factory.createStringLiteral(key),
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
                          ts.factory.createStringLiteral(key),
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

  // Factory "Factory Function" comment
  ts.addSyntheticLeadingComment(
    factoryFunction,
    ts.SyntaxKind.SingleLineCommentTrivia,
    ' Factory Function',
    true,
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

  // Constant "Constant" comment
  ts.addSyntheticLeadingComment(
    constantStatement,
    ts.SyntaxKind.SingleLineCommentTrivia,
    ' Constant',
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
      false,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          undefined,
          ts.factory.createIdentifier('AnyCaseMatcherOrData'),
        ),
      ]),
    ),
    ts.factory.createStringLiteral('@contract-case/case-plugin-dsl-types'),
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

  return printer.printList(ts.ListFormat.MultiLine, nodes, sourceFile);
};
