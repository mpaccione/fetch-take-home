import { post } from "../../api";

interface LoginParams {
  email: string;
  name: string;
}

const postLogin = async ({ email, name }: LoginParams) => {
  try {
   const res = await post("/auth/login", { email, name });
   return res
  } catch (err) {
    return false
  }
};

export { postLogin };
