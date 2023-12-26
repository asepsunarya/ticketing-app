export default [
  {
    path: "/admin",
    name: "admin-home",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/views/admin/dashboard/dashboard-main.vue"),
  },
  {
    path: "/admin/projects",
    name: "admin-projects",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/views/admin/projects/projects-main.vue"),
  },
  {
    path: "/admin/projects/:id/members",
    name: "admin-project-members",
    meta: {
      requireAuth: true,
      withSidebar: true,
    },
    component: () =>
      import("@/views/admin/project-members/project-members-main.vue"),
  },
  {
    path: "/admin/projects/:id/tickets",
    name: "admin-projects-queue",
    meta: {
      requireAuth: true,
      withSidebar: true,
    },
    component: () => import("@/views/admin/tickets/tickets-main.vue"),
  },
];
