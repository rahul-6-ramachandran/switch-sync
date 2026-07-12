import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";

import { DiscoveryContext } from "./discovery-context.interface";

@Injectable()
export class AssetExtractor {
  async extract(
    url: string,
  ): Promise<DiscoveryContext> {

    const response = await axios.get(url, {
      timeout: 15000,

      maxRedirects: 5,

      validateStatus: status => status < 400,
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const inlineScripts: string[] = [];

    const externalScripts: string[] = [];

    const metaTags: Record<string, string> = {};

    //----------------------------------------
    // Inline Scripts
    //----------------------------------------

    $("script").each((_, element) => {

      const src = $(element).attr("src");

      if (src) {

        externalScripts.push(
          this.absoluteUrl(
            response.request.res.responseUrl,
            src,
          ),
        );

      } else {

        const script =
          $(element).html();

        if (script?.trim()) {

          inlineScripts.push(script);

        }

      }

    });

    //----------------------------------------
    // Meta Tags
    //----------------------------------------

    $("meta").each((_, element) => {

      const name =
        $(element).attr("name") ??
        $(element).attr("property");

      const content =
        $(element).attr("content");

      if (name && content) {

        metaTags[name] = content;

      }

    });

    return {

      url,

      finalUrl:
        response.request.res.responseUrl,

      html,

      headers:
         Object.fromEntries(
  Object.entries(response.headers).map(([key, value]) => [
    key,
    String(value),
  ]),
),

      inlineScripts,

      externalScripts,

      metaTags,

    };
  }

  private absoluteUrl(
    base: string,
    path: string,
  ) {

    try {

      return new URL(
        path,
        base,
      ).toString();

    } catch {

      return path;

    }

  }
}