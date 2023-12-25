export class PaginatePeople {
  page: number;
  limit: number;
  search?: string;
}

export class People {
  projectId: string;
  userId: string;
  role: string;
}
