import { User } from '@/global/entity/user.entity';

export class PaginateTicket {
  page: number;
  limit: number;
  projectId: string;
  year: string;
  status?: string;
  search?: string;
  isAssigned?: boolean;
}

export class Ticket {
  projectId: string;
  feature: string;
  description: string;
  email: string;
  urgencyLevel: string;
  reportBy: User;
  releaseStatus: string;
  status: string;
  files?: string[];
  assignedBy?: User;
  solution?: string;
  note?: string;
}
