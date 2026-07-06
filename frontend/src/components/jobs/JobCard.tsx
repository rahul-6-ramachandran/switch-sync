import {
  ArrowUpRight,
  Building2,
  Clock3,
  Globe2,
  MapPin,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ScoreBadge } from "./ScoreBadge";
import { formatRelativeDate, formatSource } from "@/utils/format";

import type { Job } from "@/types/job";
import { ExperienceBadge } from "./ExperienceBadge";

interface JobCardProps {
  job: Job;
}

function getExperience(score: number) {
  if (score >= 90)
    return {
      label: "Junior",
      color:
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };

  if (score >= 75)
    return {
      label: "Mid",
      color:
        "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

  return {
    label: "Senior",
    color:
      "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
}

export function JobCard({ job }: JobCardProps) {

  return (
   <Card className="group h-full rounded-xl border transition-all duration-200 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex h-full flex-col p-5">

        {/* Top */}

        <div className="flex items-start justify-between gap-3">

          <div className="space-y-1 flex flex-col">

           <h2 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7">
              {job.title}

            </h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">

              <Building2 className="h-4 w-4" />

              {job.companyName}

            </div>

          </div>

          <ScoreBadge score={job.score} />

        </div>

        {/* Metadata */}
        <div className="flex-1" />
        <div className="mt-5 flex flex-wrap gap-2">

          <TooltipProvider>

            <Tooltip>

              <TooltipTrigger asChild>

                <Badge
                  variant="default"
                  className="max-w-full truncate cursor-default"
                >
                  <MapPin className="mr-1 h-3 w-3 shrink-0" />

                  <span className="truncate">
                    {job.location ?? "Location not specified"}
                  </span>

                </Badge>

              </TooltipTrigger>

              <TooltipContent className="max-w-xs break-words">
                {job.location}
              </TooltipContent>

            </Tooltip>

          </TooltipProvider>

          {job.remoteStatus && (
            <Badge
              className="bg-green-500/10 text-green-600 border-green-500/20"
              variant="default"
            >
              <Globe2 className="mr-1 h-3 w-3" />

              Remote
            </Badge>
          )}

         <ExperienceBadge level={job.experienceLevel} />

          <Badge variant="mid">

            {formatSource(job.source as any)}

          </Badge>

        </div>

        {/* Footer */}

        <div className="mt-auto flex items-center justify-between pt-6">

          <div className="flex items-center gap-2 text-sm text-muted-foreground">

            <Clock3 className="h-4 w-4" />

            {job.postedAt ? formatRelativeDate(job.postedAt) : "Unknown"}

          </div>

          <Button asChild className="bg-blue-500/40">

            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Job

              <ArrowUpRight className="ml-2 h-4 w-4" />

            </a>

          </Button>

        </div>

      </div>

    </Card>
  );
}