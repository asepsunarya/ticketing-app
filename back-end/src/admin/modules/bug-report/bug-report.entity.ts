export class PaginateBugReport {
  page: number;
  limit: number;
  search?: string;
  isAssigned?: boolean;
}

export class BugReport {
  product: string;
  description: string;
  email: string;
  screenshot: string[];
  urgencyLevel: string;
  reportBy: string;
  releaseStatus: string;
}
