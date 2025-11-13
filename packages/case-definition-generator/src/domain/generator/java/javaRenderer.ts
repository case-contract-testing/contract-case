import { JavaDescriptor, JavaFieldDescriptor } from './types';
import { addSingleConstructor } from './constructors';

/**
 * Renders the package declaration and import statements.
 *
 * @param lines - Output array to append lines to
 * @param descriptor - JavaDescriptor containing package and import information
 */
const renderPackageAndImports = (
  lines: string[],
  descriptor: JavaDescriptor,
): void => {
  // Package declaration
  lines.push(`package ${descriptor.packageName};`);
  lines.push('');

  // Imports
  descriptor.imports.forEach((importStatement) => {
    lines.push(importStatement);
  });
  lines.push('');
};

/**
 * Renders class documentation if present.
 *
 * @param lines - Output array to append lines to
 * @param descriptor - JavaDescriptor containing class documentation
 */
const renderClassDocumentation = (
  lines: string[],
  descriptor: JavaDescriptor,
): void => {
  if (descriptor.classDocumentation) {
    lines.push('/**');
    lines.push(` * ${descriptor.classDocumentation}`);
    lines.push(' *');
    lines.push(
      ` * @param <${descriptor.genericTypeParameter}> Any matcher or data`,
    );
    lines.push(' */');
  }
};

/**
 * Renders the class declaration.
 *
 * @param lines - Output array to append lines to
 * @param descriptor - JavaDescriptor containing class information
 */
const renderClassDeclaration = (
  lines: string[],
  descriptor: JavaDescriptor,
): void => {
  lines.push(
    `public class ${descriptor.className}<${descriptor.genericTypeParameter}> {`,
  );
};

/**
 * Renders a single field with its annotations.
 *
 * @param lines - Output array to append lines to
 * @param field - Field descriptor containing all field information
 */
const renderField = (lines: string[], field: JavaFieldDescriptor): void => {
  lines.push('');
  if (field.needsJsonInclude) {
    lines.push('  @JsonInclude(Include.NON_NULL)');
  }
  lines.push(`  @JsonProperty("${field.jsonPropertyName}")`);
  const finalKeyword = field.isFinal ? 'final ' : '';
  lines.push(`  ${finalKeyword}${field.javaType} ${field.name};`);
};

/**
 * Renders all fields defined in the descriptor.
 *
 * @param lines - Output array to append lines to
 * @param descriptor - JavaDescriptor containing field information
 */
const renderFields = (lines: string[], descriptor: JavaDescriptor): void => {
  descriptor.fields.forEach((field) => {
    renderField(lines, field);
  });
};

/**
 * Renders all constructors defined in the descriptor.
 *
 * @param lines - Output array to append lines to
 * @param descriptor - JavaDescriptor containing constructor information
 */
const renderConstructors = (
  lines: string[],
  descriptor: JavaDescriptor,
): void => {
  descriptor.constructors.forEach((constructor) => {
    addSingleConstructor(lines, descriptor.className, constructor);
  });
};

/**
 * Renders the class closing brace.
 *
 * @param lines - Output array to append lines to
 */
const renderClassClosing = (lines: string[]): void => {
  lines.push('');
  lines.push('}');
};

/**
 * Renders a complete Java class based on a JavaDescriptor.
 * This function contains only generation logic and makes no decisions
 * about what to generate - it simply renders what is described in the descriptor.
 *
 * @param descriptor - Complete description of the Java class to generate
 * @returns Complete Java class source code as a string
 */
export function renderJavaClass(descriptor: JavaDescriptor): string {
  const lines: string[] = [];

  renderPackageAndImports(lines, descriptor);
  renderClassDocumentation(lines, descriptor);
  renderClassDeclaration(lines, descriptor);
  renderFields(lines, descriptor);
  renderConstructors(lines, descriptor);
  renderClassClosing(lines);

  return lines.join('\n');
}
