import { generateDslCode } from './generator';
import { generateJavaDslCode } from './javaGenerator';
import { MatcherDslDeclaration } from './typeSystem/types';

const matcherDefinition: MatcherDslDeclaration = {
  name: 'ArrayEachEntryMatches',
  type: 'ArrayEachEntryLike',
  documentation:
    'Matches an array where each element matches the provided matcher.',
  params: [
    {
      name: 'matcher',
      documentation: 'The matcher to match against each element of the array.',
      type: 'AnyCaseMatcherOrData',
    },
    {
      name: 'example',
      documentation: 'Example data to use instead of the generated one',
      type: { kind: 'array', type: 'AnyData' },
      optional: true,
    },
  ],
};

const matcherContainsDefinition: MatcherDslDeclaration = {
  name: 'ArrayContains',
  type: 'ArrayContains',
  documentation:
    'Matches an Array which contains elements that match the given matchers. Note that two different matchers may be satisfied by the same item in the array.',
  params: [
    {
      name: 'matchers',
      documentation:
        'Any number of matchers, each of which must be found inside the array, in any order.',
      type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
    },
  ],
};

describe('generator', () => {
  describe('typescript', () => {
    it('generates a matcher as expected', () => {
      expect(generateDslCode(matcherDefinition, '_case')).toBe(`
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

// Constant
export const ARRAY_EACH_ENTRY_LIKE_TYPE = '_case:ArrayEachEntryLike' as const;

// Interface
export interface CoreArrayEachEntryMatchesMatches {
  '_case:matcher:type': typeof ARRAY_EACH_ENTRY_LIKE_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:example'?: AnyData[];
}

// Factory Function
/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param matcher - The matcher to match against each element of the array.
 * @param example - Example data to use instead of the generated one
 */
export const arrayEachEntryMatches = (matcher: AnyCaseMatcherOrData, example?: AnyData[]): CoreArrayEachEntryMatchesMatches => ({
  '_case:matcher:type': ARRAY_EACH_ENTRY_LIKE_TYPE,
  '_case:matcher:matcher': matcher,
  ...(example !== undefined ? { '_case:matcher:example': example } : {}),
});
`);
    });
  });
  describe('java', () => {
    it('generates a matcher as expected', () => {
      expect(generateJavaDslCode(matcherDefinition, '_case'))
        .toBe(`package io.contract_testing.contractcase.definitions;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param <M> Any matcher or data
 */
public class ArrayEachEntryMatches<M> {

  @JsonProperty("_case:matcher:type")
  final String type;

  @JsonProperty("_case:matcher:matcher")
  final M matcher;

  @JsonInclude(Include.NON_NULL)
  @JsonProperty("_case:matcher:example")
  final List<Object> example;

  /**
   * Matches an array where each element matches the provided matcher.
   *
   * @param matcher The matcher to match against each element of the array.
   */
  public ArrayEachEntryMatches(M matcher) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
    this.example = null;
  }

  /**
   * Matches an array where each element matches the provided matcher.
   *
   * @param matcher The matcher to match against each element of the array.
   * @param example Example data to use instead of the generated one
   */
  public ArrayEachEntryMatches(M matcher, List<Object> example) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
    this.example = example;
  }

}`);
    });
    it('works for the other case too', () => {
      expect(generateJavaDslCode(matcherContainsDefinition, '_case')).toBe(
        `package io.contract_testing.contractcase.definitions;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Matches an Array which contains elements that match the given matchers. Note that two different matchers may be satisfied by the same item in the array.
 *
 * @param <M> Any matcher or data
 */
public class ArrayContains<M> {

  @JsonProperty("_case:matcher:type")
  final String type;

  @JsonProperty("_case:matcher:matchers")
  final List<M> matchers;

  /**
   * Matches an Array which contains elements that match the given matchers. Note that two different matchers may be satisfied by the same item in the array.
   *
   * @param matchers Any number of matchers, each of which must be found inside the array, in any order.
   */
  public ArrayContains(List<M> matchers) {
    this.type = "_case:ArrayContains";
    this.matchers = matchers;
  }

}`,
      );
    });
  });
});
