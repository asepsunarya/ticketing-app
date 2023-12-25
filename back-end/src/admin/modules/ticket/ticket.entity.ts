export class PaginateTicket {
  page: number;
  limit: number;
  search?: string;
  isAssigned?: boolean;
}

export class Ticket {
  product: string;
  description: string;
  email: string;
  screenshot: string[];
  urgencyLevel: string;
  reportBy: string;
  releaseStatus: string;
}
