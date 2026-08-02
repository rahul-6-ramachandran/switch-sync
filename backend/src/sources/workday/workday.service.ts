import { Injectable, Logger } from '@nestjs/common';
import { BaseAdapter } from '../base/base.adapter';
import { ATS } from '../../../constants';
import { JobsService } from '../../jobs/jobs.service';
import { HttpService } from '../../common/http/http.service';
import { AdapterRegistry } from '../registry/adapter.registry';
import { Company } from '@prisma/client';
import { WorkdayResponse } from './workday.types';
import { mapWorkdayJob } from './workday.mapper';
import { ExperienceService } from '../../common/experience/experience.service';
import { WorkdayDetailService } from './workday-detail-service';
import { convertHtmlToText } from '../../common/experience/html-text-helper';
import { isAllowedLocation } from '../../helpers/location-filters';
import { isRelevantJob } from '../../helpers/helpers';
import { CompanyService } from '../../company/company.service';
import { RateLimiterService } from '../../common/rate-limiter/rate-limiter.service';
import { SyncStats } from '../../common/stats/sync-stats';
@Injectable()
export class WorkdayService extends BaseAdapter {
  readonly source = ATS.WORKDAY;

  protected readonly logger = new Logger(WorkdayService.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly http: HttpService,
    private readonly experienceService: ExperienceService,
    private readonly detailService: WorkdayDetailService,
    private readonly companyService: CompanyService,
    rateLimiter: RateLimiterService,
    registry: AdapterRegistry,
  ) {
    super(rateLimiter);

    registry.register(this);
  }

  protected async syncCompany(company: Company): Promise<void> {
    const url = company.boardUrl;

    if (!url) {
      this.logger.warn(`${company.name} has no boardUrl`);
      return;
    }

    this.logger.log(`Fetching ${company.name}`);

    const stats = new SyncStats();

    const body = company.requestBody ?? {};

    const PAGE_SIZE = 20;
    const MAX_PAGES = 10;

    let offset = 0;
    let page = 1;

    while (page <= MAX_PAGES) {
      const baseBody =
        body && typeof body === 'object' && !Array.isArray(body)
          ? (body as Record<string, any>)
          : {};

      const requestBody = {
        ...baseBody,
        offset,
        limit: PAGE_SIZE,
      };

      this.logger.debug(`${company.name} | Page ${page} | Offset ${offset}`);

      const response = await this.http.post<WorkdayResponse>(url, requestBody);

      const jobs = response.jobPostings ?? [];

      this.logger.log(`${company.name} -> fetched ${jobs.length} jobs`);

      if (!jobs.length) {
        this.logger.log(`${company.name} -> no more jobs`);
        break;
      }

      for (const job of jobs) {
        stats.jobsSeen++;
        this.logger.debug(`[${company.name}] ${job.title}`);
        const normalized = mapWorkdayJob(company, job);

        if (!isRelevantJob(normalized.title)) {
          stats.titleSkipped++;
          continue;
        }

        if (!isAllowedLocation(normalized.location)) {
          stats.locationSkipped++;
          continue;
        }

        const exists = await this.jobsService.exists(
          normalized.source,
          normalized.externalJobId,
        );

        if (exists) {
          this.logger.log(
            `${company.name} -> reached existing relevant job. Incremental sync complete.`,
          );

          await this.companyService.updateLastSynced(company.id);

          this.logger.log(`${company.name} completed`);

          stats.existing++;

          return;
        }

        try {
          const detail = await this.detailService.fetch(
            company.boardUrl!,
            job.externalPath,
          );

          const description = convertHtmlToText(
            detail.jobPostingInfo.jobDescription,
          );

          normalized.description = description;

          const experience = this.experienceService.extract(description);

          normalized.experienceMin = experience.min;

          normalized.experienceMax = experience.max;

          if (experience.min != null && experience.max != null) {
            normalized.experienceText = `${experience.min}-${experience.max} years`;
          } else if (experience.min != null) {
            normalized.experienceText = `${experience.min}+ years`;
          }

          if (experience.min != null && experience.min > 3) {
            stats.experienceSkipped++;
            this.logger.debug(
              `${normalized.title} skipped (${experience.min}+ years)`,
            );

            continue;
          }
        } catch (error) {
          stats.detailFailures++;
          this.logger.warn(
            `${company.name} -> Failed to fetch details for "${normalized.title}". Saving without experience.`,
          );
        }

        await this.jobsService.upsertJob(normalized);
        stats.saved++;
      }

      if (jobs.length < PAGE_SIZE) {
        this.logger.log(`${company.name} -> last page reached`);
        break;
      }

      page++;
      offset += PAGE_SIZE;
    }

    if (page > MAX_PAGES) {
      this.logger.warn(`${company.name} reached MAX_PAGES (${MAX_PAGES})`);
    }

    await this.companyService.updateLastSynced(company.id);

    this.logger.log(
      `${company.name} | Seen:${stats.jobsSeen} Saved:${stats.saved} Existing:${stats.existing} Title:${stats.titleSkipped} Location:${stats.locationSkipped} Exp:${stats.experienceSkipped} DetailFail:${stats.detailFailures}`,
    );
  }
}
