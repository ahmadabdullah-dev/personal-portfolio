import {
  Box,
  Typography,
  Chip,
  Stack,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useGetSkills } from "../../lib/hooks/useSkill";

export default function AllSkills() {
  const { data, isLoading, isError, error } = useGetSkills();

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error instanceof Error ? error.message : "Failed to load skills."}
        </Alert>
      </Box>
    );
  }

  const skills = data ?? [];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        {skills.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No skills found.
          </Typography>
        ) : (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {skills.map((skill) => (
              <Chip
                key={`${skill.category}-${skill.name}`}
                variant="outlined"
                sx={{ mb: 1 }}
                label={
                  <>
                    {skill.name}
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 0.75 }}
                    >
                      · {skill.category}
                    </Typography>
                  </>
                }
              />
            ))}
          </Stack>
        )}
      </Paper>
    </>
  );
}
