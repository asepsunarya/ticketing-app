import axios from "@/libraries/axios";
import type { CreateTeamDto, GetTeamsDto, TeamsResult } from "./teams.struct";

export async function getTeams(filter: GetTeamsDto) {
  return await axios<TeamsResult>({
    method: "POST",
    url: "/admin/team",
    params: filter,
  });
}

export async function createTeam(newTeam: CreateTeamDto) {
  return await axios<void>({
    method: "POST",
    url: "/admin/team",
    data: newTeam,
  });
}
