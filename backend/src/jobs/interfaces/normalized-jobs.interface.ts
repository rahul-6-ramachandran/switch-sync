export interface NormalizedJob {
  source: string;

  externalJobId: string;

  companyName: string;

  title: string;

  applicationUrl: string;

  location?: string;

  remoteStatus: boolean;

  postedAt?: Date;

  description?: string;
    score?: number;
}