import { useEffect, useMemo, useState } from "react";
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
import type { AddBlogDto } from "../../lib/types/blog";
import { useAddBlog } from "../../lib/hooks/useBlogs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const defaultValues: AddBlogDto = {
  slug: "",
  title: "",
  content: "",
  tags: [],
  image: null,
};

export default function AddBlogForm() {
  const { mutate, isPending } = useAddBlog();
  const [feedback, setFeedback] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);

  const { control, handleSubmit, reset } = useForm<AddBlogDto>({
    defaultValues,
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

  const onSubmit = (values: AddBlogDto) => {
    setFeedback(null);

    mutate(
      {
        slug: values.slug.trim(),
        title: values.title.trim(),
        content: values.content.trim(),
        tags: values.tags ?? [],
        image: values.image ?? null,
      },
      {
        onSuccess: (data) => {
          reset(defaultValues);
          setFeedback({
            severity: "success",
            message: (data as { message?: string })?.message ?? String(data),
          });
        },
        onError: (error) =>
          setFeedback({ severity: "error", message: error.message }),
      },
    );
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Add blog
      </Typography>

      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 4, border: 1, borderColor: "divider" }}
      >
        <Stack spacing={3}>
          {feedback && (
            <Alert
              severity={feedback.severity}
              onClose={() => setFeedback(null)}
            >
              {feedback.message}
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
                (tags ?? []).every((t) => t.length <= 50) ||
                "Each tag must be 50 characters or fewer",
            }}
            render={({ field, fieldState }) => (
              <Autocomplete<string, true, false, true>
                multiple
                freeSolo
                autoSelect
                options={[]}
                value={field.value ?? []}
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
                {preview && (
                  <Box
                    component="img"
                    src={preview}
                    alt="Selected blog cover"
                    sx={{
                      display: "block",
                      width: "100%",
                      maxHeight: 240,
                      objectFit: "contain",
                      mb: 2,
                      border: 1,
                      borderColor: "divider",
                    }}
                  />
                )}

                <Stack direction="row" spacing={2}>
                  <Button component="label" variant="outlined" color="inherit">
                    {preview ? "Change image" : "Choose image"}
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
                      Remove
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            startIcon={
              isPending && <CircularProgress size={18} color="inherit" />
            }
          >
            {isPending ? "Adding blog" : "Add blog"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
