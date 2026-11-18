import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { CreateContactDTO } from "../../lib/types/contact";
import { useCreateContact } from "../../lib/hooks/useContact";

export default function CreateContact() {
  const contact = useCreateContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<CreateContactDTO>({
    defaultValues: { fullName: "", email: "", message: "" },
    });

    const onSubmit = (values: CreateContactDTO) => {
    contact.mutate(values);
    };
    
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Get in touch
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Send me a message and I'll get back to you soon.
          </Typography>
        </Box>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextField
              label="Full name"
              autoComplete="name"
              {...register("fullName", { required: "Full name is required" })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Message"
              multiline
              minRows={5}
              {...register("message", {
                required: "Message is required",
                maxLength: { value: 2000, message: "Max 2000 characters" },
              })}
              error={!!errors.message}
              helperText={errors.message?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={contact.isPending}
              sx={{ py: 1.4 }}
            >
              Send message
            </Button>

            {contact.isError && (
              <Alert severity="error" variant="outlined">
                {contact.error.message}
              </Alert>
            )}
            {contact.isSuccess && (
              <Alert severity="success" variant="outlined">
                {contact.data}
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
