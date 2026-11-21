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
import type { SkillDto } from "../../lib/types/skill";
import { useAddSkill } from "../../lib/hooks/useSkill";

export default function AddSkill() {
  const addSkillAsync = useAddSkill();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillDto>();

  const onSubmit = (creds: SkillDto) => {
    addSkillAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Create Skill
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Category"
                fullWidth
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
                disabled={addSkillAsync.isPending}
              />
              <TextField
                label="Name"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={addSkillAsync.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={addSkillAsync.isPending}
              >
                {addSkillAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </Button>
              {addSkillAsync.error && (
                <Alert severity="error">{addSkillAsync.error.message}</Alert>
              )}
              {addSkillAsync.isSuccess && (
                <Alert severity="success">{addSkillAsync.data}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
