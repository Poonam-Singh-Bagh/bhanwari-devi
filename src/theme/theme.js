import { createTheme } from "@mui/material/styles";

let theme = createTheme();
const shadows = theme.shadows;
shadows[2] =
  "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 1px 5px rgba(0, 0, 0, 0.08)";
shadows[8] =
  "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)";
shadows[8] =
  "0px 24px 38px rgba(0, 0, 0, 0.06), 0px 9px 46px rgba(0, 0, 0, 0.04), 0px 11px 15px rgba(0, 0, 0, 0.08)";

theme = createTheme(theme, {
  palette: {
    type: "light",
    default: {
      // main: "#ffffff",
      // contrastText: "#000000",
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    primary: {
      //Green
      main: "#48a145",
      light: "#e9f5e9",
      dark: "#3a8137",
    },
    secondary: {
      //Violet
      main: "#4548a1",
      light: "#dadaec",
      dark: "#373a81",
    },
    error: {
      //Red
      main: "#f44336",
      light: "#ffe5e3",
      dark: "#c3362b",
    },
    warning: {
      //Yellow
      main: "#ffc107",
      contrastText: "#2e2e2e",
      light: "#fff3cd",
      dark: "#cc9a06",
    },
    info: {
      //Blue
      main: "#2196f3",
      dark: "#1a78c2",
      light: "#d3eafd",
    },
    success: {
      //Green as primary
      main: "#48a145",
      light: "#e9f5e9",
      dark: "#3a8137",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "#585858",
      disabled: "#949494",
      hint: "#949494",
    },
    background: {
      default: "#FFFFFF",
      paper: "#ffffff",
    },
    divider: "#DEDEDE",
  },

  typography: {
    fontFamily: "Nunito Sans",
    fontSize: 18,
    h1: {
      fontWeight: 700,
      fontSize: "6rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4.875rem",
        fontFamily: "Lusitana",
      },
    },
    h2: {
      fontSize: "4.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.625rem",
        fontFamily: "Lusitana",
      },
      fontWeight: 700,
    },
    h3: {
      fontSize: "3.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.75rem",
        fontFamily: "Lusitana",
      },
      fontWeight: 700,
      fontFamily: "Lusitana",
      lineHeight: 1.14285714286,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2.625rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	2rem",
        fontFamily: "Lusitana",
      },
      fontFamily: "Lusitana",
      lineHeight: 1.33,
    },
    // ------------------
    h5: {
      fontWeight: 700,
      fontSize: "2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	1.5rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.33,
      fontFamily: "Lusitana",
    },
    h6: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	1.125rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.33,
      fontWeight: 700,
      fontFamily: "Lusitana",
    },
    subtitle1: {
      fontSize: "1.125rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.55,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.875rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        fontFamily: "Lusitana",
      },
      fontWeight: 700,
      lineHeight: 1.42,
    },
    body1: {
      fontSize: "1.125rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.55,
      fontFamily: "Lusitana",
    },
    body2: {
      fontSize: "0.875rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.42,
    },
    button: {
      fontSize: "1.125rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.55,
      fontWeight: 500,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        fontFamily: "Lusitana",
      },
      lineHeight: 1.33,
    },
    overline: {
      fontSize: "0.75rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        fontFamily: "Lusitana",
      },
      fontFamily: "Lusitana",
    },
  },
  shadows,
});

theme.components = {
  MuiCardMedia: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: { width: 64 },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 8 },
    },
  },
};

export default theme;
