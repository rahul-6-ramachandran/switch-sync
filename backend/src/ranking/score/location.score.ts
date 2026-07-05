import { LOCATION_SCORES } from "../constants/location.constants";

export function locationScore(
  location?: string | null,
): number {

  if (!location) {
    return 0;
  }

  const lower = location.toLowerCase();

  let score = 0;

  for (const rule of LOCATION_SCORES) {

    if (
      rule.keywords.some(keyword =>
        lower.includes(keyword),
      )
    ) {
      score += rule.score;
    }

  }

  return score;
}