import { InternalContractCaseCoreSetup } from '@contract-case/case-plugin-dsl-types';

export * from './typeSystem.types';

export type PluginDslDeclaration = {
  /**
   * The author's namespace for this matcher.
   * This is the prefix that the type
   * constants in this package will have.
   */
  readonly namespace: string;
  /** The category within the namespace,
   * used for grouping related matchers
   * together (eg arrays) */
  readonly category: string;
  /**
   * An array of all the matcher DSL objects declared by this
   * plugin.
   *
   * Note that these don't need to map 1:1 to your matcher
   * executors - multiple matcher DSL objects may share the same type.
   */
  readonly matchers: MatcherDslDeclaration[];
  /**
   * An array of all the interaction DSL objects declared by this
   * plugin.
   *
   * Note that, like matchers, these don't need to map 1:1 to your
   * mock executors - you can have multiple interaction DSL objects
   * point to the same executor, but with different properties.
   */
  readonly interactions: InteractionDslDeclaration[];

  /**
   * This allows your plugin to describe extra state objects.
   * Most users won't want to do this, as state objects need to be
   * known by the core engine.
   */
  readonly states?: StateObjectDeclaration[];
};

/**
 * ParameterType tells us what type a parameter is.
 *
 * Possible string values:
 * - `'AnyCaseMatcherOrData'`: Matches arbitrary
 *    data or a ContractCase matcher.
 *    This is ContractCase's most generic unknown type.
 * - `'AnyData'`: Matches any data value only, ie, can't be a matcher.
 * - `'integer'`: Matches integer numbers
 * - `'string'`: Matches string values
 * - `'boolean'`: Matches boolean values
 * - `'number'`: Matches any numeric value.
 *    Because the contract serialises to json, this
 *    practically means double precision floating point; although
 *    the json spec doesn't actually specify, most implementations
 *    are restricted to double precision floating point.
 * - `'null'`: Matches `null` values. Friends don't let friends match
 *    null values.
 *
 * See {@link TypeContainer} for complex types.
 */
export type ParameterType =
  | TypeContainer
  | PassToMatcher
  | 'AnyCaseMatcherOrData'
  | 'AnyData'
  | 'integer'
  | 'string'
  | 'boolean'
  | 'number'
  | 'null'
  | 'json';

/**
 * Indicates a container type.
 *
 * Currently only supports arrays, but in the future may allow specific
 * matchers.
 *
 * Implementations should switch on `kind` and fail if they get a kind that they
 * don't recognise.
 *
 * If you have a use-case that needs more complex container types, please raise
 * an issue.
 */
export type TypeContainer = {
  /** What kind of container this is. Future unions of this type will always have this parameter */
  readonly kind: 'array';
  /** The type of the elements contained within this container */
  readonly type: ParameterType;
};

/** A MatcherReference uniquely identifies a matcher and allows generated code to import and use it */
export type MatcherReference = {
  /** The name of the matcher to pass the parameters to */
  readonly name: string;
  /** The category of the matcher */
  readonly category: string;
  /** The namespace of the matcher */
  readonly namespace: string;
};

/**
 * Indicates a parameter type which assigns the given parameter(s) to a matcher.
 *
 * This is useful for making composite matchers.
 *
 * See the definition of the core function plugin for an example.
 */
