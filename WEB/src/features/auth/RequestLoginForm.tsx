import { useForm } from "react-hook-form";
import { useState } from "react";
import LoginForm from "./LoginForm";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { RequestLoginDTO } from "../../lib/types/auth";
import { useRequestLogin } from "../../lib/hooks/useAuth";

export default function RequestLoginForm() {
  const requestLogin = useRequestLogin();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<RequestLoginDTO>({
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPersistence, setIsPersistence] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const onSubmit = (creds: RequestLoginDTO) => {
    requestLogin.mutate(creds, {
      onSuccess: () => setVerifyEmail(creds.email),
      onError: () => resetField("password"),
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%" }}>
          <Typography variant="h3" sx={{ m: 2, textAlign: "center" }}>
            Login
          </Typography>

          {verifyEmail ? (
            <LoginForm email={verifyEmail} isPersistence={isPersistence} />
          ) : (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((v) => !v)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPersistence}
                      onChange={(e) => setIsPersistence(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={requestLogin.isPending}
                >
                  {requestLogin.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send login code"
                  )}
                </Button>

                {requestLogin.error && (
                  <Alert severity="error">{requestLogin.error.message}</Alert>
                )}
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
