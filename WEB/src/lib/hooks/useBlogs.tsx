import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddBlogDto, BlogDto } from "../types/blog";
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
