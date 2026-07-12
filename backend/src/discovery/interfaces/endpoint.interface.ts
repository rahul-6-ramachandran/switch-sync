export interface EndpointCandidate {
  url: string;
  source:
    | "html"
    | "inline-script"
    | "external-script"
    | "meta";
  confidence: number;
}