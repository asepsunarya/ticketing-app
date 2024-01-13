import type { PaginationResult } from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";

export type Ticket = {
  _id: string;
  product: string;
  description: string;
  email: string;
  screenshot: string[];
  urgencyLevel: string;
  reportBy: string;
  releaseStatus: string;
  status: string;
  solution?: string;
  files: string[];
  note?: string;
};

export type GetTicketsDto = {
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
