import type { PaginationResult } from "@/structs/pagination.struct";

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
