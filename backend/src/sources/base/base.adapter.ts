import { Company } from "@prisma/client";
import { JobSourceAdapter } from "../interfaces/job-source.interface";
import { Logger } from "@nestjs/common/services/logger.service";

export abstract class BaseAdapter
  implements JobSourceAdapter {

  abstract readonly source: string;

  protected readonly logger =
    new Logger(this.constructor.name);

  async sync(companies: Company[]) {

    let success = 0;
    let failed = 0;

    for (const company of companies) {

        try {

            await this.syncCompany(company);
            success++;

        } catch (error) {

            failed++;

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown error";

            this.logger.warn(
                `${company.name}: ${message}`,
            );
        }
    }

    this.logger.log(
        `Completed (${success} success, ${failed} failed)`,
    );
}

  protected abstract syncCompany(
    company: Company,
  ): Promise<void>;
}