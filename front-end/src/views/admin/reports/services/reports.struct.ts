import type { User } from "@/views/user/services/user.struct";

export type TicketReportStatus = {
  all: number;
  open: number;
  inprogress: number;
  pending: number;
  closed: number;
  [key: string]: number;
};

export type TicketReportMonthly = TicketReportStatus & {
  month: number;
};

export type TicketReportLatest = {
  _id: string;
  feature: string;
  status: string;
  urgencyLevel: string;
  assignedBy?: User;
  reportBy?: User;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type TicketReportAssignee = {
  _id: string;
  name?: string;
  email?: string;
  photo?: string;
  total: number;
  open: number;
  inprogress: number;
  pending: number;
  closed: number;
};

export type TicketReportResult = {
  year: number;
  status: TicketReportStatus;
  assignment: {
    assigned: number;
    unassigned: number;
  };
  assignees: TicketReportAssignee[];
  handling: {
    handled: number;
    unhandled: number;
    completionRate: number;
    averageClosedDays: number;
  };
  urgency: Record<string, number>;
  monthly: TicketReportMonthly[];
  latestTickets: TicketReportLatest[];
};
