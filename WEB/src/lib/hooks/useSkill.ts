import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { SkillDto } from "../types/skill";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => agent.get<SkillDto[]>("/skills/all").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};


export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: SkillDto) => {
      const response = await agent.delete("/skills/delete", { data: creds });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: SkillDto) => {
      const response = await agent.post("/Skills/add", creds);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};