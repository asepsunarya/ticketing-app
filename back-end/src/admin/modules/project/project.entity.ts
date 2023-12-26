import { User } from '@/global/entity/user.entity';

export class PaginateProject {
  page: number;
  limit: number;
  search?: string;
}

export class Project {
  name: string;
  code: string;
  description: string;
  leader: User;
  picture?: string;
}
