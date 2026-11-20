import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useLogin } from "../../lib/hooks/useAuth";
import type { LoginDTO } from "../../lib/types/auth";

type LoginFormProps = {
  email: string;
  isPersistence: boolean;
};

export default function LoginForm({ email, isPersistence }: LoginFormProps) {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    defaultValues: { email, code: "", isPersistence },
  });

  const onSubmit = (creds: LoginDTO) => {
    login.mutate(creds);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Enter the verification code sent to {email}
        </Typography>

        <TextField
          label="Verification code"
          fullWidth
          {...register("code", {
            required: "Verification code is required",
          })}
          error={!!errors.code}
          helperText={errors.code?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={login.isPending}
        >
          {login.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Verify"
          )}
        </Button>

        {login.error && <Alert severity="error">{login.error.message}</Alert>}
      </Stack>
    </Box>
  );
}
