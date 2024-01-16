import { Types } from 'mongoose';

export class PaginatePeople {
  page: number;
  limit: number;
  projectId: string;
  search?: string;
}

export class People {
  projectId: string;
  userId: string | Types.ObjectId;
  role: string;
}
