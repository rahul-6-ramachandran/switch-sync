import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  Crown,
} from "lucide-react";

interface Props {
  level?: string | null;
}

export function ExperienceBadge({ level }: Props) {
  switch (level) {
    case "junior":
      return (
        <Badge
          className="
          border-emerald-500/30
          bg-emerald-500/10
          text-emerald-400
          px-3
          py-1
          rounded-full
          font-medium
          gap-1
          shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Junior
        </Badge>
      );

    case "mid":
      return (
        <Badge
          className="
          border-sky-500/30
          bg-sky-500/10
          text-sky-400
          px-3
          py-1
          rounded-full
          font-medium
          gap-1
          shadow-sm"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Mid
        </Badge>
      );

    case "senior":
      return (
        <Badge
          className="
          border-orange-500/30
          bg-orange-500/10
          text-orange-400
          px-3
          py-1
          rounded-full
          font-medium
          gap-1
          shadow-sm"
        >
          <Crown className="h-3.5 w-3.5" />
          Senior
        </Badge>
      );

    default:
      return null;
  }
}