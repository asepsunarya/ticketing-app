import axios from "@/libraries/axios";
import type { GetUsersDto, GetUsersResult } from "./users.struct";

export async function getUsers(filter: GetUsersDto) {
  if (!filter.includeSelf) delete filter.includeSelf;
  return await axios<GetUsersResult>({
    method: "GET",
    url: "/admin/user",
    params: filter,
  });
}
