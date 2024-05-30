import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(79 70 229)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF69B4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgb(67 56 202)", // Darker shade of purple
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
