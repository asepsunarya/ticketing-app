import axios from "@/libraries/axios";
import type {
  CreateMemberDto,
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

export async function createMembers(newMember: CreateMemberDto) {
  return await axios<void>({
    method: "POST",
    url: "/admin/people",
    data: newMember,
  });
}

export async function removeMembers(id: string) {
  return await axios<void>({
    method: "DELETE",
    url: `/admin/people/${id}`,
  });
}
