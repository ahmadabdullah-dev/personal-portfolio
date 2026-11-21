import { useForm } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDeleteSkill } from "../../lib/hooks/useSkill";
import type { SkillDto } from "../../lib/types/skill";

export default function DeleteSkill() {
  const deleteSkill = useDeleteSkill();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillDto>();

  const onSubmit = (creds: SkillDto) => {
    deleteSkill.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Delete Skill
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Category"
                fullWidth
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
                disabled={deleteSkill.isPending}
              />
              <TextField
                label="Name"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={deleteSkill.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={deleteSkill.isPending}
              >
                {deleteSkill.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Delete"
                )}
              </Button>
              {deleteSkill.error && (
                <Alert severity="error">{deleteSkill.error.message}</Alert>
              )}
              {deleteSkill.isSuccess && (
                <Alert severity="success">{deleteSkill.data}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
