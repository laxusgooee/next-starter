import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

type LoginResponseType = {
  token: string;
};

type LoginInputType = {
  provider: "email";
  email: string;
  password: string;
};

const mutationFn = async (
  input: LoginInputType,
): Promise<AxiosResponse<LoginResponseType>> => {
  return await axios.post(`/api/auth/login`, input, {
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
