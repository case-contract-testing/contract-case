import { DescribeSegment } from './executors.types';

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
      return `{${renderToString(segment.content)}}`;
    case 'array':
      return `[${renderToString(segment.content)}]`;
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
 * @public
 * @param content - the content inside the braces
 * @returns an object {@link DescribeSegment}
 */
export const describeObject = (content: DescribeSegment): DescribeSegment => ({
  kind: 'object',
  content,
});

/**
 * Creates a description segment for an array, wrapped in square brackets.
 *
 * @public
 * @param content - the content inside the brackets
 * @returns an array {@link DescribeSegment}
 */
export const describeArray = (content: DescribeSegment): DescribeSegment => ({
  kind: 'array',
  content,
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
