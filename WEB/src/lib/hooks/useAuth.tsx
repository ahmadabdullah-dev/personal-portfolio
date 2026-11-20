import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { RequestLoginDTO, LoginDTO } from "../types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useRequestLogin = () => {
  return useMutation({
    mutationFn: async (creds: RequestLoginDTO) => {
      const response = await agent.post("/Auth/request-login", creds);
      return response.data;
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (creds: LoginDTO) => {
      const response = await agent.post("/Auth/login", creds);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/admin");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await agent.post("/Auth/logout");
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
  });
};