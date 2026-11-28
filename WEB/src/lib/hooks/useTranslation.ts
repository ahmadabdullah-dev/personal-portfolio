import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type {
  AddTranslationDto,
  TranslationDto,
  UpdateTranslationDto,
} from "../types/translation";
import type { PaginatedList, PaginationParams } from "../types/common";

export const useAddTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: AddTranslationDto) => {
      const response = await agent.post("/Translation/add-translation", creds, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
    },
  });
};

export function useGetTranslations(pagination: PaginationParams) {
  return useQuery({
    queryKey: ["translations", pagination],
    queryFn: async () => {
      const response = await agent.get<PaginatedList<TranslationDto>>(
        "/Translation/get-translations",
        { params: pagination },
      );
      return response.data;
    },
    retry: false,
  });
}

export function useGetTranslationById(id: string) {
  return useQuery({
    queryKey: ["translation", id],
    queryFn: async () =>
      agent
        .get<TranslationDto>(
          `/Translation/get-translation/${encodeURIComponent(id)}`,
        )
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    retry: false,
  });
}
export function useGetTranslationBySlug(slug: string) {
  return useQuery({
    queryKey: ["translation", slug],
    queryFn: async () =>
      agent
        .get<TranslationDto>(
          `/Translation/get-translation-by-slug/${encodeURIComponent(slug)}`,
        )
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    retry: false,
  });
}
export const useUpdateTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: UpdateTranslationDto) => {
      const response = await agent.put<string>(
        `/Translation/update-translation/${encodeURIComponent(dto.id)}`,
        dto,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
    onSuccess: (_data, dto) => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
      queryClient.invalidateQueries({ queryKey: ["translation", dto.id] });
    },
  });
};

export const useDeleteTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.delete<string>(
        `/Translation/delete-translation/${encodeURIComponent(id)}`,
      );
      return response.data;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
      queryClient.removeQueries({ queryKey: ["translation", id] });
    },
  });
};
