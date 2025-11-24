import { Parser } from 'commonmark';

const escapeHtml = (str: string | null): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/@/g, '&#64;');
};

export const convertMarkdownToJavadoc = (markdown: string): string => {
  const parser = new Parser();
  const parsed = parser.parse(markdown);
  const walker = parsed.walker();
  let event;
  let output = '';

  // eslint-disable-next-line no-cond-assign
  while ((event = walker.next())) {
    const { node, entering } = event;

    switch (node.type as string) {
      case 'text':
        if (entering) {
          output += escapeHtml(node.literal);
        }
        break;
      case 'emph':
        output += entering ? '<i>' : '</i>';
        break;
      case 'strong':
        output += entering ? '<b>' : '</b>';
        break;
      case 'code':
        if (entering && node.literal) {
          output += `{@code ${node.literal}}`;
        }
        break;
      case 'code_block':
        if (entering && node.literal) {
          output += `<pre>{@code ${node.literal}}</pre>`;
        }
        break;
      case 'link':
        if (entering) {
          output += `<a href="${node.destination || ''}">`;
        } else {
          output += '</a>';
        }
        break;
      case 'paragraph':
        if (entering) {
          if (output.length > 0) {
            output += '<p>';
          }
        }
        break;
      case 'softbreak':
        if (entering) {
          output += '\n';
        }
        break;
      case 'hardbreak':
        if (entering) {
          output += '<br>';
        }
        break;
      default:
      // Ignore other nodes
    }
  }
  return output;
};

