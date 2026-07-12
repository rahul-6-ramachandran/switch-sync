import { Company } from "@prisma/client";

import { WorkdayJob } from "./workday.types";
import { NormalizedJob } from "../../jobs/interfaces/normalized-jobs.interface";
import { isRemoteJob } from "../../helpers/helpers";




export function mapWorkdayJob(
  company: Company,
  job: WorkdayJob,
): NormalizedJob {



  return {

    source: company.ats,

    externalJobId:
      job.bulletFields?.[0] ??
      job.externalPath,

    companyName: company.name,

    title: job.title,

    applicationUrl:
    buildApplicationUrl(
        company?.applyBaseUrl,
        job.externalPath,
    ),

    location:
      job.locationsText,

    remoteStatus:
    isRemoteJob(job.locationsText),

    postedAt:
      parsePostedDate(job.postedOn),

    description: undefined,
  };
}

function parsePostedDate(
  value?: string | null,
): Date | undefined {

  if (!value)
    return undefined;

  const lower =
    value.toLowerCase();

  const today =
    new Date();

  if (lower.includes("today")) {
    return today;
  }

  if (lower.includes("yesterday")) {
    today.setDate(today.getDate() - 1);
    return today;
  }

  const match =
    lower.match(/(\d+)/);

  if (match) {

    const days =
      Number(match[1]);

    today.setDate(
      today.getDate() - days,
    );

    return today;
  }

  return undefined;
}
function buildApplicationUrl(
    base?: string | null,
    path?: string | null,
): string {

    if (!base || !path) {
        return "";
    }

    const cleanBase =
        base.replace(/\/$/, "");

    const cleanPath =
        path.startsWith("/")
            ? path
            : `/${path}`;

    return cleanBase + cleanPath;
}