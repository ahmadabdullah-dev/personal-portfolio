import { useNavigate, useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCurrentUser } from "../../lib/hooks/useUser";
import { useGetTranslationBySlug } from "../../lib/hooks/useTranslation";
//import DeleteTranslation from "./DeleteTranslation";

const fade =
  "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 55%, rgba(8,8,8,0.25) 100%)";

export default function TranslationDetails() {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: translation, isLoading, error } = useGetTranslationBySlug(slug);
  const currentUser = useCurrentUser();

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: "32px" }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { xs: 220, md: 320 }, mb: "32px" }}
        />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton width="80%" height={20} />
      </Container>
    );
  }

  if (error || !translation) {
    return (
      <Container maxWidth="md" sx={{ py: "64px" }}>
        <Alert severity={error ? "error" : "info"} variant="outlined">
          {error
            ? "Couldn't load this translation. Refresh the page or try again later."
            : "This translation doesn't exist or was removed."}
        </Alert>
      </Container>
    );
  }

  const title = translation.language
    ? `${translation.sourceLanguage} → ${translation.language}`
    : translation.sourceLanguage;

  const price =
    translation.pricePerWord != null
      ? `${translation.pricePerWord} ${translation.currency ?? ""} / word`
          .replace(/\s+/g, " ")
          .trim()
      : null;

  const headerSx = translation.imageUrl
    ? ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: { xs: 220, sm: 280, md: 340 },
        p: { xs: "20px", md: "40px" },
        border: 1,
        borderColor: "divider",
        borderBottom: 3,
        borderBottomColor: "secondary.main",
        bgcolor: "background.paper",
        backgroundImage: `${fade}, url("${translation.imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const)
    : ({
        pl: { xs: "16px", md: "24px" },
        borderLeft: 3,
        borderColor: "secondary.main",
      } as const);

  return (
    <Container
      component="article"
      maxWidth="md"
      sx={{ py: { xs: "16px", md: "24px" }, pb: "80px" }}
    >
      <Button
        color="inherit"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: "16px",
          px: 0,
          py: "8px",
          color: "text.secondary",
          "&:hover": { color: "secondary.main", bgcolor: "transparent" },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "secondary.main",
            outlineOffset: 2,
          },
        }}
      >
        Back
      </Button>

      {currentUser.data?.role === "Admin" && translation.id && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: "16px" }}
        >
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/translation/update/${encodeURIComponent(translation.id!)}`,
              )
            }
          >
            Update translation
          </Button>

        {/* <DeleteTranslation id={translation.id} /> */} 
        </Box>
      )}

      <Box component="header" sx={{ mb: "32px", ...headerSx }}>
        {translation.languageCode && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              mb: "8px",
            }}
          >
            {translation.languageCode}
          </Typography>
        )}

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: 28, sm: 36, md: 44 },
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            wordBreak: "break-word",
            maxWidth: translation.imageUrl ? 640 : undefined,
          }}
        >
          {title}
        </Typography>

        {translation.tagline && (
          <Typography
            sx={{
              mt: "16px",
              fontSize: { xs: 16, md: 18 },
              color: "text.secondary",
              maxWidth: 640,
            }}
          >
            {translation.tagline}
          </Typography>
        )}
      </Box>

      {(translation.isFeatured || !translation.isPublished || price) && (
        <Stack
          direction="row"
          sx={{ flexWrap: "wrap", gap: "8px", mb: "24px" }}
        >
          {translation.isFeatured && (
            <Chip
              label="Featured"
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
          {!translation.isPublished && (
            <Chip
              label="Unpublished"
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
          {price && (
            <Chip
              label={price}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                "&:hover": { borderColor: "secondary.main" },
              }}
            />
          )}
        </Stack>
      )}

      {translation.priceNote && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: "24px", maxWidth: 720 }}
        >
          {translation.priceNote}
        </Typography>
      )}

      {translation.description && (
        <Typography
          component="div"
          sx={{
            maxWidth: 720,
            fontSize: { xs: 17, md: 18 },
            lineHeight: { xs: "28px", md: "32px" },
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        >
          {translation.description}
        </Typography>
      )}
    </Container>
  );
}
