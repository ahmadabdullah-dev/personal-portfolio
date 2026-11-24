import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetBlogBySlug, useUpdateBlog } from "../../lib/hooks/useBlogs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type FormValues = {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  image: File | null; // only set when a new image is picked
};

export default function UpdateBlog() {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: blog, isLoading } = useGetBlogBySlug(slug);
  const update = useUpdateBlog();

  const { control, handleSubmit } = useForm<FormValues>({
    values: blog && {
      title: blog.title ?? "",
      slug: blog.slug ?? "",
      content: blog.content ?? "",
      tags: blog.tags ?? [],
      image: null,
    },
    // a background refetch won't overwrite what the user already typed
    resetOptions: { keepDirtyValues: true },
  });

  const image = useWatch({ control, name: "image" });
  const preview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = (values: FormValues) => {
    if (!blog) return;
    const newSlug = values.slug.trim();

    update.mutate(
      {
        id: blog.id,
        title: values.title.trim(),
        slug: newSlug,
        content: values.content.trim(),
        tags: values.tags,
        image: values.image ?? undefined,
      },
      {
        onSuccess: () => navigate(`/blog/${encodeURIComponent(newSlug)}`),
      },
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="info" variant="outlined">
          This blog doesn't exist or was removed.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Update blog
      </Typography>

      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 4, border: 1, borderColor: "divider" }}
      >
        <Stack spacing={3}>
          {update.isError && (
            <Alert severity="error" onClose={() => update.reset()}>
              {update.error.message}
            </Alert>
          )}

          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              maxLength: { value: 200, message: "Use 200 characters or fewer" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="slug"
            control={control}
            rules={{
              required: "Slug is required",
              maxLength: { value: 250, message: "Use 250 characters or fewer" },
              pattern: {
                value: SLUG_PATTERN,
                message: "Lowercase letters, numbers and hyphens only",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Slug"
                fullWidth
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ?? "e.g. my-first-blog-post"
                }
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Content"
                fullWidth
                multiline
                minRows={8}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="tags"
            control={control}
            rules={{
              validate: (tags) =>
                tags.every((t) => t.length <= 50) ||
                "Each tag must be 50 characters or fewer",
            }}
            render={({ field, fieldState }) => (
              <Autocomplete<string, true, false, true>
                multiple
                freeSolo
                autoSelect
                options={[]}
                value={field.value}
                onChange={(_, value) =>
                  field.onChange(
                    Array.from(
                      new Set(value.map((t) => t.trim()).filter(Boolean)),
                    ),
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ??
                      "Optional. Press Enter to add a tag."
                    }
                  />
                )}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            rules={{
              validate: (file) => {
                if (!file) return true;
                if (!ALLOWED_TYPES.includes(file.type))
                  return "Use a JPG, PNG or WEBP image";
                if (file.size > MAX_IMAGE_SIZE)
                  return "Image must be 5 MB or smaller";
                return true;
              },
            }}
            render={({ field: { onChange }, fieldState }) => (
              <Box>
                {(blog.imageUrl || preview) && (
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    {[
                      { label: "Current image", src: blog.imageUrl },
                      { label: "New image", src: preview },
                    ]
                      .filter((img) => img.src)
                      .map((img) => (
                        <Box key={img.label} sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="caption" color="text.secondary">
                            {img.label}
                          </Typography>
                          <Box
                            component="img"
                            src={img.src!}
                            alt={img.label}
                            sx={{
                              display: "block",
                              width: "100%",
                              aspectRatio: "16 / 9",
                              objectFit: "cover",
                              mt: 1,
                              border: 1,
                              borderColor: "divider",
                            }}
                          />
                        </Box>
                      ))}
                  </Stack>
                )}

                <Stack direction="row" spacing={2}>
                  <Button component="label" variant="outlined" color="inherit">
                    {blog.imageUrl || preview ? "Change image" : "Choose image"}
                    <input
                      hidden
                      type="file"
                      accept={ALLOWED_TYPES.join(",")}
                      onChange={(e) => {
                        onChange(e.target.files?.[0] ?? null);
                        e.target.value = "";
                      }}
                    />
                  </Button>

                  {preview && (
                    <Button color="inherit" onClick={() => onChange(null)}>
                      Undo change
                    </Button>
                  )}
                </Stack>

                <Typography
                  variant="caption"
                  color={fieldState.error ? "error" : "text.secondary"}
                  sx={{ display: "block", mt: 1 }}
                >
                  {fieldState.error?.message ??
                    "Optional. JPG, PNG or WEBP, up to 5 MB."}
                </Typography>
              </Box>
            )}
          />

          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={update.isPending}
              startIcon={
                update.isPending && (
                  <CircularProgress size={18} color="inherit" />
                )
              }
              sx={{ flex: 1 }}
            >
              {update.isPending ? "Saving changes" : "Save changes"}
            </Button>

            <Button
              size="large"
              color="inherit"
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={update.isPending}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
