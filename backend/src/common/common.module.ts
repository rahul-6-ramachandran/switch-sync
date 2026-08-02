
import { CompanyModule } from '../company/company.module';
import { HttpModule } from '../common/http/http.module';
import { HtmlModule } from '../common/html/html.module';
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience/experience.service';
import { RateLimiterService } from './rate-limiter/rate-limiter.service';

@Module({
  imports: [
    CompanyModule,
    HttpModule,
    HtmlModule
  ],
  providers: [
    ExperienceService,
    RateLimiterService
  ],
  exports: [
    ExperienceService,
     RateLimiterService,
  ],
})
export class CommonModule {}