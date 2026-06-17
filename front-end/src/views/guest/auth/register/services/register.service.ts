import axios from "@/libraries/axios";

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  role: "customer";
};

export async function registerService(data: RegisterDto) {
  return await axios<void>({
    method: "POST",
    url: "/auth/signup",
    data,
  });
}
