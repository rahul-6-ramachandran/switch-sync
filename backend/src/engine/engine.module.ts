import { Module, forwardRef } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { SourcesModule } from '../sources/sources.module';
import { EngineService } from './engine.service';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [CompanyModule, forwardRef(() => SourcesModule), JobsModule],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
