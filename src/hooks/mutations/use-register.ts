import api from "@/lib/api";
import { User } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type RegisterResponseType = { user: User };

type RegisterInputType = {
  email: string;
  password: string;
};

const register = async (
  input: RegisterInputType,
): Promise<AxiosResponse<RegisterResponseType>> => {
  return api.post(`/auth/register`, input, {
    withCredentials: true,
  });
};

const useRegister = () => {
  return useMutation<
    AxiosResponse<RegisterResponseType>,
    AxiosError,
    RegisterInputType
  >({
    mutationFn: register,
  });
};

export default useRegister;
