import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

type LogoutResponseType = null;

const mutationFn = async (): Promise<AxiosResponse<LogoutResponseType>> => {
  return await axios.post(`/api/auth/logout`, null, {
    withCredentials: true,
  });
};

const useLogout = () => {
  return useMutation<AxiosResponse<LogoutResponseType>, AxiosError>({
    mutationFn,
  });
};

export default useLogout;
