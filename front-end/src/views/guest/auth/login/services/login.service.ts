import authService from "@/services/auth.service";
import axios from "@/libraries/axios";
import type { User } from "@/views/user/services/user.struct";

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export async function loginService({ email, password }: LoginDto) {
  const { user, accessToken } = await axios<LoginResponse>({
    method: "POST",
    url: "/auth/login",
    data: { email, password },
  });
  authService.setAuth(user, accessToken);
}
