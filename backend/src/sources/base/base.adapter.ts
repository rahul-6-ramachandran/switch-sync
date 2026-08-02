import { Logger } from "@nestjs/common";
import { Company } from "@prisma/client";

import { JobSourceAdapter } from "../interfaces/job-source.interface";
import { RateLimiterService } from "../../common/rate-limiter/rate-limiter.service";

export abstract class BaseAdapter
  implements JobSourceAdapter {

  abstract readonly source: string;

  protected readonly logger =
    new Logger(BaseAdapter.name);

  constructor(
    protected readonly rateLimiter: RateLimiterService,
  ) {}

  async sync(
    companies: Company[],
  ): Promise<void> {

    for (const company of companies) {

      await this.rateLimiter.wait();

      try {

        await this.syncCompany(company);

      } catch (error) {

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

  protected abstract syncCompany(
    company: Company,
  ): Promise<void>;

}