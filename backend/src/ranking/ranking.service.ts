import { Injectable } from "@nestjs/common";
import { roleScore } from "./score/role.score";
import { experienceScore } from "./score/experience.score";
import { skillsScore } from "./score/skills.score";
import { locationScore } from "./score/location.score";
import { freshnessScore } from "./score/freshness.score";
import { atsScore } from "./score/ats.score";


@Injectable()
export class RankingService {

  calculate(job: {
    title: string;
    location?: string | null;
    source: string;
    postedAt?: Date | null;
  }) {

    return (

      roleScore(job.title)

      +

      experienceScore(job.title)

      +

      skillsScore(job.title)

      +

      locationScore(job.location)

      +

      freshnessScore(job.postedAt)

      +

      atsScore(job.source)

    );

  }

}