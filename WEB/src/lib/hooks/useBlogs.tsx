import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddBlogDto } from "../types/blog";

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