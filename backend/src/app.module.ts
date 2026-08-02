import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { SourcesModule } from './sources/sources.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WatchlistModule } from './watchlist/watchlist.module';
import { CompanyModule } from './company/company.module';
import { EngineModule } from './engine/engine.module';
import { HttpModule } from './common/http/http.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { HomepageModule } from './homepage/homepage.module';
import { CareerModule } from './career/career.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    PrismaModule,
    JobsModule,
    SourcesModule,
    WatchlistModule,
    CompanyModule,
    EngineModule,
    HttpModule,
    NotificationsModule,
    DiscoveryModule,
    HomepageModule,
    CareerModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
