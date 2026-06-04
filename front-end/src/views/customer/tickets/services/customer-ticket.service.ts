import axios from '@/libraries/axios';
import type { GetTicketsDto, Ticket } from '@/views/admin/tickets/services/tickets.struct';
import type { CustomerProjectsResult, CustomerTicketForm, CustomerTicketsResult } from './customer-ticket.struct';

export async function getCustomerTickets(filter: GetTicketsDto) {
  return await axios<CustomerTicketsResult>({
    method: 'GET',
    url: '/admin/ticket/customer/list',
    params: filter,
  });
}

export async function getCustomerTicketDetail(id: string) {
  return await axios<Ticket>({
    method: 'GET',
    url: `/admin/ticket/customer/${id}`,
  });
}

export async function createCustomerTicket(data: CustomerTicketForm) {
  return await axios<Ticket>({
    method: 'POST',
    url: '/admin/ticket/customer',
    data,
  });
}

export async function addCustomerTicketComment(ticketId: string, description: string) {
  return await axios<void>({
    method: 'POST',
    url: `/admin/ticket/customer/${ticketId}/comment`,
    data: { description },
  });
}

export async function getCustomerProjects() {
  return await axios<CustomerProjectsResult>({
    method: 'GET',
    url: '/admin/project/customer/list',
    params: { page: 1, limit: 100 },
  });
}
