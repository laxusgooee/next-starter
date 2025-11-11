import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import api from "@/lib/api";

type LogoutResponseType = null;

const mutationFn = async (): Promise<AxiosResponse<LogoutResponseType>> => {
  return await api.post(`/auth/logout`, null, {
    withCredentials: true,
  });
};

const useLogout = () => {
  return useMutation<AxiosResponse<LogoutResponseType>, AxiosError>({
    mutationFn,
  });
};

export default useLogout;
