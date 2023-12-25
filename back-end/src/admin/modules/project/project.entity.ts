export class PaginateProject {
  page: number;
  limit: number;
  search?: string;
}

export class Project {
  name: string;
  code: string;
  description: string;
  picture: string;
  leader: string;
}
