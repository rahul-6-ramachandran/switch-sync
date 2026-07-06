import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ScoreBadge({
  score,
}: {
  score: number;
}) {
  const color =
    score >= 90
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : score >= 75
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-slate-500/10 text-slate-300 border-slate-500/20";

  return (
    <Badge
      className={`gap-1 rounded-full px-3 py-1 ${color}`}
    >
      <Star className="h-3.5 w-3.5 fill-current" />
      {score}
    </Badge>
  );
}