import { useAuthStore } from "@/stores/auth";

async function middleware(to: any, from: any, next: any) {
  const auth = useAuthStore();
  const requireAuth = to.meta.requireAuth;
  const isAdmin = auth?.user?.role === "admin";
  if (requireAuth && !auth.isLogin) {
    next("/login");
  } else if (!requireAuth && auth.isLogin) {
    if (isAdmin) next("/admin");
    next("/user/chat");
  }

  next();
}

export default middleware;
