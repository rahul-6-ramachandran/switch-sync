import { ATS } from "../../common/constants/ats";

export function atsScore(
  source: string,
): number {

  switch (source) {

    case ATS.GREENHOUSE:
      return 5;

    case ATS.LEVER:
      return 5;

    case ATS.ASHBY:
      return 4;

    case ATS.SMART_RECRUITERS:
      return 3;

    case ATS.WORKDAY:
      return 2;

    default:
      return 0;
  }

}