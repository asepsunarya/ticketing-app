import axios from "@/libraries/axios";
import type { GetProjectsDto, ProjectsResult } from "./projects.struct";

export async function getProjects(filter: GetProjectsDto) {
  return await axios<ProjectsResult>({
    method: "GET",
    url: "/admin/project",
    params: filter,
  });
}
