import type { PaginationResult } from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";

export type Ticket = {
  _id: string;
  projectId: string;
  feature: string;
  description: string;
  email: string;
  screenshot: string[];
  urgencyLevel: string;
  reportBy: User;
  releaseStatus: string;
  status: string;
  createdAt: Date | string;
  assignedBy?: User;
  solution?: string;
  files: string[];
  reason?: string;
  note?: string;
};

export type GetTicketsDto = {
  projectId: string;
  status?: string | string[];
  page: number;
  limit: number;
  search?: string;
};

export type TicketsResult = {
  docs: Ticket[];
} & PaginationResult;

export type TicketCountResult = {
  all: number;
  me: number;
  open: number;
  inprogress: number;
  pending: number;
  closed: number;
};

export type CreateTicketDto = {
  projectId: string;
  feature: string;
  description: string;
  email: string;
  urgencyLevel: string;
  reportBy: User;
  releaseStatus: string;
  status: string;
  assignedBy: User;
  files: string[];
};

export type UpdateTicketDto = {
  projectId?: string;
  feature?: string;
  description?: string;
  email?: string;
  urgencyLevel?: string;
  reportBy?: User;
  releaseStatus?: string;
  status?: string;
  assignedBy?: User | object;
  files?: string[];
  reason?: string;
  note?: string;
};
