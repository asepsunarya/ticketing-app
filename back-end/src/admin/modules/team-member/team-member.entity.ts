export class PaginateTeamMember {
  page: number;
  limit: number;
  search?: string;
}

export class TeamMember {
  teamId: string;
  userId: string;
}
