import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EngineService } from '../engine/engine.service';

const packageJson = require(process.cwd() + '/package.json');

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly engine: EngineService,
  ) {}

  async getHealth() {
    let database = 'connected';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'disconnected';
    }

    return {
      status: database === 'connected' ? 'ok' : 'error',

      timestamp: new Date().toISOString(),

      uptime: Math.floor(process.uptime()),

      version: packageJson.version,

      environment: this.config.get('NODE_ENV'),

      database,

      scheduler: this.engine.getStatus(),
    };
  }
}
