import { ROLE_SCORES } from "../constants/role.constants";

export function roleScore(title: string): number {

    const lower = title.toLowerCase();

    let highest = 0;

    for (const rule of ROLE_SCORES) {

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