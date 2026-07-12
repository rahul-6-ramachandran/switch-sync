import { Injectable, Logger } from "@nestjs/common";
import { BaseAdapter } from "../base/base.adapter";
import { ATS } from "../../../constants";
import { JobsService } from "../../jobs/jobs.service";
import { HttpService } from "../../common/http/http.service";
import { AdapterRegistry } from "../registry/adapter.registry";
import { Company } from "@prisma/client";
import { WorkdayResponse } from "./workday.types";
import { mapWorkdayJob } from "./workday.mapper";
@Injectable()
export class WorkdayService extends BaseAdapter {
  readonly source = ATS.WORKDAY;

  protected readonly logger =
    new Logger(WorkdayService.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly http: HttpService,
    registry: AdapterRegistry,
  ) {
    super();

    registry.register(this);
  }

  protected async syncCompany(
    company: Company,
  ): Promise<void> {
    const url = company.boardUrl;

    if (!url) {
      this.logger.warn(
        `${company.name} has no boardUrl`,
      );
      return;
    }

    this.logger.log(
      `Fetching ${company.name}`,
    );

    const body =
      company.requestBody ?? {};

const PAGE_SIZE = 20;
const MAX_PAGES = 10;

let offset = 0;
let page = 1;

while (page <= MAX_PAGES) {

  const baseBody =
    body &&
    typeof body === "object" &&
    !Array.isArray(body)
      ? (body as Record<string, any>)
      : {};

  const requestBody = {
    ...baseBody,
    offset,
    limit: PAGE_SIZE,
  };

  this.logger.debug(
    `${company.name} | Page ${page} | Offset ${offset}`,
  );

  const response =
    await this.http.post<WorkdayResponse>(
      url,
      requestBody,
    );

  const jobs =
    response.jobPostings ?? [];

  this.logger.log(
    `${company.name} -> fetched ${jobs.length} jobs`,
  );

  if (!jobs.length) {
    this.logger.log(
      `${company.name} -> no more jobs`,
    );
    break;
  }

  for (const job of jobs) {
    this.logger.debug(job.title);
  const normalized =
    mapWorkdayJob(
      company,
      job,
    );

  await this.jobsService.upsertJob(
    normalized,
  );

  }

  if (jobs.length < PAGE_SIZE) {
    this.logger.log(
      `${company.name} -> last page reached`,
    );
    break;
  }

  page++;
  offset += PAGE_SIZE;

 
  await new Promise(resolve =>
    setTimeout(resolve, 300),
  );
}



if (page > MAX_PAGES) {
  this.logger.warn(
    `${company.name} reached MAX_PAGES (${MAX_PAGES})`,
  );
}


this.logger.log(
  `${company.name} completed`,
);
  

    }
}