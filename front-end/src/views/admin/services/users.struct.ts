import type {
  PaginationDto,
  PaginationResult,
} from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";

export type GetUsersResult = {
  docs: User[];
} & PaginationResult;

export type GetUsersDto = {
  search?: string;
  includeSelf?: boolean;
} & PaginationDto;
