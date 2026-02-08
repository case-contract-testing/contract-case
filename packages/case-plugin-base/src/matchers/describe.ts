import { DescribeSegment } from './executors.types';

const BRACKET_PAIRS: { [K in '{}' | '[]' | '()']: [string, string] } = {
  '{}': ['{', '}'],
  '[]': ['[', ']'],
  '()': ['(', ')'],
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
    case 'nested': {
      const [open, close] = BRACKET_PAIRS[segment.brackets];
      return `${open}${renderToString(segment.content)}${close}`;
    }
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
 * Creates a nested description segment wrapped in brackets.
 *
 * @public
 * @param brackets - the bracket style ('{}', '[]', or '()')
 * @param content - the content inside the brackets
 * @returns a nested {@link DescribeSegment}
 */
export const describeNested = (
  brackets: '{}' | '[]' | '()',
  content: DescribeSegment,
): DescribeSegment => ({
  kind: 'nested',
  brackets,
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
