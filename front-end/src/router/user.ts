export default [
  {
    path: "/user/chat",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/views/user/chat/chat-main.vue"),
  },
];
