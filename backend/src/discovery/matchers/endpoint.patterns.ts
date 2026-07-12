export const ENDPOINT_PATTERNS: RegExp[] = [

  // Generic APIs
  /\/api\/[a-zA-Z0-9/_-]*/gi,

  // Jobs
  /\/jobs\/?[a-zA-Z0-9/_-]*/gi,

  // Careers
  /\/careers\/?[a-zA-Z0-9/_-]*/gi,

  // Search
  /\/search\/?[a-zA-Z0-9/_-]*/gi,

  // GraphQL
  /\/graphql/gi,

  // Job Search
  /\/job-search\/?[a-zA-Z0-9/_-]*/gi,

  // Posting
  /\/jobPosting\/?[a-zA-Z0-9/_-]*/gi,

];