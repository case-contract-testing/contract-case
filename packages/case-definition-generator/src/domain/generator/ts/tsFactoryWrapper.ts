import { ParameterDeclaration } from '@contract-case/case-plugin-base';
import ts from 'typescript';

const sanitiseName = (name: string): string => {
  switch (name) {
    // global overrides
    case 'arguments':
    case 'break': /* TS Reserved Keywords */
    case 'case':
    case 'catch':
    case 'class':
    case 'const':
    case 'continue':
    case 'debugger':
    case 'default':
    case 'delete':
    case 'do':
    case 'else':
    case 'enum':
    case 'export':
    case 'extends':
    case 'false':
    case 'finally':
    case 'for':
    case 'function':
    case 'if':
    case 'import':
    case 'in':
    case 'instanceof':
    case 'new':
    case 'null':
    case 'return':
    case 'super':
    case 'switch':
    case 'this':
    case 'throw':
    case 'true':
    case 'try':
    case 'typeof':
    case 'var':
    case 'void':
    case 'while':
    case 'with':
    case 'implements':
    case 'interface':
    case 'let':
    case 'package':
    case 'private':
    case 'protected':
    case 'public':
    case 'static':
    case 'yield':
      return `${name}_`;
    default:
      return name;
  }
};

/**
 * Creates a string literal.
 *
 * @param value - the value of the string
 */
export const createStringLiteral = (value: string): ts.StringLiteral =>
  ts.factory.createStringLiteral(sanitiseName(value), true);

/**
 * Creates an Identifier that refers to a named variable, for use in expressions.
 *
 * @param name - the name of the identifier
 */
export const createIdentifier = (name: string): ts.Identifier =>
  ts.factory.createIdentifier(sanitiseName(name));

/**
 * Creates a statement that exports a const value.
 *
 * @param name - The name of the export
 * @param expression - The value to export
 */
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

/**
 * Creates a declaration for an exported interface
 *
 * @param name - The name of the interface
 * @param members - The members of the interface
 */
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

/**
 * Creates a property signature, used for interfaces or type literals
 *
 * @param name - The name of the property
 * @param type - The type of the property
 * @param optional - Whether the property is optional
 */
export const createPropertySignature = (
  name: string,
  type: ts.TypeNode,
  optional = false,
): ts.PropertySignature =>
  ts.factory.createPropertySignature(
    undefined,
    createStringLiteral(name),
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

/**
 * Creates a parameter declaration, used in function definitions
 *
 * @param name - The name of the parameter
 * @param type - The type of the parameter
 * @param optional - true if the parameter is optional, false if required
 */
export const createParameter = (
  name: string,
  type: ts.TypeNode,
  optional = false,
): ts.ParameterDeclaration =>
  ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    sanitiseName(name),
    optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    type,
    undefined,
  );

/**
 * Creates a property assignment, used in object literals
 *
 * @param name - The name of the property
 * @param initializerProducer - A function that returns the initializer expression for the property
 */
export const createPropertyAssignment = (
  name: string,
  initializerProducer: () => ts.Expression,
): ts.PropertyAssignment | ts.ShorthandPropertyAssignment => {
  const initializer = initializerProducer();
  const keyName = sanitiseName(name);
  if (ts.isIdentifier(initializer) && initializer.text === keyName) {
    return ts.factory.createShorthandPropertyAssignment(initializer);
  }
  return ts.factory.createPropertyAssignment(
    createStringLiteral(name),
    initializer,
  );
};

/**
 * Like {@link createPropertyAssignment}, but will only assign the property if the
 * expression is not undefined.
 *
 * @param jsonKey - The key to assign the property to
 * @param param - The parameter to assign the property from
 * @param valueProducer - A function that returns the initializer expression for the property
 */
export const createOptionalAssignment = (
  jsonKey: string,
  param: ParameterDeclaration,
  valueProducer: () => ts.Expression = () => createIdentifier(param.name),
): ts.SpreadAssignment =>
  ts.factory.createSpreadAssignment(
    ts.factory.createParenthesizedExpression(
      ts.factory.createConditionalExpression(
        ts.factory.createBinaryExpression(
          createIdentifier(param.name),
          ts.factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
          createIdentifier('undefined'),
        ),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        ts.factory.createObjectLiteralExpression([
          createPropertyAssignment(jsonKey, valueProducer),
        ]),
        ts.factory.createToken(ts.SyntaxKind.ColonToken),
        ts.factory.createObjectLiteralExpression([]),
      ),
    ),
  );

/**
 * Creates an import declaration for named imports
 *
 * @param names - The names of the imports
 * @param moduleName - The module to import from
 */
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
    createStringLiteral(moduleName),
  );

export const callFunction = (
  name: string,
  params: ParameterDeclaration[],
): ts.CallExpression =>
  ts.factory.createCallExpression(
    createIdentifier(name),
    undefined,
    params.map((param) => createIdentifier(param.name)),
  );
