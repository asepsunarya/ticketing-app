export class PaginateActivity {
  page: number;
  limit: number;
  search?: string;
}

export class Activity {
  ticketId: string;
  description: string;
  teamId?: string;
}
