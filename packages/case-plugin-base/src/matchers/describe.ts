/**
 * A structured segment of a matcher description. Instead of returning a flat
 * string, `describe` functions return a tree of these segments, which can be
 * rendered into a flat string (for use as a lookup key) or pretty-printed with
 * indentation for nested structures.
 *
 * @public
 */
export type DescribeSegment =
  | {
      /** A plain text message */
      readonly kind: 'message';
      /** The text content of this segment */
      readonly message: string;
    }
  | {
      /** An object description wrapped in curly braces */
      readonly kind: 'object';
      /** The key/value entries of the object */
      readonly entries: ReadonlyArray<{
        readonly key: string;
        readonly value: DescribeSegment;
      }>;
    }
  | {
      /** An array description wrapped in square brackets */
      readonly kind: 'array';
      /** The elements of the array */
      readonly elements: ReadonlyArray<DescribeSegment>;
    }
  | {
      /** A concatenation of multiple segments */
      readonly kind: 'concat';
      /** The segments to concatenate */
      readonly segments: ReadonlyArray<DescribeSegment>;
    }
  | {
      /** Multiple segments joined with a separator */
      readonly kind: 'join';
      /** The separator string between segments */
      readonly separator: string;
      /** The segments to join */
      readonly segments: ReadonlyArray<DescribeSegment>;
    };

/**
 * Renders a {@link DescribeSegment} tree into a flat string.
 *
 * Use this when you need the description as a string, for example when using
 * the description as a lookup key, or when embedding the description in an
 * error message.
 *
 * @public
 * @param segment - the segment tree to render
 * @returns the flat string representation
 */
export const renderToString = (segment: DescribeSegment): string => {
  switch (segment.kind) {
    case 'message':
      return segment.message;
    case 'object':
      return `{${segment.entries.map(({ key, value }) => `${key}: ${renderToString(value)}`).join(',')}}`;
    case 'array':
      return `[${segment.elements.map(renderToString).join(',')}]`;
    case 'concat':
      return segment.segments.map(renderToString).join('');
    case 'join':
      return segment.segments.map(renderToString).join(segment.separator);
    default:
      throw new Error(
        `Unknown DescribeSegment kind: ${(segment as DescribeSegment).kind}`,
      );
  }
};

/**
 * Creates a plain text description segment.
 *
 * @public
 * @param message - the text content
 * @returns a message {@link DescribeSegment}
 */
export const describeMessage = (message: string): DescribeSegment => ({
  kind: 'message',
  message,
});

/**
 * Creates a description segment for an object, wrapped in curly braces.
 *
 * Renders as `{key1: value1,key2: value2}`.
 *
 * @public
 * @param entries - the key/value entries of the object
 * @returns an object {@link DescribeSegment}
 */
export const describeObject = (
  entries: Array<{ key: string; value: DescribeSegment }>,
): DescribeSegment => ({
  kind: 'object',
  entries,
});

/**
 * Creates a description segment for an array, wrapped in square brackets.
 *
 * Renders as `[element1,element2]`.
 *
 * @public
 * @param elements - the elements of the array
 * @returns an array {@link DescribeSegment}
 */
export const describeArray = (
  elements: DescribeSegment[],
): DescribeSegment => ({
  kind: 'array',
  elements,
});

/**
 * Creates a concatenation of multiple description segments.
 *
 * @public
 * @param segments - the segments to concatenate
 * @returns a concat {@link DescribeSegment}
 */
export const describeConcat = (
  ...segments: DescribeSegment[]
): DescribeSegment => ({
  kind: 'concat',
  segments,
});

/**
 * Creates a description segment of multiple sub-segments joined with a separator.
 *
 * @public
 * @param separator - the separator string between segments
 * @param segments - the segments to join
 * @returns a join {@link DescribeSegment}
 */
export const describeJoin = (
  separator: string,
  segments: DescribeSegment[],
): DescribeSegment => ({
  kind: 'join',
  separator,
  segments,
});
