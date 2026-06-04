export default [
  {
    path: "/customer/tickets",
    name: "customer-tickets",
    meta: {
      requireAuth: true,
      role: "customer",
    },
    component: () => import("@/views/customer/tickets/customer-tickets-main.vue"),
  },
  {
    path: "/customer/tickets/:ticketId",
    name: "customer-ticket-detail",
    meta: {
      requireAuth: true,
      role: "customer",
    },
    component: () => import("@/views/customer/tickets/customer-ticket-detail.vue"),
  },
];
