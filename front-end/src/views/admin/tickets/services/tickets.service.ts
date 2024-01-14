import axios from "@/libraries/axios";
import type {
  CreateTicketDto,
  GetTicketsDto,
  Ticket,
  TicketsResult,
  UpdateTicketDto,
} from "./tickets.struct";

export async function getTickets(filter: GetTicketsDto) {
  return await axios<TicketsResult>({
    method: "GET",
    url: "/admin/ticket",
    params: filter,
  });
}

export async function getTicketDetail(id: string) {
  return await axios<Ticket>({
    method: "GET",
    url: `/admin/ticket/${id}`,
  });
}

export async function createTickets(newTickets: CreateTicketDto) {
  await axios<void>({
    method: "POST",
    url: "/admin/ticket",
    data: newTickets,
  });
}

export async function updateTickets(
  ticketId: string,
  newTickets: UpdateTicketDto
) {
  await axios<void>({
    method: "PUT",
    url: `/admin/ticket/${ticketId}`,
    data: newTickets,
  });
}
