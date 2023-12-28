import type { PaginationResult } from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";

export type GetProjectsDto = {
  page: number;
  limit: number;
  search?: string;
};

export type ProjectsResult = {
  docs: Project[];
} & PaginationResult;

export type Project = {
  _id: string;
  name: string;
  code: string;
  description: string;
  leader: User;
  picture?: string;
};

export type CreateProjectDto = {
  name: string;
  code: string;
  description: string;
  leader: User;
  picture?: string;
};
