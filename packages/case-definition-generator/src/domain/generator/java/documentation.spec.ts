import { convertMarkdownToJavadoc } from './documentation';

describe('convertMarkdownToJavadoc', () => {
  it.each([
    ['Simple text', 'Simple text'],
    ['**Bold** text', '<b>Bold</b> text'],
    ['*Italic* text', '<i>Italic</i> text'],
    ['_Italic_ text', '<i>Italic</i> text'],
    ['`code` block', '{@code code} block'],
    ['[Link](http://example.com)', '<a href="http://example.com">Link</a>'],
    ['Paragraph 1\n\nParagraph 2', 'Paragraph 1<p>Paragraph 2'],
    ['Email user@example.com', 'Email user&#64;example.com'],
    ['Code with @: `user@example.com`', 'Code with &#64;: {@code user@example.com}'],
    [
      'Complex: **Bold** and `code` and [link](url)',
      'Complex: <b>Bold</b> and {@code code} and <a href="url">link</a>',
    ],
    ['```\ncode block\n```', '<pre>{@code code block\n}</pre>'],
    ['```java\npublic void test() {}\n```', '<pre>{@code public void test() {}\n}</pre>'],
  ])('converts "%s" to "%s"', (input, expected) => {
    expect(convertMarkdownToJavadoc(input)).toBe(expected);
  });
});
