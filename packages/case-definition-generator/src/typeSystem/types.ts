export * from './typeSystem.types';

/**
 * ParamType tells us what type a parameter is. If it's a string, this is the
 * type of the parameter.
 */
export type ParameterType = TypeContainer | string;

export type TypeContainer = {
  /** What kind of container this is */
  kind: 'array';
  /** The type of the elements contained within this container */
  type: string;
};

/**
 * Type guard function that determines whether a ParameterType is a TypeContainer
 * or a plain string type.
 *
 * @param parameterType - The parameter type to check
 * @returns true if the parameter is a TypeContainer, false if it's a string
 */
export const isTypeContainer = (
  parameterType: ParameterType,
): parameterType is TypeContainer =>
  typeof parameterType === 'object' &&
  parameterType.kind &&
  typeof parameterType.kind === 'string';

/**
 * Declares a parameter for a matcher
 */
export type ParameterDeclaration = {
  /** The name of the parameter, used for documentation, actual method declaration, and any builders */
  name: string;
  /**
   * Documentation for the parameter. Yes, this is required. We're not sorry about
   * that, and hopefully the users of your plugin won't be sorry about it either.
   */
  documentation: string;
  /** Type of this parameter */
  type: ParameterType;
  /** Whether or not this parameter is optional. Optional parameters must be the last ones in order */
  optional?: boolean;
};

/** Defines the DSL for a matcher. Note that more than one Matcher DSL can point to the same matcher implementation */
export type MatcherDslDeclaration = {
  /*
   * The name of the DSL matcher, in CamelCase with no spaces.
   *
   * This is used to generate the type names, etc. Must
   * be unique within your plugin.
   */
  name: string;
  /**
   * The type constant for your matcher, without the namespace.
   * Along with the namespace, this is what ContractCase uses to
   * determine which implementation to use at match time.
   *
   * Although these must be globally unique for matcher implementations,
   * more than one MatcherDslDeclaration can share the same type constant.
   * This is useful if you want to have different defaults or different
   * names in the DSL for the same matcher.
   */
  type: string;
  /**
   * Documentation for this matcher. Yes, this is required. We're not sorry about that,
   * and hopefully the users of your plugin won't be sorry about it either.
   */
  documentation: string;
  /** An ordered array of parameter declarations. If any parameters are optional, they must be at the end. */
  params: ParameterDeclaration[];
};
