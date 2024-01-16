import axios from "@/libraries/axios";
import type { GetTeamsDto, TeamsResult } from "./teams.struct";

export async function getTeams(filter: GetTeamsDto) {
  return await axios<TeamsResult>({
    method: "POST",
    url: "/admin/team",
    params: filter,
  });
}
