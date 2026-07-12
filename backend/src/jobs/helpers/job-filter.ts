import { isRelevantJob, isTargetLocation } from "../../helpers/helpers";
import { isAllowedLocation } from "../../helpers/location-filters";
import { NormalizedJob } from "../interfaces/normalized-jobs.interface";
export function shouldSaveJob(
  job: NormalizedJob,
): boolean {

  if (!isRelevantJob(job.title)) {
    return false;
  }

  if (!isTargetLocation(job.location)) {
    return false;
  }

  return true;
}