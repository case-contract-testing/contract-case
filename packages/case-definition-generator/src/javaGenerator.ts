import { getType } from './typeSystem';
import {
  LanguageTypes,
  MatcherDslDeclaration,
  ParameterDeclaration,
} from './typeSystem/types';

const generateConstructorJavadoc = (
  documentation: string,
  parameters: ParameterDeclaration[],
) => {
  let constructorJavadoc = '';
  if (documentation) {
    constructorJavadoc += `\n  /**\n   * ${documentation}`;

    if (parameters && parameters.length > 0) {
      constructorJavadoc += `\n   *`;
      parameters.forEach((param) => {
        constructorJavadoc += `\n   * @param ${param.name} ${param.documentation || ''}`;
      });
    }
    constructorJavadoc += '\n   */';
  }
  return constructorJavadoc;
};

const javaLanguageTypes: LanguageTypes = {
  array: (type) => `List<${type}>`,
  data: 'Object',
  matcher: 'M',
};

export function generateJavaDslCode(
  definition: MatcherDslDeclaration,
  namespace: string,
): string {
  // Helper to get Java type from param type

  // Class name
  const className = definition.name;

  // Imports
  const importsArr: string[] = [];
  if (definition.params.some((p) => p.optional)) {
    importsArr.push('import com.fasterxml.jackson.annotation.JsonInclude;');
    importsArr.push(
      'import com.fasterxml.jackson.annotation.JsonInclude.Include;',
    );
  }
  importsArr.push('import com.fasterxml.jackson.annotation.JsonProperty;');
  if (
    definition.params.some(
      (p) =>
        typeof p.type === 'object' &&
        p.type.kind &&
        p.type.kind.toLowerCase() === 'array',
    )
  ) {
    importsArr.push('import java.util.List;');
  }
  const imports = importsArr.join('\n');

  // Fields
  let fields = '';
  fields += `\n  @JsonProperty("_case:matcher:type")\n  final String type;\n`;
  definition.params.forEach((param) => {
    const javaType = getType(param.type, javaLanguageTypes);
    const isOptional = !!param.optional;
    const annotation = isOptional ? '\n  @JsonInclude(Include.NON_NULL)' : '';
    fields += `${annotation}\n  @JsonProperty("_case:matcher:${param.name}")\n  final ${javaType} ${param.name};\n`;
  });

  // Javadoc
  let headJavadoc = '';
  if (definition.documentation) {
    headJavadoc += `/**\n * ${definition.documentation}`;
    headJavadoc += `\n *`;
    headJavadoc += '\n * @param <M> Any matcher or data';
    headJavadoc += '\n */';
  }

  // Constructors
  // Generate all combinations of required/optional parameters
  const requiredParams = definition.params.filter((p) => !p.optional);
  const optionalParams = definition.params.filter((p) => p.optional);

  // Helper to generate constructor param list and assignments
  function constructorParameters(params: ParameterDeclaration[]) {
    return params
      .map((param) => `${getType(param.type, javaLanguageTypes)} ${param.name}`)
      .join(', ');
  }
  function constructorAssignments(params: ParameterDeclaration[]) {
    return params
      .map((param) => `\n    this.${param.name} = ${param.name};`)
      .join('');
  }

  // Always include a constructor with only required params
  let constructors = `${generateConstructorJavadoc(definition.documentation, requiredParams)}`;
  constructors += `\n  public ${className}(${constructorParameters(requiredParams)}) {`;
  constructors += `\n    this.type = "${namespace}:${definition.type}";`;
  constructors += constructorAssignments(requiredParams);
  // For optional params, set them to null
  optionalParams.forEach((param) => {
    constructors += `\n    this.${param.name} = null;`;
  });
  constructors += '\n  }\n';

  // For each combination of required + optional params, add overloaded constructors
  if (optionalParams.length > 0) {
    // Only one constructor with all params (required + all optional)
    constructors += `${generateConstructorJavadoc(definition.documentation, [...requiredParams, ...optionalParams])}`;
    constructors += `\n  public ${className}(${constructorParameters([...requiredParams, ...optionalParams])}) {`;
    constructors += `\n    this.type = "${namespace}:${definition.type}";`;
    constructors += constructorAssignments([
      ...requiredParams,
      ...optionalParams,
    ]);
    constructors += `\n  }\n`;
  }

  // Compose
  const resultArr: string[] = [];
  resultArr.push('package io.contract_testing.contractcase.definitions;\n');
  resultArr.push(`${imports}\n`);
  if (headJavadoc) {
    resultArr.push(`${headJavadoc}`);
  }
  resultArr.push(`public class ${className}<M> {`);
  resultArr.push(fields.trimEnd());
  resultArr.push(constructors);
  resultArr.push('}');
  return resultArr.join('\n');
}
