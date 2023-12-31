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
    path: "/admin/projects/:code/tickets",
    name: "admin-projects-queue",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "tickets",
    },
    component: () => import("@/views/admin/tickets/tickets-main.vue"),
  },
  {
    path: "/admin/projects/:code/settings/details",
    name: "admin-projects-details",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "settings",
    },
    component: () =>
      import("@/views/admin/projects/project-details/project-details-main.vue"),
  },
  {
    path: "/admin/projects/:code/settings/members",
    name: "admin-project-members",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "settings",
    },
    component: () =>
      import("@/views/admin/projects/project-members/project-members-main.vue"),
  },
];
