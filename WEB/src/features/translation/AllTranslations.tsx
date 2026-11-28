import { useState } from "react";
import { Link } from "react-router";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetTranslations } from "../../lib/hooks/useTranslation";

const PAGE_SIZE = 9;

export default function AllTranslations() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useGetTranslations({
    page,
    pageSize: PAGE_SIZE,
  });

  if (isPending) {
    return (
      <Grid container spacing={3} sx={{ py: 4 }}>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ bgcolor: "divider" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (isError) return <Alert severity="error">{error.message}</Alert>;
  if (!data?.items.length)
    return <Alert severity="info">No translations found.</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
        Translations
      </Typography>

      <Grid container spacing={3}>
        {data.items.map((translation) => {
          const title = translation.language
            ? `${translation.sourceLanguage} → ${translation.language}`
            : translation.sourceLanguage;
          const price =
            translation.pricePerWord != null
              ? `${translation.pricePerWord} ${translation.currency ?? ""} / word`.replace(
                  /\s+/g,
                  " ",
                )
              : null;

          return (
            <Grid key={translation.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  transition: "border-color 200ms ease, transform 200ms ease",
                  "&:hover": {
                    borderColor: "secondary.main",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/translation/${translation.slug}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    "&.Mui-focusVisible": {
                      outline: "2px solid",
                      outlineColor: "secondary.main",
                      outlineOffset: -2,
                    },
                  }}
                >
                  {translation.imageUrl && (
                    <CardMedia
                      component="img"
                      image={translation.imageUrl}
                      alt={title}
                      loading="lazy"
                      sx={{ aspectRatio: "16 / 9", filter: "grayscale(0.4)" }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    {translation.languageCode && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {translation.languageCode}
                      </Typography>
                    )}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mt: 0.5, fontWeight: 600 }}
                    >
                      {title}
                    </Typography>
                    {translation.tagline && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {translation.tagline}
                      </Typography>
                    )}
                    <Stack
                      direction="row"
                      sx={{ flexWrap: "wrap", gap: 0.5, mt: 1.5 }}
                    >
                      {translation.isFeatured && (
                        <Chip
                          label="Featured"
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      )}
                      {price && (
                        <Chip
                          label={price}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "text.secondary",
                            borderColor: "divider",
                          }}
                        />
                      )}
                    </Stack>
                    {translation.priceNote && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {translation.priceNote}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {data.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={data.totalPages}
            page={data.currentPage}
            onChange={(_, p) => setPage(p)}
            color="secondary"
            shape="rounded"
            sx={{ "& .MuiPaginationItem-root": { borderRadius: 0 } }}
          />
        </Box>
      )}
    </Box>
  );
}
