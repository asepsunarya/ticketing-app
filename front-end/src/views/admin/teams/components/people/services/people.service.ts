import axios from "@/libraries/axios";
import type { CreatePeopleDto } from "./people.struct";

export async function createPeople(newPeople: CreatePeopleDto) {
  await axios<void>({
    method: "POST",
    url: "/auth/signup",
    data: newPeople,
  });
}
