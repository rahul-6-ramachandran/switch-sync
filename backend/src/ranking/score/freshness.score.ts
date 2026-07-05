export function freshnessScore(
  postedAt?: Date | null,
): number {

  if (!postedAt) {
    return 0;
  }

  const days =
    (Date.now() - postedAt.getTime()) /
    (1000 * 60 * 60 * 24);

  if (days <= 1) return 20;

  if (days <= 3) return 15;

  if (days <= 7) return 10;

  if (days <= 14) return 5;

  return 0;
}