export type PassToMatcher = {
  /** What kind of container this is. Future unions of this type will always have this parameter */
  readonly kind: 'PassToMatcher';
  /**
   * The type of the parameters to pass to the matcher.
   *
   * These are passed to the matcher's constructor in order.
   *
   * Make sure they are correct, and in the correct order - no checking of the
   * parameters is done by the generator. We recommend that you generally
   * only reference matchers within the same package, to avoid breaking changes.
   */
  readonly exposedParams: ParameterDeclaration[];

  /** Identifies the matcher to pass these parameters to */
  readonly matcherReference: MatcherReference;
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
  typeof parameterType === 'object' && parameterType.kind === 'array';

export const isPassToMatcher = (
  parameterType: ParameterType,
): parameterType is PassToMatcher =>
  typeof parameterType === 'object' && parameterType.kind === 'PassToMatcher';

/**
 * Declares a parameter for a matcher
 */
export type ParameterDeclaration = {
  /** The name of the parameter, used for documentation, actual method
   * declaration, and any builders.
   *
   * Note that there are some reserved names or names with side effects:
   *
   * - `type`: Reserved for the matcher type.
   * - `example`: Allowed, but will be used as the rendered example for this node.
   * - `resolvesTo`: Allowed, but will control what ContractCase thinks the example's type is.
   */
  readonly name: string;
  /**
   * Documentation for the parameter.
   *
   * Yes, this is required. We're sorry about that,
   * but hopefully the users of your plugin won't be.
   */
  readonly documentation: string;
  /** Type of this parameter */
  readonly type: ParameterType;
  /**
   * If set, whether or not this parameter is optional. Optional parameters must
   * be the last ones in order. Defaults to required if not set
   */
  readonly optional?: boolean;
  /** If set, will override the generated json property name for this parameter */
  readonly jsonPropertyName?: string;
};

/** Defines an object. */
export type DslObjectDeclaration = {
  /*
   * The name of the DSL matcher, in CamelCase with no spaces.
   *
   * This is used to generate the type names, etc. Must
   * be unique within your plugin, across all declarations.
   */
  readonly name: string;
  /**
   * The type constant for your matcher, without the namespace.
   * Along with the namespace, this is what ContractCase uses to
   * determine which implementation to use at match time.
   *
   * Although these must be globally unique for matcher _implementations_,
   * here we're defining the matcher _DSL_. This means that more
   * than one MatcherDslDeclaration can share the same type constant.
   *
   * This is useful if you want to have different defaults or different
   * names in the DSL for the same matcher.
   */
  readonly type: string;

  /**
   * Documentation for this object. Yes, this is required. We're not sorry about that,
   * and hopefully the users of your plugin won't be sorry about it either.
   */
  readonly documentation: string;

  /** An ordered array of parameter declarations. If any parameters are optional, they must be at the end. */
  readonly params: ParameterDeclaration[];
};

/**
 * Defines the DSL for a matcher.
 *
 * Note that more than one Matcher DSL can point
 * to the same matcher implementation - that is, you might have
 * multiple DSL objects with the same type.
 */
export type MatcherDslDeclaration = DslObjectDeclaration & {
  /**
   * A map of constant parameters to add to the matcher. These are parameters that are always the same for all instances of the matcher.
   *
   * See the notes about reserved names on {@link ParameterDeclaration}
   *
   * Currently only strings are supported. If you have a more complex use case, please raise an issue.
   */
  readonly constantParams?: Record<string, string> & {
    /**
     * If specified, sets the `matcher:resolvesTo` value.
     *
     * This tells ContractCase that the example will always resolve to this specific type.
     *
     * It's mostly useful for generating a type-safe DSL, although some matchers
     * may also read it for validation purposes.
     */
    readonly resolvesTo?: Extract<
      ParameterType,
      'string' | 'boolean' | 'number' | 'integer' | 'null'
    >;
  };
  /**
   * A map of context modifiers to add to the context object.
   * These control ContractCase's matching behaviour
   */
  readonly contextModifiers?: Record<string, string>;
  /**
   * A map of modifiers to add to the current run context. These can be used to
   * add matchers that change the user configuration below it. Most of the time you won't need to provide these.
   */
  readonly currentRunModifiers?: Record<string, string>;
};

export type StateObjectDeclaration = DslObjectDeclaration;

export type InteractionDslDeclaration = DslObjectDeclaration & {
  /**
   * Controls the behaviour of the mocked interaction for definition and verification
   */
  readonly setup: InternalContractCaseCoreSetup;
};
