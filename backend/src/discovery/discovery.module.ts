import { Module } from "@nestjs/common";
import { DetectorRegistry } from "../sources/registry/detector.registry";
import { GreenhouseDetector } from "./detectors/greenhouse.detector";
import { DiscoveryController } from "./discovery.controller";
import { DiscoveryService } from "./discovery.service";
import { CompanyModule } from "../company/company.module";
import { LeverDetector } from "./detectors/lever.detector";
import { AshbyDetector } from "./detectors/ashby.detector";
import { WorkdayDetector } from "./detectors/workday.detector";
import { WorkableDetector } from "./detectors/workable.detector";
import { SmartRecruiterDetector } from "./detectors/smart-recruiter.detector";
import { HtmlModule } from "../common/html/html.module";
import { AssetExtractor } from "./extractors/asset.extractor";
import { EndpointExtractor } from "./extractors/endpoint.extractor";
@Module({
  imports: [CompanyModule,HtmlModule],
  providers: [
    DetectorRegistry,
    DiscoveryService,
    GreenhouseDetector,
    LeverDetector,
    AshbyDetector,
    WorkdayDetector,
    WorkableDetector,
    SmartRecruiterDetector,
      AssetExtractor,
          EndpointExtractor,
  ],
  controllers: [DiscoveryController],
  exports:[AssetExtractor, EndpointExtractor]
})
export class DiscoveryModule {}