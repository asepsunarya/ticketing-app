import axios from "@/libraries/axios";
import type {
  CreateProjectDto,
  GetProjectsDto,
  ProjectsResult,
} from "./projects.struct";

export async function getProjects(filter: GetProjectsDto) {
  return await axios<ProjectsResult>({
    method: "GET",
    url: "/admin/project",
    params: filter,
  });
}

export async function createProjects(newProject: CreateProjectDto) {
  await axios<void>({
    method: "POST",
    url: "/admin/project",
    data: newProject,
  });
}

export async function removeProjects(id: string) {
  return await axios<void>({
    method: "DELETE",
    url: `/admin/project/${id}`,
  });
}
