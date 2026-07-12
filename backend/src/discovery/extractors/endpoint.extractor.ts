import { Injectable } from "@nestjs/common";

import { DiscoveryContext } from "./discovery-context.interface";
import { EndpointCandidate } from "../interfaces/endpoint.interface";
import { ENDPOINT_PATTERNS } from "../matchers/endpoint.patterns";

@Injectable()
export class EndpointExtractor {

  extract(
    context: DiscoveryContext,
  ): EndpointCandidate[] {

    //---------------------------------------------------
    // Build one searchable corpus
    //---------------------------------------------------

    const corpus = [

      context.html,

      ...context.inlineScripts,

      ...context.externalScripts,

      ...Object.values(context.metaTags),

      context.finalUrl,

    ].join("\n");

    //---------------------------------------------------
    // Deduplicate using Map
    //---------------------------------------------------

    const endpoints =
      new Map<string, EndpointCandidate>();

    //---------------------------------------------------
    // Run every regex
    //---------------------------------------------------

    for (const pattern of ENDPOINT_PATTERNS) {

      const matches =
        corpus.matchAll(pattern);

      for (const match of matches) {

        const endpoint = match[0];

        const candidate: EndpointCandidate = {

          url: endpoint,

          source: "html",

          confidence:
            this.calculateConfidence(endpoint),

        };

        const existing =
          endpoints.get(endpoint);

        if (
          !existing ||
          existing.confidence < candidate.confidence
        ) {

          endpoints.set(
            endpoint,
            candidate,
          );

        }

      }

    }

    //---------------------------------------------------
    // Return sorted
    //---------------------------------------------------

    return [...endpoints.values()]
      .sort(
        (a, b) =>
          b.confidence - a.confidence,
      );

  }

  //---------------------------------------------------
  // Confidence Score
  //---------------------------------------------------

  private calculateConfidence(
    endpoint: string,
  ): number {

    const lower =
      endpoint.toLowerCase();

    if (
      lower.includes("graphql")
    ) {

      return 100;

    }

    if (
      lower.includes("/api/")
    ) {

      return 95;

    }

    if (
      lower.includes("/jobs")
    ) {

      return 90;

    }

    if (
      lower.includes("/careers")
    ) {

      return 85;

    }

    if (
      lower.includes("/search")
    ) {

      return 80;

    }

    return 60;

  }

}