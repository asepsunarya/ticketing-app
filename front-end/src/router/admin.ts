export default [
  {
    path: "/admin",
    name: "admin-home",
    meta: {
      requireAuth: true,
      menu: "home",
    },
    component: () => import("@/views/admin/dashboard/dashboard-main.vue"),
  },
  {
    path: "/admin/projects",
    name: "admin-projects",
    meta: {
      requireAuth: true,
      menu: "projects",
    },
    component: () => import("@/views/admin/projects/projects-main.vue"),
  },
  {
    path: "/admin/projects/:code/tickets",
    name: "all-tickets",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "projects",
      submenu: "tickets",
    },
    component: () => import("@/views/admin/tickets/tickets-main.vue"),
  },
  {
    path: "/admin/projects/:code/tickets/:status",
    name: "admin-projects-queue",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "projects",
      submenu: "tickets",
    },
    component: () => import("@/views/admin/tickets/tickets-main.vue"),
  },
  {
    path: "/admin/projects/:code/settings/details",
    name: "admin-projects-details",
    meta: {
      requireAuth: true,
      withSidebar: true,
      menu: "projects",
      submenu: "settings",
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
      menu: "projects",
      submenu: "settings",
    },
    component: () =>
      import("@/views/admin/projects/project-members/project-members-main.vue"),
  },
  {
    path: "/admin/teams",
    name: "admin-teams",
    meta: {
      requireAuth: true,
      menu: "teams",
    },
    component: () => import("@/views/admin/teams/teams-main.vue"),
  },
];
