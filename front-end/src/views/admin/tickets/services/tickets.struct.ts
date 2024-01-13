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
  createdAt: Date;
  assignedBy?: User;
  solution?: string;
  files: string[];
  note?: string;
};

export type GetTicketsDto = {
  projectId: string;
  page: number;
  limit: number;
  search?: string;
};

export type TicketsResult = {
  docs: Ticket[];
} & PaginationResult;

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
