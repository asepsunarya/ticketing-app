import type {
  PaginationDto,
  PaginationResult,
} from "@/structs/pagination.struct";

export type CreateTeamDto = {
  name: string;
  description: string;
};

export type GetTeamsDto = {
  search?: string;
} & PaginationDto;

export type TeamsResult = {
  docs: Team[];
} & PaginationResult;

export type Team = {
  _id: string;
  name: string;
  description: string;
};
