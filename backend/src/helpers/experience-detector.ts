export type ExperienceLevel =
  | "intern"
  | "junior"
  | "mid"
  | "senior";


  export function detectExperience(title: string): ExperienceLevel {

    const t = title.toLowerCase();

    if (
        t.includes("intern")
    ) {
        return "intern";
    }

    if (
        t.includes("senior") ||
        t.includes("sr") ||
        t.includes("iii")
    ) {
        return "senior";
    }

    if (
        t.includes("staff") ||
        t.includes("principal") ||
        t.includes("lead") ||
        t.includes("architect") ||
        t.includes("manager")
    ) {
        return "senior";
    }

    if (
        t.includes("ii") ||
        t.includes("mid")
    ) {
        return "mid";
    }

    return "junior";
}