export default [
  {
    path: "",
    name: "landing-page",
    meta: {
      requireAuth: false,
    },
    component: () => import("@/views/guest/auth-admin/login/login-main.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requireAuth: false,
    },
    component: () => import("@/views/guest/auth/login/login-main.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      requireAuth: false,
    },
    component: () => import("@/views/guest/auth/register/register-main.vue"),
  },
  {
    path: "/login/admin",
    name: "login-admin",
    meta: {
      requireAuth: false,
    },
    component: () => import("@/views/guest/auth-admin/login/login-main.vue"),
  },
];
