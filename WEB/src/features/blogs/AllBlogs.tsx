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
import { useGetAllBlogs } from "../../lib/hooks/useBlogs";

const PAGE_SIZE = 12;

export default function AllBlogs() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useGetAllBlogs({
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
    return <Alert severity="info">No blogs found.</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
        Blogs
      </Typography>

      <Grid container spacing={3}>
        {data.items.map((blog) => (
          <Grid key={blog.id} size={{ xs: 12, sm: 6, lg: 4 }}>
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
                to={`/blog/${blog.slug}`}
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
                {blog.imageUrl && (
                  <CardMedia
                    component="img"
                    image={blog.imageUrl}
                    alt={blog.title}
                    loading="lazy"
                    sx={{ aspectRatio: "16 / 9", filter: "grayscale(0.4)" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mt: 0.5, fontWeight: 600 }}
                  >
                    {blog.title}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{ flexWrap: "wrap", gap: 0.5, mt: 1.5 }}
                  >
                    {blog.tags?.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "text.secondary",
                          borderColor: "divider",
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
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
