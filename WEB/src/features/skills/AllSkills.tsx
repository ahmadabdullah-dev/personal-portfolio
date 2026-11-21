import { Alert, Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useGetSkills } from "../../lib/hooks/useSkill";
import type { SkillDto } from "../../lib/types/skill";

const groupByCategory = (skills: SkillDto[]) =>
  skills.reduce<{ category: string; items: SkillDto[] }[]>((groups, skill) => {
    const last = groups[groups.length - 1];
    if (last?.category === skill.category) last.items.push(skill);
    else groups.push({ category: skill.category, items: [skill] });
    return groups;
  }, []);

const gridSx = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 2.5,
};

export default function AllSkills() {
  const { data, isLoading, isError, error } = useGetSkills();

  if (isLoading) {
    return (
      <Box sx={gridSx}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={140} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error instanceof Error ? error.message : "Failed to load skills."}
      </Alert>
    );
  }

  const groups = groupByCategory(data ?? []);

  if (groups.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No skills found.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          pb: 1.5,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          "&::before": {
            content: '""',
            width: 28,
            height: 3,
            bgcolor: "secondary.main",
          },
        }}
      >
        Skills
      </Typography>

      <Box sx={gridSx}>
        {groups.map(({ category, items }) => (
          <Paper
            key={category}
            variant="outlined"
            sx={(theme) => ({
              position: "relative",
              p: 3,
              borderColor: "divider",
              transition: "border-color .2s, background-color .2s",
              // crimson accent bar that grows on hover
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: 3,
                height: 28,
                bgcolor: "secondary.main",
                transition: "height .25s",
              },
              "&:hover": {
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                "&::before": { height: "100%" },
              },
            })}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                mb: 2.5,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {category}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {items.map((skill) => (
                <Chip
                  key={skill.name}
                  label={skill.name}
                  size="small"
                  variant="outlined"
                  sx={(theme) => ({
                    fontWeight: 500,
                    borderColor: "divider",
                    transition: "all .2s",
                    "&:hover": {
                      color: "secondary.main",
                      borderColor: "secondary.main",
                      bgcolor: alpha(theme.palette.secondary.main, 0.08),
                    },
                  })}
                />
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
