import type { PaginationResult } from '@/structs/pagination.struct';
import type { Project } from '@/views/admin/projects/services/projects.struct';
import type { Ticket } from '@/views/admin/tickets/services/tickets.struct';

export type CustomerTicketForm = {
  projectId: string;
  feature: string;
  description: string;
  urgencyLevel: string;
  releaseStatus?: string;
  files: string[];
};

export type CustomerTicketsResult = {
  docs: Ticket[];
} & PaginationResult;

export type CustomerProjectsResult = {
  docs: Project[];
} & PaginationResult;
