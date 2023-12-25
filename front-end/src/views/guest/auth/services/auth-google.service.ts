import { useAuthStore } from "@/stores/auth";
import { addUser } from "@/views/user/services/user.service";

export async function authGoogle() {
  const authStore = useAuthStore();
  const user = await authStore.signIn();
  await addUser({ user, role: "user" });
  location.href = "/user/chat";
}
