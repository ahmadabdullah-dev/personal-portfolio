import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

type Language = {
  lang: "en" | "tr" | "ar";
  dir: "ltr" | "rtl";
  label: string;
  title: string;
  text: string;
};

const languages: readonly Language[] = [
  {
    lang: "en",
    dir: "ltr",
    label: "English",
    title: "Technical translation & localization",
    text: "I translate and localize software, apps and documentation so they feel natural to users, not machine-translated.",
  },
  {
    lang: "tr",
    dir: "ltr",
    label: "Türkçe",
    title: "Teknik çeviri ve yerelleştirme",
    text: "Yazılımları, uygulamaları ve teknik dokümantasyonu çeviriyor ve yerelleştiriyorum; kullanıcıya baştan Türkçe yazılmış gibi gelsin, makine çevirisi hissi vermesin.",
  },
  {
    lang: "ar",
    dir: "rtl",
    label: "العربية",
    title: "الترجمة التقنية والتوطين",
    text: "أترجم البرمجيات والتطبيقات والوثائق التقنية وأوطّنها، لتبدو للمستخدم طبيعية وكأنها كُتبت بالعربية أصلًا، لا كترجمة آلية.",
  },
];

const points = [
  "UI strings, docs and release notes",
  "RTL layouts for Arabic",
  "Consistent technical terminology",
  "Dates, numbers and currency formats",
];

export default function LocalizationSection() {
  return (
    <Box
      component="section"
      aria-labelledby="l10n-title"
      sx={{ mt: { xs: 8, md: 12 } }}
    >
      <Typography
        id="l10n-title"
        variant="h4"
        component="h2"
        sx={{ fontWeight: 700, mb: 1.5 }}
      >
        Translation & Localization in Tech
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 640, mb: 4 }}>
        Localization is more than translation. It adapts a product to the
        language, writing direction and culture of its users, in English,
        Turkish and Arabic.
      </Typography>

      <Stack
        component="ul"
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ listStyle: "none", p: 0, m: 0, mb: 4 }}
      >
        {languages.map(({ lang, dir, label, title, text }) => {
          const isRtl = dir === "rtl";
          return (
            <Paper
              key={lang}
              component="li"
              variant="outlined"
              lang={lang}
              dir={dir}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                transition: "border-color 150ms, box-shadow 150ms",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: 1,
                },
                // Arabic needs extra line height, and letter-spacing breaks
                // the joining of letters, so reset it for RTL.
                "& .MuiTypography-root": {
                  ...(isRtl && { letterSpacing: 0, lineHeight: 1.9 }),
                },
              }}
            >
              <Chip
                label={label}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 1.5 }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                {title}
              </Typography>
              <Typography color="text.secondary">{text}</Typography>
            </Paper>
          );
        })}
      </Stack>

      <Stack
        component="ul"
        direction="row"
        sx={{ flexWrap: "wrap", gap: 1, listStyle: "none", p: 0, m: 0 }}
      >
        {points.map((p) => (
          <Chip key={p} component="li" label={p} />
        ))}
      </Stack>
    </Box>
  );
}
