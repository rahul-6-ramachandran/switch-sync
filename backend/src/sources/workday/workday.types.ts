export interface WorkdayResponse {
  total: number;
  jobPostings: WorkdayJob[];
}

export interface WorkdayJob {
  title: string;

  externalPath: string;

  locationsText: string;

  postedOn: string;

  remoteType?: string;

  bulletFields?: string[];
}


export interface WorkdayDetailResponse {
  jobPostingInfo: {
    jobDescription: string;

    externalUrl: string;

    postedOn: string;

    location: string;

    title: string;
  };
}