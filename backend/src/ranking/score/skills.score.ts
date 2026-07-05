import { SKILL_SCORES } from "../constants/skills.constants";

export function skillsScore(
  text: string,
): number {

  const lower = text.toLowerCase();

  let score = 0;

  for (const skill of SKILL_SCORES) {

    if (lower.includes(skill.keyword)) {
      score += skill.score;
    }

  }

  return score;
}