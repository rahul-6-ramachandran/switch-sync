export function calculateJobScore(job: {
  title: string;
  location?: string | null;
  source: string;
  postedAt?: Date | null;
}) {
  let score = 0;

  const title = job.title.toLowerCase();
  const location = job.location?.toLowerCase() ?? "";

  // Backend
  if (title.includes("backend"))
    score += 30;

  // Software Engineer
  if (title.includes("software engineer"))
    score += 25;

  // Full Stack
  if (
    title.includes("full stack") ||
    title.includes("fullstack")
  )
    score += 20;

  // Platform
  if (title.includes("platform"))
    score += 20;

  // Node
  if (
    title.includes("node") ||
    title.includes("node.js") ||
    title.includes("nodejs")
  )
    score += 15;

  // TypeScript
  if (title.includes("typescript"))
    score += 10;

  // Remote
  if (location.includes("remote"))
    score += 10;

  // India
  if (
    location.includes("india") ||
    location.includes("bangalore") ||
    location.includes("hyderabad") ||
    location.includes("pune") ||
    location.includes("chennai") ||
    location.includes("kochi")
  ) {
    score += 10;
  }

  // Freshness
  if (job.postedAt) {
    const days =
      (Date.now() - job.postedAt.getTime()) /
      (1000 * 60 * 60 * 24);

    if (days <= 1)
      score += 15;
    else if (days <= 3)
      score += 10;
    else if (days <= 7)
      score += 5;
  }

  return score;
}