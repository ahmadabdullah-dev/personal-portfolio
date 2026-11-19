import { Button, Container, Stack, Typography } from "@mui/material";
import SoftwareSection from "../../features/marketing/SoftwareSection";
import LocalizationSection from "../../features/marketing/LocalizationSection";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 12 } }}>
      <Stack spacing={3} component="section" aria-labelledby="hero-title">
        <Typography
          variant="overline"
          color="primary"
          sx={{ letterSpacing: 2 }}
        >
          Software Developer & Technical Translator
        </Typography>

        <Typography
          id="hero-title"
          variant="h2"
          component="h1"
          sx={{ fontWeight: 800, fontSize: { xs: "2.5rem", md: "3.75rem" } }}
        >
          Ahmad Abdullah
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 580, fontWeight: 400 }}
        >
          I build reliable Software and help tech products speak English,
          Turkish and Arabic naturally.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
          >
            Contact me
          </Button>
        </Stack>
      </Stack>

      <SoftwareSection />
      <LocalizationSection />
    </Container>
  );
}
