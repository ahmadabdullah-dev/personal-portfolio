import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import SoftwareSection from "../../features/marketing/SoftwareSection";
import LocalizationSection from "../../features/marketing/LocalizationSection";
import AllSkills from "../../features/skills/AllSkills";
import AllBlogsBanner from "../../features/blogs/AllBlogsBanner";

const LOGO_SRC = "/ahmad_abdullah_personal_brand_favicon-removebg-preview.png";

export default function LandingPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 12 } }}>
      <Stack
        component="section"
        aria-labelledby="hero-title"
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={{ xs: 3, md: 6 }}
        sx={{ alignItems: "center" }}
      >
        <Stack
          spacing={{ xs: 2, md: 3 }}
          sx={{
            flex: 1,
            width: "100%",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "start" },
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: 2, lineHeight: 1.6 }}
          >
            Software Developer & Technical Translator
          </Typography>

          <Typography
            id="hero-title"
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
              lineHeight: 1.1,
            }}
          >
            Ahmad Abdullah
          </Typography>

          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{
              maxWidth: 580,
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            I build reliable software and help tech products speak English,
            Turkish and Arabic naturally.
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            sx={{
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 360, sm: "none" },
            }}
          >
            Contact me
          </Button>
        </Stack>

        <Box
          component="img"
          src={LOGO_SRC}
          alt="Ahmad Abdullah personal brand logo"
          width={240}
          height={240}
          fetchPriority="high"
          sx={{
            display: "block",
            objectFit: "contain",
            flexShrink: 0,
            width: { xs: 140, sm: 180, md: 240 },
            height: { xs: 140, sm: 180, md: 240 },
          }}
        />
      </Stack>

      <SoftwareSection />
      <LocalizationSection />
      <AllSkills/>
      <AllBlogsBanner/>
    </Container>
  );
}
