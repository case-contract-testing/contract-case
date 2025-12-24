import ts from 'typescript';

export const createString = (value: string): ts.StringLiteral =>
  ts.factory.createStringLiteral(value, true);

export const createId = (value: string): ts.Identifier =>
  ts.factory.createIdentifier(value);

export const createConstStatement = (
  name: string,
  expression: ts.Expression,
): ts.VariableStatement =>
  ts.factory.createVariableStatement(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          name,
          undefined,
          undefined,
          expression,
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );

export const createInterfaceDeclaration = (
  name: string,
  members: ts.TypeElement[],
): ts.InterfaceDeclaration =>
  ts.factory.createInterfaceDeclaration(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    name,
    undefined,
    undefined,
    members,
  );

export const createPropertySignature = (
  name: string,
  type: ts.TypeNode,
  optional = false,
): ts.PropertySignature =>
  ts.factory.createPropertySignature(
    undefined,
    createString(name),
    optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    type,
  );

export const createArrowFunction = (
  parameters: ts.ParameterDeclaration[],
  returnType: ts.TypeNode,
  body: ts.ConciseBody,
): ts.ArrowFunction =>
  ts.factory.createArrowFunction(
    undefined,
    undefined,
    parameters,
    returnType,
    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    body,
  );

export const createParameter = (
  name: string,
  type: ts.TypeNode,
  optional = false,
): ts.ParameterDeclaration =>
  ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    name,
    optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    type,
    undefined,
  );

export const createPropertyAssignment = (
  name: string,
  initializer: ts.Expression,
): ts.PropertyAssignment =>
  ts.factory.createPropertyAssignment(createString(name), initializer);

export const createNamedImport = (
  names: string[],
  moduleName: string,
): ts.ImportDeclaration =>
  ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      undefined,
      undefined,
      ts.factory.createNamedImports(
        names.map((name) =>
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier(name),
          ),
        ),
      ),
    ),
    createString(moduleName),
  );
