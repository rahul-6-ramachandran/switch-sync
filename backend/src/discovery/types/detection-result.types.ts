export interface DetectionResult {
  ats: string;
  board: string;
  confidence: number;
  detectedFrom: string;
}
export interface DiscoveryContext {

    url: string;

    finalUrl: string;

    html: string;

    headers: Record<string, string>;

    inlineScripts: string[];

    externalScripts: string[];

    metaTags: Record<string,string>;

}