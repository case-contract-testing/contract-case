import { getType } from '../../typeSystem';
import { LanguageTypes, MatcherDslDeclaration } from '../../typeSystem/types';
import { addSingleConstructor } from './constructors';

const javaLanguageTypes: LanguageTypes = {
  array: (type) => `List<${type}>`,
  data: 'Object',
  matcher: 'M',
};

/**
 * Adds package declaration and import statements to the Java file.
 *
 * @param lines - Output array to append lines to. Must be a mutable string array.
 * @param definition - Matcher definition containing parameters used to determine imports.
 *
 * Invariants:
 * - lines must be a mutable string array
 * - definition must have a valid params array
 * - definition.params must contain valid ParameterDeclaration objects
 *
 * Side Effects:
 * - Always adds package declaration for contract case definitions
 * - Conditionally adds JsonInclude imports if any parameters are optional
 * - Always adds JsonProperty import
 * - Conditionally adds List import if any parameters are array types
 * - Adds trailing blank line after imports
 */
const addPackageAndImports = (
  lines: string[],
  definition: MatcherDslDeclaration,
) => {
  // Package declaration
  lines.push('package io.contract_testing.contractcase.definitions;');
  lines.push('');

  // Imports
  if (definition.params.some((p) => p.optional)) {
    lines.push('import com.fasterxml.jackson.annotation.JsonInclude;');
    lines.push('import com.fasterxml.jackson.annotation.JsonInclude.Include;');
  }
  lines.push('import com.fasterxml.jackson.annotation.JsonProperty;');
  if (
    definition.params.some(
      (p) =>
        typeof p.type === 'object' &&
        p.type.kind &&
        p.type.kind.toLowerCase() === 'array',
    )
  ) {
    lines.push('import java.util.List;');
  }
  lines.push('');
};

/**
 * Adds class header documentation, declaration, and all field declarations.
 *
 * @param lines - Output array to append lines to. Must be a mutable string array.
 * @param definition - Matcher definition containing documentation and parameters.
 * @param className - Name of the Java class. Must be a valid Java class identifier.
 *
 * Invariants:
 * - lines must be a mutable string array
 * - definition must have valid documentation and params properties
 * - className must be a valid Java identifier (no validation performed)
 * - definition.params must be an array of valid ParameterDeclaration objects
 *
 * Side Effects:
 * - Conditionally adds class-level JavaDoc if definition.documentation exists
 * - Always adds class declaration with generic type parameter M
 * - Always adds required type field with JsonProperty annotation
 * - Adds one field per parameter with appropriate annotations and types
 * - Optional parameters get JsonInclude annotation
 */
const addClassHeaderAndFields = (
  lines: string[],
  definition: MatcherDslDeclaration,
  className: string,
) => {
  // Head javadoc
  if (definition.documentation) {
    lines.push('/**');
    lines.push(` * ${definition.documentation}`);
    lines.push(' *');
    lines.push(' * @param <M> Any matcher or data');
    lines.push(' */');
  }

  // Class declaration
  lines.push(`public class ${className}<M> {`);

  // Fields
  lines.push('');
  lines.push('  @JsonProperty("_case:matcher:type")');
  lines.push('  final String type;');

  definition.params.forEach((param) => {
    const javaType = getType(param.type, javaLanguageTypes);
    const isOptional = !!param.optional;

    lines.push('');
    if (isOptional) {
      lines.push('  @JsonInclude(Include.NON_NULL)');
    }
    lines.push(`  @JsonProperty("_case:matcher:${param.name}")`);
    lines.push(`  final ${javaType} ${param.name};`);
  });
};

/**
 * Orchestrates the generation of all constructors for the Java class.
 * Creates one constructor with required parameters only, and optionally a second
 * constructor with all parameters if optional parameters exist.
 *
 * @param lines - Output array to append constructor lines to.
 * @param definition - Complete matcher definition with parameters and metadata.
 * @param className - Name of the Java class for constructors.
 * @param namespace - Namespace prefix for type values.
 *
 * Invariants:
 * - lines must be a mutable string array
 * - definition must have a valid params array and type property
 * - className must be a valid Java identifier
 * - namespace must be a non-empty string
 *
 * Side Effects:
 * - Always adds at least one constructor (required parameters only)
 * - Conditionally adds second constructor if optional parameters exist
 * - Separates required and optional parameters automatically
 * - Maintains proper spacing between constructors
 */
const addConstructors = (
  lines: string[],
  definition: MatcherDslDeclaration,
  className: string,
  namespace: string,
) => {
  const requiredParams = definition.params.filter((p) => !p.optional);
  const optionalParams = definition.params.filter((p) => p.optional);

  // First constructor (required params only)
  addSingleConstructor(
    lines,
    className,
    requiredParams,
    namespace,
    definition.type,
    definition.documentation,
    optionalParams,
  );

  // Second constructor (all params) if there are optional params
  if (optionalParams.length > 0) {
    addSingleConstructor(
      lines,
      className,
      [...requiredParams, ...optionalParams],
      namespace,
      definition.type,
      definition.documentation,
    );
  }
};

/**
 * Generates complete Java DSL class code for a ContractCase matcher definition.
 * This is the main entry point that orchestrates the generation of a complete
 * Java class including package declaration, imports, class documentation,
 * fields, and constructors.
 *
 * The generated class will always have:
 * - At least one constructor (required parameters only)
 * - A second constructor (all parameters) if optional parameters exist
 * - All fields marked as final with Jackson annotations
 * - Generic type parameter <M> for matcher/data flexibility
 *
 * @returns Complete Java class source code as a string, including:
 *          - Package declaration
 *          - Necessary imports
 *          - Class-level JavaDoc (if documentation provided)
 *          - Class declaration with generic type parameter
 *          - All field declarations with appropriate annotations
 *          - Constructor(s) with JavaDoc
 *          - Proper formatting and spacing
 *
 * @param definition - Complete matcher declaration containing name, type, documentation, and parameters.
 * @param namespace - Namespace prefix for the matcher type identifier. In core
 * plugins this will be `_case`, in other plugins this should be something
 * unique to your organisation or plugin. Must not be empty.
 *
 */
export function generateJavaDslCode(
  definition: MatcherDslDeclaration,
  namespace: string,
): string {
  const lines: string[] = [];
  const className = definition.name;

  addPackageAndImports(lines, definition);
  addClassHeaderAndFields(lines, definition, className);
  addConstructors(lines, definition, className, namespace);

  // Final blank line and class closing
  lines.push('');
  lines.push('}');

  return lines.join('\n');
}
