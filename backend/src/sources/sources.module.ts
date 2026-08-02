import { Module, forwardRef } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { JobsModule } from '../jobs/jobs.module';
import { HttpModule } from '../common/http/http.module';
import { EngineModule } from '../engine/engine.module';
import { AdapterRegistry } from './registry/adapter.registry';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { EngineController } from './sources.controller';
import { LeverService } from './lever/lever.service';
import { AshbyService } from './ashby/ashby.service';
import { WorkdayService } from './workday/workday.service';
import { SmartRecruitersService } from './smartrecruiters/smartrecruiters.service';
import { HtmlModule } from '../common/html/html.module';
import { ExperienceService } from '../common/experience/experience.service';
import { WorkdayDetailService } from './workday/workday-detail-service';

import { CompanyModule } from '../company/company.module';

@Module({
  imports: [JobsModule, HttpModule, HtmlModule,CompanyModule, CommonModule, forwardRef(() => EngineModule)],
  providers: [AdapterRegistry, GreenhouseService, LeverService, AshbyService,WorkdayService,SmartRecruitersService, WorkdayDetailService,],
  exports: [AdapterRegistry, GreenhouseService, LeverService, AshbyService, WorkdayService, SmartRecruitersService, ],
  controllers: [EngineController],
})
export class SourcesModule {}