import type { PaginationResult } from "@/structs/pagination.struct";

export type GetProjectMemberDto = {
  page: number;
  limit: number;
  projectId: string;
  search?: string;
};

export type ProjectMembersResult = {
  docs: ProjectMember[];
} & PaginationResult;

export type CreateMemberDto = {
  projectId: string;
  userId: string;
  role: string;
};

export type ProjectMember = {
  _id: string;
  role: string;
  userId: string;
  name: string;
  email: string;
  photo?: string;
};
