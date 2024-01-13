import axios from "@/libraries/axios";
import type {
  CreateTicketDto,
  GetTicketsDto,
  TicketsResult,
} from "./tickets.struct";

export async function getTickets(filter: GetTicketsDto) {
  return await axios<TicketsResult>({
    method: "GET",
    url: "/admin/ticket",
    params: filter,
  });
}

export async function createTickets(newTickets: CreateTicketDto) {
  await axios<void>({
    method: "POST",
    url: "/admin/ticket",
    data: newTickets,
  });
}
