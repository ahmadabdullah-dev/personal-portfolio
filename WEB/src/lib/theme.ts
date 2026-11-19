import { createTheme } from "@mui/material/styles";

// Brand palette
const OBSIDIAN_BLACK = "#080808"; // Main background
const CHROME_SILVER = "#CDCBCA"; // Portrait, typography, and details
const LASER_CRIMSON = "#D41514"; // Accent and highlights

export const theme = () =>
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: OBSIDIAN_BLACK,
        paper: "#121212",
      },
      primary: {
        main: CHROME_SILVER,
        contrastText: OBSIDIAN_BLACK,
      },
      secondary: {
        main: LASER_CRIMSON,
        contrastText: "#ffffff",
      },
      text: {
        primary: CHROME_SILVER,
        secondary: "#8a8887",
      },
      divider: "rgba(205,203,202,0.12)",
      error: { main: "#ff3b30" },
      success: { main: "#00d26a" },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: { fontWeight: 700, fontSize: "3.5rem", textTransform: "uppercase" },
      h2: { fontWeight: 700, fontSize: "2.5rem", textTransform: "uppercase" },
      h3: { fontWeight: 600, fontSize: "1.75rem", textTransform: "uppercase" },
      button: { textTransform: "uppercase", fontWeight: 600 },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 0, padding: "12px 32px", fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none", borderRadius: 0 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { border: "1px solid rgba(205,203,202,0.12)", borderRadius: 0 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
      },
    },
  });

export default theme();
