import type { PaginationResult } from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";

export type GetProjectMemberDto = {
  page: number;
  limit: number;
  search?: string;
};

export type ProjectMembersResult = {
  docs: User[];
} & PaginationResult;

export type CreateMemberDto = {
  projectId: string;
  userId: string;
  role: string;
};
