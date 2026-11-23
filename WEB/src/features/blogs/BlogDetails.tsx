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
import { useGetBlogBySlug } from "../../lib/hooks/useBlogs";
import { formatDate } from "../../lib/common";

const fade = "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 55%, rgba(8,8,8,0.25) 100%)";

export default function BlogDetails() {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: blog, isLoading, error } = useGetBlogBySlug(slug);

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

  if (error || !blog) {
    return (
      <Container maxWidth="md" sx={{ py: "64px" }}>
        <Alert severity={error ? "error" : "info"} variant="outlined">
          {error
            ? "Couldn't load this blog. Refresh the page or try again later."
            : "This blog doesn't exist or was removed."}
        </Alert>
      </Container>
    );
  }

  const date = formatDate(blog.createdAt);

  const headerSx = blog.imageUrl
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
        backgroundImage: `${fade}, url("${blog.imageUrl}")`,
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

      <Box component="header" sx={{ mb: "32px", ...headerSx }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: 28, sm: 36, md: 44 },
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            wordBreak: "break-word",
            maxWidth: blog.imageUrl ? 640 : undefined,
          }}
        >
          {blog.title}
        </Typography>

        {date && (
          <Box
            component="time"
            dateTime={blog.createdAt}
            sx={{
              display: "block",
              mt: "16px",
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            {date}
          </Box>
        )}
      </Box>

      {!!blog.tags?.length && (
        <Stack
          direction="row"
          sx={{ flexWrap: "wrap", gap: "8px", mb: "24px" }}
        >
          {blog.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                "&:hover": { borderColor: "secondary.main" },
              }}
            />
          ))}
        </Stack>
      )}

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
        {blog.content}
      </Typography>
    </Container>
  );
}
