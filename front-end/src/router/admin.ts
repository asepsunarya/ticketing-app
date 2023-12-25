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
    path: "/admin/bugs",
    name: "admin-bugs",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/views/admin/bugs/bugs-main.vue"),
  },
  {
    path: "/admin/bugs/create",
    name: "admin-bugs-create",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/views/admin/bugs/bugs-form/bugs-form.vue"),
  },
];
