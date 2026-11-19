import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import StorageIcon from "@mui/icons-material/Storage";
import WebIcon from "@mui/icons-material/Web";

const highlights = [
  {
    title: "Backend & APIs",
    text: "Secure REST APIs with ASP.NET Core, clean architecture and solid test coverage.",
    icon: <ApiIcon color="primary" />,
  },
  {
    title: "Databases",
    text: "SQL Server and Entity Framework, with schemas designed for performance and growth.",
    icon: <StorageIcon color="primary" />,
  },
  {
    title: "Frontend",
    text: "Responsive React and TypeScript interfaces that are fast, accessible and easy to maintain.",
    icon: <WebIcon color="primary" />,
  },
];

const points = [
  "ASP.NET Core REST APIs",
  "Clean architecture",
  "Authentication & authorization",
  "SQL Server & Entity Framework",
  "React + TypeScript",
];

export default function SoftwareSection() {
  return (
    <Box
      component="section"
      aria-labelledby="software-title"
      sx={{ mt: { xs: 8, md: 12 } }}
    >
      <Typography
        id="software-title"
        variant="h4"
        component="h2"
        sx={{ fontWeight: 700, mb: 1.5 }}
      >
        Software Development
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 640, mb: 4 }}>
        From database to user interface, I build software that is secure,
        well-structured and ready to grow.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        {highlights.map((h) => (
          <Paper key={h.title} variant="outlined" sx={{ flex: 1, p: 3 }}>
            <Box sx={{ mb: 1.5 }}>{h.icon}</Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {h.title}
            </Typography>
            <Typography color="text.secondary">{h.text}</Typography>
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        {points.map((p) => (
          <Chip key={p} label={p} />
        ))}
      </Stack>
    </Box>
  );
}
