import axios from "@/libraries/axios";

export async function removeTickets(id: string) {
  return await axios<void>({
    method: "DELETE",
    url: `/admin/ticket/${id}`,
  });
}
