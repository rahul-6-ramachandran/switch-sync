import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { JobsService } from '../../jobs/jobs.service';

import { leverCompanies } from './companies';
import {  isRemoteJob } from '../../helpers/helpers';
import { isAllowedLocation } from '../../helpers/location-filters';
import { JobSourceAdapter } from '../interfaces/job-source.interface';
import { AdapterRegistry } from '../registry/adapter.registry';
import { BaseAdapter } from '../base/base.adapter';
import { HttpService } from '../../common/http/http.service';
import { LeverResponse } from '../../types/ats/lever.types';
import { ATS } from '../../common/constants/ats';
import { Company } from '@prisma/client';


@Injectable()
export class LeverService extends BaseAdapter {
  readonly source = ATS.LEVER

  constructor(
    private readonly jobsService: JobsService,
    private readonly registry: AdapterRegistry,
        private http: HttpService,
  ) {
    super()
    this.registry.register(this)
  }

protected async syncCompany(
    company: Company
): Promise<void> {
  const board = company.board!;

    const companyName = company.name;
    try {
      const url =
        `https://api.lever.co/v0/postings/${board}?mode=json`;

      const data = await this.http.get<LeverResponse>(url);

      let synced = 0;

      for (const job of data) {
        const location =
          job.categories?.location ?? null;


        await this.jobsService.upsertJob({
          source: 'lever',

          externalJobId: job.id,

          companyName,

          title: job.text,

          location,

          remoteStatus:
            isRemoteJob(location),

          applicationUrl:
            job.hostedUrl,

          postedAt: new Date(),
        });

        synced++;
      }

      this.logger.log(
        `${companyName}: ${synced} jobs synced`,
      );
    } catch (error: any) {
      const message =
                error instanceof Error
                    ? error.message
                    : "Unknown error";

            this.logger.warn(
                `${company.name}: ${message}`,
            );
    }
  }
}