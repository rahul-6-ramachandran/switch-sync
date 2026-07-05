import { EXPERIENCE_SCORES } from "../constants/experience.constants";

export function experienceScore(
    title: string,
): number {

    const lower = title.toLowerCase();

    let highest = 0;

    for (const rule of EXPERIENCE_SCORES) {

        if (
            rule.keywords.some(keyword =>
                lower.includes(keyword),
            )
        ) {

            highest = Math.max(highest, rule.score);

        }

    }

    return highest;
}