import { Injectable, Logger } from "@nestjs/common";
import { Company } from "@prisma/client";

import { DetectorRegistry } from "../sources/registry/detector.registry";
import { CompanyService } from "../company/company.service";
import { AssetExtractor } from "./extractors/asset.extractor";

import { DetectionResult } from "./types/detection-result.types";
import { EndpointExtractor } from "./extractors/endpoint.extractor";

@Injectable()
export class DiscoveryService {
  private readonly logger = new Logger(DiscoveryService.name);

  constructor(
    private readonly registry: DetectorRegistry,
    private readonly companyService: CompanyService,
    private readonly extractor: AssetExtractor,
      private readonly endpointExtractor: EndpointExtractor,
  ) {}

  async discoverAll() {
    const companies =
      await this.companyService.findUnknownATS();

    this.logger.log(
      `Found ${companies.length} companies with unknown ATS`,
    );

    for (const company of companies) {
      try {
        await this.discoverCompany(company);
      } catch (error) {
        this.logger.error(
          `Discovery failed for ${company.name}`,
          error,
        );
      }
    }
  }

  async discover(
    url: string,
  ): Promise<DetectionResult | null> {
    try {
      const context =
        await this.extractor.extract(url);


        const endpoints =
            this.endpointExtractor.extract(context);

          this.logger.log(
            `Found ${endpoints.length} endpoint candidates`,
          );

          endpoints
            .slice(0, 20)
            .forEach(endpoint =>
              this.logger.log(
                `${endpoint.confidence}% -> ${endpoint.url}`,
              ),
            );

      this.logger.log("======================================");
      this.logger.log(`Career URL : ${url}`);
      this.logger.log(`Final URL  : ${context.finalUrl}`);

      this.logger.log(
        `Inline Scripts : ${context.inlineScripts.length}`,
      );

      this.logger.log(
        `External Scripts : ${context.externalScripts.length}`,
      );

      this.logger.log(
        `Meta Tags : ${Object.keys(context.metaTags).length}`,
      );

      this.logger.log("------ External Scripts ------");

      context.externalScripts
        .slice(0, 20)
        .forEach(script =>
          this.logger.log(script),
        );

      this.logger.log("------ Meta Tags ------");

      this.logger.log(context.metaTags);

      this.logger.log("------ Running Detectors ------");

      for (const detector of this.registry.getDetectors()) {
        this.logger.debug(
          `Trying ${detector.name}`,
        );

        const result =
          await detector.detect(context as any);

        if (result) {
          this.logger.log(
            `✔ Detector matched : ${detector.name}`,
          );

          return result;
        }
      }

      this.logger.warn(
        "No detector matched.",
      );

      this.logger.log("======================================");

      return null;
    } catch (error) {
      this.logger.error(
        `Failed to fetch ${url}`,
        error,
      );

      return null;
    }
  }

  async discoverCompany(
    company: Company,
  ) {
    if (!company.careerUrl) {
      return;
    }

    this.logger.log("");
    this.logger.log(
      `========== ${company.name} ==========`,
    );

    const result =
      await this.discover(company.careerUrl);

    if (!result) {
      this.logger.warn(
        `${company.name} -> UNKNOWN ATS`,
      );

      return;
    }

    this.logger.log(
      `${company.name} -> ${result.ats} (${result.board})`,
    );

    await this.companyService.updateATS(
      company.id,
      result,
    );

    this.logger.log(
      `Database updated successfully.`,
    );
  }
}