import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { AddTranslationDto } from "../../lib/types/translation";
import { useAddTranslation } from "../../lib/hooks/useTranslation";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const defaultValues: AddTranslationDto = {
  image: null,
  language: "",
  languageCode: "",
  sourceLanguage: "",
  slug: "",
  tagline: "",
  description: "",
  pricePerWord: null,
  currency: "",
  priceNote: "",
  isPublished: true,
  isFeatured: false,
  displayOrder: 0,
};

const emptyToUndefined = (value?: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export default function AddTranslationForm() {
  const { mutate, isPending } = useAddTranslation();
  const [feedback, setFeedback] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);

  const { control, handleSubmit, reset } = useForm<AddTranslationDto>({
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

  const onSubmit = (values: AddTranslationDto) => {
    setFeedback(null);

    mutate(
      {
        image: values.image ?? null,
        language: values.language.trim(),
        languageCode: emptyToUndefined(values.languageCode),
        sourceLanguage: values.sourceLanguage.trim(),
        slug: emptyToUndefined(values.slug),
        tagline: emptyToUndefined(values.tagline),
        description: emptyToUndefined(values.description),
        pricePerWord: values.pricePerWord ?? undefined,
        currency: emptyToUndefined(values.currency),
        priceNote: emptyToUndefined(values.priceNote),
        isPublished: values.isPublished ?? true,
        isFeatured: values.isFeatured ?? false,
        displayOrder: values.displayOrder ?? 0,
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
        Add translation
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

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Controller
              name="language"
              control={control}
              rules={{
                required: "Language is required",
                maxLength: {
                  value: 100,
                  message: "Use 100 characters or fewer",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Language"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? "e.g. Turkish"}
                />
              )}
            />

            <Controller
              name="languageCode"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "Use 10 characters or fewer",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  label="Language code"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? "e.g. tr"}
                />
              )}
            />
          </Stack>

          <Controller
            name="sourceLanguage"
            control={control}
            rules={{
              required: "Source language is required",
              maxLength: { value: 100, message: "Use 100 characters or fewer" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Source language"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message ?? "e.g. English"}
              />
            )}
          />

          <Controller
            name="slug"
            control={control}
            rules={{
              maxLength: { value: 250, message: "Use 250 characters or fewer" },
              pattern: {
                value: SLUG_PATTERN,
                message: "Lowercase letters, numbers and hyphens only",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Slug"
                fullWidth
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  "Optional. e.g. english-to-turkish"
                }
              />
            )}
          />

          <Controller
            name="tagline"
            control={control}
            rules={{
              maxLength: { value: 250, message: "Use 250 characters or fewer" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Tagline"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Description"
                fullWidth
                multiline
                minRows={5}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Controller
              name="pricePerWord"
              control={control}
              rules={{
                min: { value: 0, message: "Price cannot be negative" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
                  label="Price per word"
                  type="number"
                  fullWidth
                  slotProps={{ htmlInput: { min: 0, step: "0.001" } }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="currency"
              control={control}
              rules={{
                maxLength: { value: 10, message: "Use 10 characters or fewer" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  label="Currency"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? "e.g. USD"}
                />
              )}
            />
          </Stack>

          <Controller
            name="priceNote"
            control={control}
            rules={{
              maxLength: { value: 250, message: "Use 250 characters or fewer" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="Price note"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="displayOrder"
            control={control}
            rules={{
              validate: (v) =>
                Number.isInteger(v ?? 0) ||
                "Display order must be a whole number",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? 0}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? 0 : Number(e.target.value),
                  )
                }
                label="Display order"
                type="number"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Stack direction="row" spacing={4}>
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Published"
                  control={
                    <Switch
                      checked={!!field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                />
              )}
            />

            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Featured"
                  control={
                    <Switch
                      checked={!!field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                />
              )}
            />
          </Stack>

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
                    alt="Selected translation cover"
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
            {isPending ? "Adding translation" : "Add translation"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
