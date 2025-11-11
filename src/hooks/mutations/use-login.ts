import api from "@/lib/api";
import { User } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type LoginResponseType = {
  user: User;
};

type LoginInputType = {
  email: string;
  password: string;
};

const mutationFn = async (
  input: LoginInputType,
): Promise<AxiosResponse<LoginResponseType>> => {
  return await api.post(`/auth/login`, input, {
    withCredentials: true,
  });
};

const useLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponseType>,
    AxiosError,
    LoginInputType
  >({
    mutationFn,
  });
};

export default useLogin;
