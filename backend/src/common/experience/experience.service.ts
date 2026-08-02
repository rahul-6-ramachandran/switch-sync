import { Injectable } from '@nestjs/common';
import { ExperienceRange } from './experience.types';

@Injectable()
export class ExperienceService {
  extract(text: string): ExperienceRange {
    const patterns = [
      /(\d+)\s*[-–]\s*(\d+)\s+years?/i,

      /(\d+)\s+to\s+(\d+)\s+years?/i,

      /typically\s+has\s+(\d+)\s*[-–]\s*(\d+)\s+years?/i,

      /minimum\s+(\d+)\s+years?/i,

      /at least\s+(\d+)\s+years?/i,

      /(\d+)\+\s+years?/i,

      /(\d+)\s+years?\s+of\s+work\s+experience/i,

      /(\d+)\s+years?\s+of\s+experience/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);

      if (!match) continue;

      if (match.length >= 3) {
        return {
          min: Number(match[1]),

          max: Number(match[2]),
        };
      }

      return {
        min: Number(match[1]),
      };
    }

    return {};
  }
}
