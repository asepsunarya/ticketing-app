import axios from "@/libraries/axios";
import type { GetTicketsDto, TicketsResult } from "./tickets.struct";

export async function getTickets(filter: GetTicketsDto) {
  return await axios<TicketsResult>({
    method: "GET",
    url: "/admin/ticket",
    params: filter,
  });
}
