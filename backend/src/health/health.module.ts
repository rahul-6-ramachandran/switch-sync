import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EngineModule } from '../engine/engine.module';

@Module({
  imports: [PrismaModule, EngineModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}