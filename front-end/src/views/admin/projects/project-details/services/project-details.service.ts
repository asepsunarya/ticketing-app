import axios from "@/libraries/axios";
import type { ProjectResult } from "./project-details.struct";
import type { CreateProjectDto } from "../../services/projects.struct";

export async function getProject(code: string | string[]) {
  return await axios<ProjectResult>({
    method: "GET",
    url: `/admin/project/${code}`,
  });
}

export async function updateProject(id: string, newProject: CreateProjectDto) {
  await axios<void>({
    method: "PUT",
    url: `/admin/project/${id}`,
    data: newProject,
  });
}
