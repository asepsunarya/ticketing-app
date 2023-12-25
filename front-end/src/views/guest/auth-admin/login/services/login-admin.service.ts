import authService from "@/services/auth.service";
import type { LoginDto, LoginResponse } from "./login-admin.struct";
import axios from "@/libraries/axios";

export async function loginAdminService({ email, password }: LoginDto) {
  const { user, accessToken } = await axios<LoginResponse>({
    method: "POST",
    url: "/auth/login/admin",
    data: { email, password },
  });
  console.log(user, accessToken, "response");
  authService.setAuth(user, accessToken);
  location.href = "/admin";
}
