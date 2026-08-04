import { Controller, Get, Headers, Logger, Param, Post, UnauthorizedException } from '@nestjs/common';
import { EngineService } from '../engine/engine.service';
import { ConfigService } from '@nestjs/config';

@Controller('engine')
export class EngineController {
  constructor(private readonly engineService: EngineService,
     private readonly config: ConfigService,
  ) {}

  @Post('sync')
  async syncAll( @Headers('authorization') authorization?: string,) {

       const token =
      authorization?.replace(
        'Bearer ',
        '',
      );

       if (token !== this.config.get('SYNC_SECRET')) {
      throw new UnauthorizedException();
    }

    void this.engineService.sync();

    return {
      success: true,
      message: 'Sync started',
    };
  }

  @Post('sync/:source')
  async syncSource( 
    @Param('source') source: string,
    @Headers('authorization') authorization?: string,) {

      const token =
      authorization?.replace(
        'Bearer ',
        '',
      );

      if (token !== process.env.SYNC_SECRET) {
      throw new UnauthorizedException();
    }

    void this.engineService.syncSource(source);

   return {
      success: true,
      message: `${source} sync started`,
    };
  }
}
