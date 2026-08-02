import { htmlToText } from 'html-to-text';

export function htmlToPlainText(html: string): string {
  return htmlToText(html, {
    wordwrap: false,
  });
}
