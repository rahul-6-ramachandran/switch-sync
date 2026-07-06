import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}


  @Get('summary')
    getSummary() {
      return this.jobsService.getSummary();
    }

    @Get('facets')
    getFacets() {
      return this.jobsService.getFacets();
    }

  @Get()
  async findAll(
    @Query('q') q?: string,

    @Query('company') company?: string,

    @Query('remote') remote?: string,

    @Query('page') page = '1',

    @Query('limit') limit = '20',

    @Query("source")
    source?: string,

    @Query("location")
    location?: string,

    @Query("postedWithinDays")
    postedWithinDays?: string,

     @Query("experience")
    experience?: string,
  ) {
    return this.jobsService.findAll({
      q,

      company,

      remote:
        remote !== undefined
          ? remote === 'true'
          : undefined,

      page: Number(page),

      limit: Number(limit),

      source,

      location,

      experience:
        experience !== undefined
          ? experience
          : undefined,

      postedWithinDays:
          postedWithinDays
              ? Number(postedWithinDays)
              : undefined,
    });
  }
}