import type { User } from "@/views/user/services/user.struct";

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
