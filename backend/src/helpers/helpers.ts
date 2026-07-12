import { engineeringKeywords, excludedKeywords, RemoteType } from "../../constants";

export const isRelevantJob = (title: string): boolean => {
  const t = title.toLowerCase();

  const included = engineeringKeywords.some(k =>
    t.includes(k),
  );

  const excluded = excludedKeywords.some(k =>
    t.includes(k),
  );

  return included && !excluded;
};

export const isRemoteJob = (
  location?: string | null,
): boolean => {

  return (
    getRemoteType(location ?? undefined) !==
    RemoteType.NONE
  );

};

export function getRemoteType(
    location?: string,
): RemoteType {

    if (!location)
        return RemoteType.NONE;

    const l =
        location.toLowerCase();

    if (
        l.includes("anywhere") ||
        l.includes("worldwide") ||
        l.includes("global")
    ) {
        return RemoteType.GLOBAL;
    }

   if (
    l.includes("remote") &&
    (
        l.includes("india") ||
        l.includes("bangalore") ||
        l.includes("bengaluru") ||
        l.includes("hyderabad") ||
        l.includes("pune") ||
        l.includes("chennai") ||
        l.includes("gurgaon") ||
        l.includes("noida") ||
        l.includes("kochi") ||
        l.includes("mumbai")
    )
) {
    return RemoteType.INDIA;
}

    return RemoteType.NONE;
}

export function isTargetLocation(
  location?: string | null,
): boolean {

  if (!location) {
    return true;
  }

  const l = location.toLowerCase();

  // India onsite / hybrid
  const india =
    l.includes("india") ||
    l.includes("bangalore") ||
    l.includes("bengaluru") ||
    l.includes("hyderabad") ||
    l.includes("pune") ||
    l.includes("chennai") ||
    l.includes("gurgaon") ||
    l.includes("noida") ||
    l.includes("kochi") ||
    l.includes("mumbai");

  if (india) {
    return true;
  }

  switch (getRemoteType(location)) {

    case RemoteType.INDIA:
      return true;

    case RemoteType.GLOBAL:
      return true;

    default:
      return false;
  }
}