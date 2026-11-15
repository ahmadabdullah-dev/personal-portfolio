import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useGetIsDbConnected = () =>
  useQuery<boolean>({
    queryKey: ["IsDbConnected"],
    queryFn: () =>
      agent.get<boolean>(`/System/is-db-connected`).then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    retry: false,
  });
