import { ParameterDeclaration, ParameterType } from '../../typeSystem/types';

/**
 * Describes a Java field that needs to be generated
 */
export type JavaFieldDescriptor = {
  /** The field name */
  name: string;
  /** The type of the field */
  type: ParameterType;
  /** Documentation for the field */
  documentation: string;
  /** The JSON property name for the \@JsonProperty annotation */
  jsonPropertyName: string;
  /** Whether this field is optional */
  optional: boolean;
};

/**
 * Describes a Java constructor that needs to be generated
 */
export type JavaConstructorDescriptor = {
  /** Parameters for this constructor */
  parameters: ParameterDeclaration[];
  /** Documentation for the constructor */
  documentation: string;
  /** The type value to assign (e.g., "_case:ArrayEachEntryLike") */
  typeValue: string;
  /** Optional parameters that should be set to null in this constructor */
  optionalParamsToSetNull: ParameterDeclaration[];
};

/**
 * Describes the complete Java class that needs to be generated
 */
export type JavaDescriptor = {
  /** Package name for the Java class */
  packageName: string;
  /** The base path relative to the java source root */
  basePath: string;
  /** Name of the Java class */
  className: string;
  /**
   * What kind of object this is describing (used for selecting things like
   * interfaces to extend)
   */
  kind: 'matcher' | 'state';
  /** Class-level documentation (optional) */
  classDocumentation?: string;
  /** Generic type parameter for the class (e.g., "M") */
  genericTypeParameter: string;
  /** All fields that need to be generated */
  fields: JavaFieldDescriptor[];
  /** All constructors that need to be generated */
  constructors: JavaConstructorDescriptor[];
  /** Modifiers to add to the current run context */
  currentRunModifiers: Record<string, string>;
  /** Modifiers to add to the context object */
  contextModifiers: Record<string, string>;
};
