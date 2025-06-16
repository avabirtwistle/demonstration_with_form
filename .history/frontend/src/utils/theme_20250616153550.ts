import { Link } from "@/components/link";
import { createTheme } from "@mui/material";

const theme = createTheme({
  // 👇 This defines the dark color scheme and overrides the default palette
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#E0E0E0", // bright cyan-blue for buttons/links
        },
        background: {
          default: "#E0E0E0", // background of the whole page
          paper: "#013A20",   // background of cards/Paper components
        },
        text: {
          primary: "#ffffff",   // main text
          secondary: "#cccccc", // subtitles, labels, etc.
        },
      },
    },
  },

  // 👇 Customize components
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiTextField: {
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  },
});

export { theme };
