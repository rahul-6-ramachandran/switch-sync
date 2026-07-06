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

// @Injectable()
// export class RankingService {

//   calculate(job: {
//     title: string;
//     location?: string | null;
//     source: string;
//     postedAt?: Date | null;
//   }) {

//     const role = roleScore(job.title);
//     const experience = experienceScore(job.title);
//     const skills = skillsScore(job.title);
//     const location = locationScore(job.location);
//     const freshness = freshnessScore(job.postedAt);
//     const ats = atsScore(job.source);

//     console.log({
//       role,
//       experience,
//       skills,
//       location,
//       freshness,
//       ats,
//     });

//     return (
//       role +
//       experience +
//       skills +
//       location +
//       freshness +
//       ats
//     );
//   }
// }