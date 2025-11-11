import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "@/lib/api";
import { User } from "@/lib/types";

type GetDetailsResponseType = Omit<User, "address"> & {
  is_verified: boolean;
};

const getDetails = async (): Promise<AxiosResponse<GetDetailsResponseType>> => {
  return await api.get(`/me`);
};

const useGetDetails = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["get my details"],
    queryFn: getDetails,
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
};

export default useGetDetails;
