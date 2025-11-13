import { getType } from '../../typeSystem';
import { LanguageTypes, ParameterDeclaration } from '../../typeSystem/types';
import { JavaConstructorDescriptor } from './types';

const javaLanguageTypes: LanguageTypes = {
  array: (type) => `List<${type}>`,
  data: 'Object',
  matcher: 'M',
};

/**
 * Generates JavaDoc documentation for a constructor and appends it to the output lines.
 *
 * Invariants:
 * - outputLines must be a mutable string array
 * - parameters must be an array (can be empty)
 * - Each parameter in parameters must have a valid name property
 *
 * Side Effects:
 * - Modifies outputLines by appending javadoc comment lines
 * - If documentation is falsy, no lines are added
 * - Always adds proper javadoc formatting with block comment syntax
 *
 * @param outputLines - Array to append javadoc lines to. Must be a valid string array.
 * @param documentation - Main documentation text. If empty/null/undefined, no javadoc is generated.
 * @param parameters - Array of parameter declarations. Must be valid ParameterDeclaration objects.
 *                     Each parameter must have a name property and may have a documentation property.
 */
export const generateConstructorJavadoc = (
  outputLines: string[],
  documentation: string,
  parameters: ParameterDeclaration[],
): void => {
  if (!documentation) {
    return;
  }

  outputLines.push('');
  outputLines.push('  /**');
  outputLines.push(`   * ${documentation}`);

  if (parameters && parameters.length > 0) {
    outputLines.push('   *');
    parameters.forEach((param) => {
      outputLines.push(
        `   * @param ${param.name} ${param.documentation || ''}`,
      );
    });
  }
  outputLines.push('   */');
};

/**
 * Generates a comma-separated parameter list for Java constructor signatures.
 *
 * @param params - Array of parameter declarations to convert to Java parameters.
 *
 * Invariants:
 * - params must be an array (can be empty)
 * - Each parameter must have valid type and name properties
 * - Parameter types must be convertible by getType function
 *
 * @returns Comma-separated string of Java parameters (e.g., "String name, int age")
 *          Returns empty string if params array is empty
 */
export const constructorParameters = (params: ParameterDeclaration[]): string =>
  params
    .map((param) => `${getType(param.type, javaLanguageTypes)} ${param.name}`)
    .join(', ');

/**
 * Generates assignment statements for constructor parameters to instance fields.
 *
 * @param lines - Output array to append assignment lines to.
 * @param params - Array of parameters to generate assignments for.
 *
 * Invariants:
 * - lines must be a mutable string array
 * - params must be an array (can be empty)
 * - Each parameter must have a valid name property
 *
 * Side Effects:
 * - Adds one assignment line per parameter in the format "    this.paramName = paramName;"
 * - If params is empty, no lines are added
 */
export const constructorAssignments = (
  lines: string[],
  params: ParameterDeclaration[],
): void => {
  params.forEach((param) => {
    lines.push(`    this.${param.name} = ${param.name};`);
  });
};

/**
 * Generates a complete constructor based on a JavaConstructorDescriptor.
 * This function no longer makes decisions about what to generate - it simply
 * renders the constructor as described by the descriptor.
 *
 * @param lines - Output array to append constructor lines to.
 * @param className - Name of the Java class for the constructor.
 * @param constructorDescriptor - Complete description of what to generate.
 *
 * Invariants:
 * - lines must be a mutable string array
 * - className must be a valid Java identifier
 * - constructorDescriptor must be a valid JavaConstructorDescriptor
 *
 * Side Effects:
 * - Adds JavaDoc block if documentation is provided
 * - Adds constructor signature line
 * - Adds type assignment line
 * - Adds parameter assignment lines
 * - Adds null assignments for optional parameters as specified
 * - Adds constructor closing brace
 */
export const addSingleConstructor = (
  lines: string[],
  className: string,
  constructorDescriptor: JavaConstructorDescriptor,
): void => {
  generateConstructorJavadoc(
    lines,
    constructorDescriptor.documentation,
    constructorDescriptor.parameters,
  );

  // Add constructor signature
  lines.push(
    `  public ${className}(${constructorParameters(constructorDescriptor.parameters)}) {`,
  );

  // Add type assignment
  lines.push(`    this.type = "${constructorDescriptor.typeValue}";`);

  // Add parameter assignments
  constructorAssignments(lines, constructorDescriptor.parameters);

  // Set optional params to null as specified by the descriptor
  constructorDescriptor.optionalParamsToSetNull.forEach((param) => {
    lines.push(`    this.${param.name} = null;`);
  });

  lines.push('  }');
};
