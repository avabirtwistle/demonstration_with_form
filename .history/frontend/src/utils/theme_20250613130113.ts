import { Link } from "@/components/link";
import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        // 🌸 Sets primary color to pink
        primary: {
          main: "#e91e63", // Material Pink 500
        },
        // 🌑 Sets the dark background colors
        background: {
          default: "#121212", // full-page background
          paper: "#1f1f1f",   // cards and Paper components
        },
        // ⚪ Sets text color to white and soft gray
        text: {
          primary: "#ffffff",
          secondary: "#bbbbbb",
        },
      },
    },
  },

  components: {
    // Use your custom <Link> component for all MUI links
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },

    // Keep labels floated above <TextField>
    MuiTextField: {
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },

    // Make sure MUI buttons use your custom <Link> for internal navigation
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  },
});

export { theme };
