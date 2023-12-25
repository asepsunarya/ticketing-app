import { createRouter, createWebHistory } from "vue-router";
import middleware from "./middleware";
import RouteUser from "./user";
import RouteGuest from "./guest";
import RouteAdmin from "./admin";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...RouteUser, ...RouteGuest, ...RouteAdmin],
});

router.beforeEach((to, from, next) => middleware(to, from, next));

export default router;
