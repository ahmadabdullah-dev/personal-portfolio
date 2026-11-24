import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddBlogDto, BlogDto, UpdateBlogDto } from "../types/blog";
import type { PaginatedList, PaginationParams } from "../types/common";

export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: AddBlogDto) => {
      const response = await agent.post("/Blogs/add", creds, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
export function useGetAllBlogs(pagination: PaginationParams) {
  return useQuery({
    queryKey: ["blogs", pagination],
    queryFn: async () => {
      const response = await agent.get<PaginatedList<BlogDto>>(
        "Blogs/get-all",
        { params: pagination },
      );
      return response.data;
    },
    retry: false,
  });
}
export function useGetBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () =>
      agent
        .get<BlogDto>(`/Blogs/get-by-slug/${encodeURIComponent(slug)}`)
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    retry: false,
  });
}
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: UpdateBlogDto) => {
      const response = await agent.put<string>("/Blogs/update", dto, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (_data, dto) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", dto.slug] });
    },
  });
};
