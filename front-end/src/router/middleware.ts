import { useAuthStore } from "@/stores/auth";

async function middleware(to: any, from: any, next: any) {
  const auth = useAuthStore();
  const requireAuth = to.meta.requireAuth;
  const role = auth?.user?.role;
  const adminRoles = ["admin", "programmer", "customer-service", "product-owner"];

  if (requireAuth && !auth.isLogin) {
    next("/login");
    return;
  }

  if (requireAuth && to.meta.role && role !== to.meta.role) {
    next(adminRoles.includes(role) ? "/admin" : "/customer/tickets");
    return;
  }

  if (requireAuth && to.path.startsWith("/admin") && !adminRoles.includes(role)) {
    next("/customer/tickets");
    return;
  }

  if (!requireAuth && auth.isLogin) {
    next(adminRoles.includes(role) ? "/admin" : "/customer/tickets");
    return;
  }

  next();
}

export default middleware;
