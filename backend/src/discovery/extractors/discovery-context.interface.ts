export interface DiscoveryContext {
  /**
   * Original URL passed to the extractor.
   */
  url: string;

  /**
   * Final URL after redirects.
   */
  finalUrl: string;

  /**
   * Entire HTML document.
   */
  html: string;

  /**
   * Response headers.
   */
headers: Record<string, unknown>;

  /**
   * Inline <script> contents.
   */
  inlineScripts: string[];

  /**
   * External JS files.
   */
  externalScripts: string[];

  /**
   * HTML meta tags.
   */
  metaTags: Record<string, string>;
}