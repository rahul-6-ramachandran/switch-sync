import { htmlToText } from "html-to-text";

export function convertHtmlToText(
  html: string,
): string {

  return htmlToText(html, {
    wordwrap: false,

    selectors: [
      {
        selector: "a",
        options: {
          ignoreHref: true,
        },
      },
    ],
  });

}