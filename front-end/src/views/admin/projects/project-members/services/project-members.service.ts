import axios from "@/libraries/axios";
import type {
  GetProjectMemberDto,
  ProjectMembersResult,
} from "./project-members.struct";

export async function getMembers(filter: GetProjectMemberDto) {
  return await axios<ProjectMembersResult>({
    method: "GET",
    url: "/admin/people",
    params: filter,
  });
}
