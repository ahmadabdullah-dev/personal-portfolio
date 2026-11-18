import { useQuery } from "@tanstack/react-query";
import type { PaginatedList, PaginationParams } from "../types/common";
import type { ContactDTO } from "../types/contact";
import agent from "../api/agent";

export const useGetAllContacts = (pagination: PaginationParams) =>
  useQuery<PaginatedList<ContactDTO>>({
    queryKey: ["contacts", pagination],
    queryFn: () =>
      agent
        .get<
          PaginatedList<ContactDTO>
        >(`/Contact/get-contacts`, { params: pagination })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
